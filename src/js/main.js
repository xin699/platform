require.config({
    paths : {
        "jquery" : "./jquery.min",
        "bootstrap": "./bootstrap.min"
    }
})

require(["jquery"],function($){
    require(["bootstrap"])
})