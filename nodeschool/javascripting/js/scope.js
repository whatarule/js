
    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;


    var a=1,b=2,c=3 ;

    (function f_01(){
        var b=5,c=6 ;
        (function f_02(){
            var b=8 ;
            console.log('a: ' + a + ', b: ' + b + ', c: ' + c)   ;
            (function f_03(){
                var a=7,c=9 ;
                (function functionfourth(){
                var a=1,c=8 ;
                })()  ;
            })()  ;
        })()  ;
    })()  ;


