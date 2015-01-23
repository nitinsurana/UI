/**
 *
 */
(function (angular) {

    var SECTION_NAME          = "plugins";
    var module                = angular.module("BrowserSync");
    var CONFIGURE_EVENT       = "cp:plugins:set";
    var CONFIGURE_MANY_EVENT  = "cp:plugins:setMany";

    module.controller("PluginsController", [
        "$scope",
        "options",
        "Socket",
        "pagesConfig",
        function pluginsPageController($scope, options, Socket, pagesConfig) {

            $scope.options = options;
            $scope.section = pagesConfig[SECTION_NAME];

            /**
             * Don't show this UI as user plugin
             */
            var filtered = $scope.options.userPlugins.filter(function (item) {
                return item.name !== "UI";
            });

            /**
             * @type {{loading: boolean}}
             */
            $scope.ui = {
                loading: false,
                plugins: filtered
            };

            /**
             * Set the state of many options
             * @param value
             */
            $scope.setMany = function (value) {
                Socket.emit(CONFIGURE_MANY_EVENT, value);
                $scope.ui.plugins = $scope.ui.plugins.map(function (item) {
                    item.active = value;
                    return item;
                });
            };
        }
    ]);

    module.directive("pluginList", function () {
        return {
            restrict: "E",
            scope: {
                options: "=",
                plugins: "="
            },
            templateUrl: "plugins.directive.html",
            controller: ["$scope", "Socket", pluginsDirective]
        };
    });

    /**
     * @param $scope
     * @param Socket
     */
    function pluginsDirective($scope, Socket) {

        /**
         * Toggle a plugin
         */
        $scope.togglePlugin = function (plugin) {
            Socket.emit(CONFIGURE_EVENT, plugin);
        };
    }

})(angular);
