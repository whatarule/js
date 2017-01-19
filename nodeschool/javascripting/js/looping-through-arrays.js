
    var _ = require("underscore")   ;
    var _r = require("ramda")       ;
    var _i = require("immutable")   ;

    var Maybe = require("./module/Maybe.js")    ;

    var pets = Maybe.of(['cat','dog','rat',]) ;
/*
    var pets = ['cat','dog','rat',] ;
*/

    var pets_s = pets.__value.map(function(pet){
        return pet + 's'    ;
    })  ;
/*

    var pets_s = Maybe.of(function(pet){
        return pet + 's'  ;
    }).ap(pets.map)  ;
*/

    console.log(pets_s)   ;


