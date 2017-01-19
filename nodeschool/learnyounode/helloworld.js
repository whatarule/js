
    // "use strict"    ;

    const _ = require ( 'underscore' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;


/*
  const hello_world_maybe = _o.just ( 'HELLO WORLD' )
                              .map ( function ( x ) {
                                return x.length  ;
                              } ) ;
  hello_world_maybe
    .foldMap ( _o.interpret, Task.of )
    .fork ( console.error, console.log )  ;
*/

  const hello_world_io = _o.io ( function ( ) {
                            return 'HELLO WORLD'  ;
                          } ).map ( function ( x ) {
                              console.log ( x )  ;
                          }  )  ;

  hello_world_io
    .foldMap ( _o.interpret, Task.of )  
    .fork ( console.error, _o.id )  ;
  

