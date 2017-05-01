// angular controller goes here
(function (angular) {

    const SECTION_NAME = "record";

    angular
        .module("BrowserSync")
        .controller("RecordController", [
            "options",
            "Socket",
            "pagesConfig",
            RecordController
        ]);

    /**
     * @param options
     * @param Socket
     * @param pagesConfig
     */
    function RecordController(options, Socket, pagesConfig) {

        var ctrl = this;
        ctrl.clickStart = function(){
            console.log("start");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "start",
                data: {
                    
                }
            });
        };
        ctrl.clickStop = function(){
            console.log("stop");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "stop",
                data: {
                 
                }
            });
        };
        ctrl.clickPlay = function(){
            console.log("play");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "play",
                data: {
                 
                }
            });
        };
    }
})(angular);