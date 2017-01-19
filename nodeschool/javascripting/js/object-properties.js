
    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;


    var food = Maybe.of({
        types   : 'only pizza'
    })   ;


    console.log(food.__value.types)   ;

