var path   = "/Users/shakyshane/sites/os-browser-sync";
var cp     = require("./index");
var bs     = require("/Users/shakyshane/sites/os-browser-sync");

bs.use(cp);

bs({
    proxy: "swoon.static",
    open: false,
    port: 3000
});