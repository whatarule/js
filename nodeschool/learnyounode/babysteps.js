
    // "use strict"    ;

    const _ = require ( 'underscore' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;


    const plus = function ( x, y ) {
        return Number ( x ) + Number ( y )  ;
    } ;
    

    const babysteps_io = _o.io ( function ( ) {
                            return process.argv
                          } ).map ( function ( x ) {
                            return x.splice ( 2, x.length - 2 )  ;
                          } ).map ( function ( x ) {
                            return x.reduce ( plus )  ;
                          } ).map ( function ( x ) {
                            console.log ( x )  ;
                          } ) ;
    babysteps_io
      .foldMap ( _o.interpret, Task.of )
      .fork ( console.error, _o.id )  ;


