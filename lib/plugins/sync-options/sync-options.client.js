(function (angular) {

    const SECTION_NAME = "sync-options";
    var module         = angular.module("BrowserSync");

    module.controller("SyncOptionsController", [
        "$scope",
        "Socket",
        "options",
        "pagesConfig",
        syncOptionsController
    ]);

    function syncOptionsController($scope, Socket, options, pagesConfig) {

        $scope.options = options;
        $scope.section = pagesConfig[SECTION_NAME];

        $scope.setMany = function (value) {
            Socket.emit("cp:option:setMany", value);
            $scope.syncItems = $scope.syncItems.map(function (item) {
                item.value = value;
                return item;
            });
        };

        $scope.syncItems = [];

        var taglines = {
            clicks:  "Mirror clicks across devices",
            scroll:  "Mirror scroll position across devices",
            "ghostMode.submit":  "Form Submissions will be synced",
            "ghostMode.inputs":  "Text inputs (including text-areas) will be synced",
            "ghostMode.toggles": "Radio + Checkboxes changes will be synced",
            codeSync:            "Reload the browser or inject CSS when watched files change"
        };

        // If watching files, add the code-sync toggle
        if (hasWatchers($scope.options.files)) {
            $scope.syncItems.push(addItem("codeSync", ["codeSync"], $scope.options.codeSync, taglines["codeSync"]));
        }

        Object.keys($scope.options.ghostMode).forEach(function (item) {
            if (item !== "forms" && item !== "location") {
                $scope.syncItems.push(addItem(item, ["ghostMode", item], $scope.options.ghostMode[item], taglines[item]));
            }
        });

        Object.keys($scope.options.ghostMode.forms).forEach(function (item) {
            $scope.syncItems.push(addItem("Forms: " + item, ["ghostMode", "forms", item], $scope.options.ghostMode["forms"][item], taglines["ghostMode." + item]));
        });

        function addItem (item, path, value, tagline) {
            return {
                value: value,
                name: item,
                path: path,
                title: ucfirst(item),
                tagline: tagline
            };
        }

        function hasWatchers (files) {
            if (!files) {
                return false;
            }
            return Object.keys(files).some(function (key) {
                return files[key].length;
            });
        }
    }

    module.directive("syncOptions", function () {
        return {
            restrict: "E",
            scope: {
                options: "=",
                "syncItems": "="
            },
            templateUrl: "sync-options-list.html",
            controller: ["$scope", "Socket", "pagesConfig", syncOptionsDirective]
        };
    });

    /**
     * @param $scope
     * @param Socket
     */
    function syncOptionsDirective($scope, Socket) {

        $scope.urls = {
            local: $scope.options.urls.local,
            current: $scope.options.urls.local + "/"
        };

        /**
         * Toggle Options
         * @param item
         */
        $scope.toggle = function (item) {
            Socket.emit("cp:option:set", {
                path:  item.path,
                value: item.value
            });
        };
    }

    function ucfirst (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

})(angular);