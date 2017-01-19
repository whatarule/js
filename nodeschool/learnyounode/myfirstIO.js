
  // "use strict"    ;

    const _ = require ( 'underscore' )   ;
    const _r = require ( 'ramda' )       ;
    const _i = require ( 'immutable' )   ;

    const _o = require ( './module/Operational.js' )    ;
    const Task = require ( 'data.task' ) ;


  const fs = require ( 'fs' ) ;

  const myfirstio_io = _o.io ( function ( ) {
      return process.argv [ 2 ]  ;
    } ).map ( function ( x ) {
      return fs.readFileSync ( x, 'utf8' )  ;
    } ).map ( function ( x ) {
      return x.split ( '\n' )  ;
      // return x.toString ( ).split ( '\n' )  ;
    } ).map ( function ( x ) {
      return x.length - 1  ;
    } ).map ( function ( x ) {
      console.log ( x ) ;
    } ) ;

  myfirstio_io.foldMap_io ( ) ;


