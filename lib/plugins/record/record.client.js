// angular controller goes here
(function (angular) {

    const SECTION_NAME = "record";

    var config = {
        databaseURL: "https://browser-sync-record.firebaseio.com",
    };
    firebase.initializeApp(config);
    var db = firebase.database();

    angular
        .module("BrowserSync")
        .controller("RecordController", [
            "options",
            "Socket",
            "pagesConfig",
            "$timeout",
            "$scope",
            RecordController
        ]);

    /**
     * @param options
     * @param Socket
     * @param pagesConfig
     */
    function RecordController(options, Socket, pagesConfig, $timeout, $scope) {
        var ctrl = this;
        

        // console.log("test");
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
        ctrl.clickPlay = function(key){
            console.log("play");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "play",
                data: {
                    recordId: key
                }
            });
        };
        $timeout(function(){
            console.log(" on init");
            
                db.ref().on('value',function(s){
                    $scope.$apply(function(){
                        ctrl.records = s.val();
                    });
                
                });
            
        }, 10);
    }
})(angular);