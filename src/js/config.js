requirejs.config({
    paths : {
        "jquery" : "./js/jquery.min",
        "bootstrap": "./js/bootstrap.min"
    }
})
// base
require(["jquery"],function($){
    require(["bootstrap"])
})