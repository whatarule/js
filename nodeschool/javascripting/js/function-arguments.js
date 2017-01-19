
    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;


    var math = function(x,y,z){
        return x + y * z    ;
    }    ;


    console.log (math(53,61,67))  ;

