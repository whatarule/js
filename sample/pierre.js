
//    "use strict"    ;

    const _ = require("underscore")   ;
    const _r = require("ramda")       ;
    const _i = require("immutable")   ;

    const Maybe = require("../module/Maybe.js")    ;

    const Pole = function(left,right){
            this.__left = left      ;
            this.__right = right    ;
    } ;
    Pole.of = function(left,right){
        return new Pole(left,right)     ;
    }  ;
    Pole.prototype.map = function(f){
        return f(this)  ;
    }   ;

    const landLeft = _r.curry(function(n,pole){
        return Math.abs(pole.__left + n - pole.__right) < 4 ?
            Pole.of(pole.__left + n,pole.__right)
        :   Maybe.of(null)   ;
    })   ;
    const landRight = _r.curry(function(n,pole){
        return Math.abs(pole.__left - n - pole.__right) < 4 ?
            Pole.of(pole.__left ,pole.__right + n)
        :   Maybe.of(null)   ;
    })   ;

    const banana = function(pole){
        return Maybe.of(null)   ;
    } ;



//
/*
    LOG = landLeft(2,Pole.of(0,0))   ;
    console.log(LOG)   ;
    LOG = landRight(1,Pole.of(1,2))   ;
    console.log(LOG)   ;
    LOG = landRight(-1,Pole.of(1,2))   ;
    console.log(LOG)   ;
    LOG = Pole.of(1,2).map(landLeft(2))   ;
    console.log(LOG)   ;
*/
    LOG = Pole.of(1,2).map(landLeft(5))   ;
    console.log(LOG)   ;
    LOG = Pole.of(1,2).map(landLeft(5)).map(landLeft(-2))   ;
    console.log(LOG)   ;
    LOG = Pole.of(1,2).map(banana).map(landLeft(-2))   ;
    console.log(LOG)   ;


