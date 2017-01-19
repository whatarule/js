
var _ = require("lodash")   ;
var _r = require("ramda")   ;
var _i = require("immutable")   ;

var Container = require("./module/Container.js")  ;

var plus = _r.curry(function(x,y){
    return x + y    ;
})   ;
/*
    var total = 111 ;
    var total = _i.Range().take(10) ;
    var total = plus(1,2)   ;
    var total = _.map([1,2,3,4,5,6,7,8,9],plus) ;
    var total = _.reduce([1,2,3,4,5,6,7,8,9],plus) ;
    var total = _.map(_i.Range().take(10).toArray(),plus) ;
    var total = _.reduce(_i.Range().take(10).toArray(),plus) ;
    var total = _i.Range().take(10).toArray().reduce(plus) ;
    var total = Container.of(_i.Range().take(10).toArray()) ;
    var total = Container.of(_i.Range().take(10).toArray()) 
                    .chain(_.reduce)    ;
    var total = Container.of(_.reduce)  ;
    var total = Container.of(_.reduce).ap(Container.of(plus))  ;
    var total = _.reduce(_i.Range().take(10).toArray()) ;
*/
    var total = Container.of(_i.Range().take(10).toArray().reduce(plus)) ;
/*
    var total = Container.of(_i.Range().take(10).toArray())
                    .chain(_.reduce).chain(plus)    ;
    var total = Container.of(_.reduce)
                    .ap(Container.of(_i.Range().take(10).toArray()))
                    .chain(plus)   ;
*/
    console.log(total)  ;


