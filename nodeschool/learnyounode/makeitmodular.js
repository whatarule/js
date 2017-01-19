
  // "use strict"    ;

    const _ = require ( 'lodash' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;
    const fs = require ( 'fs' ) ;
    const path = require ( 'path' ) ;


  const _m = require ( './makeitmodule_module' ) ;

  const callback = function ( err, data ) {
    err ?
        _o.io ( function ( ) {
          return err ;
        } ).foldMap_io ( )
    :   _o.io ( function ( ) {
    
    } )
    ;
  }  ;

  _m ( process.argv [ 2 ], process.argv [ 3 ], callback )
  .foldMap_io ( ) ;


// module
/**/
  const makeitmodular = function ( path, ext, callback ) {
    try {
      return _o.io ( function ( ) {
          return path  ;
        } ).map ( function ( x ) {
          return fs.readdir ( x, callback )
        } ) ;
    } catch ( err ) { console.log ( err ) } ;
  } ;
    
