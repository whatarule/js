
  // "use strict"    ;

    const _ = require ( 'underscore' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;
    const fs = require ( 'fs' ) ;


  const myfirstio_async_io = _o.io ( function ( ) {
      return process.argv [ 2 ] ;
    } ).map ( function ( x ) {
      return fs.readFile ( x, 'utf8', function ( err, data ) {
        err ?
            _o.io ( function ( ) { return err  ; } )
              .map ( console.log )
              .foldMap_io ( )
        :   _o.io ( function ( ) { return data ; } )
              .map ( function ( x ) { return x.split ( '\n' )  ; } )
              .map ( function ( x ) { return x.length - 1 ; } )
              .map ( console.log )
              .foldMap_io ( ) ;
            } )
        ;
    } ) ;

  myfirstio_async_io.foldMap_io ( )  ;

