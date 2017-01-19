
    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;


    var pizza = Maybe.of({
        toppings    : ['cheese','sauce','pepperoni',]    ,
        crust       : 'deep dish'    ,
        serves      : 2  ,
    })  ;


    console.log(pizza.__value)   ;

