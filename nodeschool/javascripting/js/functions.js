

    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;


    var eat =function(food){
        return food + ' tasted really good.'    ;
    }

    console.log(eat('bananas'))  ;

