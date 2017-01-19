
  // "use strict"    ;

    const _ = require ( 'lodash' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;
    const fs = require ( 'fs' ) ;
    const path = require ( 'path' ) ;

  const filterdLS = _o.io ( function ( ) {
      return process.argv [ 2 ] ;
    } ).map ( function ( x ) {
      return fs.readdir ( x, function ( err, list ) {
        err ?
            _o.io ( function ( ) { return err  ; } )
              .map ( console.log )
              .foldMap_io ( )
        :   _o.io ( function ( ) { return list  ; } )
              .map ( function ( x ) { return x.filter ( function ( x ) {
                  return path.extname ( x ) === '.' + process.argv [ 3 ] ;
              } ) } )
        //    .map ( console.log )
        //    .map ( function ( x ) { console.log ( x [ 1 ] ) } )
        //    .map ( function ( x ) { return x.map ( console.log ) } )
              .map ( function ( x ) { return _.map ( x,
                function ( e, i, array ) { console.log ( e ) }
              ) } )
              .foldMap_io ( )
        ;
      } ) ;
    } )
    .foldMap_io ( )  ;


