
  const daggy = require ( 'daggy' )   ;
  const compose = function ( f, g ) {
    return function ( x ) {
      return f ( g ( x ) )  ;
    }   ;
  }   ;
  const id = function ( x ) {
      return x  ;
  }   ;

  const Coyoneda = daggy.tagged ( 'x', 'f' )   ;
  Coyoneda.lift = function ( x ) {
    return Coyoneda ( x, id )   ;
  }   ;
  Coyoneda.prototype.map = function ( f ) {
    return Coyoneda ( this.x, compose( f, this.f ) )
  }   ;
  Coyoneda.prototype.lower = function () {
    return this.x.map ( this.f )   ;
  }   ;

  const Container = daggy.tagged ( 'x' )  ;


// sample
/*
  const set = new Set ( [1,1,2,3,3,4] )  ;
  
  const c_result =Coyoneda.lift( set )
                    .map( function ( x ) { return x + 1  ; } )
                    .map( function ( x ) { return x + "!" ; } )   ;

  const builtUpFn = c_result.f    ;
  const our_set = c_result.x    ;


  our_set.forEach( function( x ) { console.log( builtUpFn( x ) ) } )   ;
*/
/*
  console.log(
    Coyoneda.lift( [1,2,3] )
      .map( function ( x ) { return x * 2 ; } )
      .map( function ( x ) { return x - 1 ; } )
      .lower()
  )   ;
  Coyoneda.lift( [1,2,3] )
    .map( function ( x ) { return x * 2 ; } )
    .map( function ( x ) { return x - 1 ; } )
    .map( function ( x ) { console.log( x ) ; } )
    .lower()    ;
  const c_result =  Coyoneda.lift( [1,2,3] )
                      .map( function ( x ) { return x * 2 ; } )
                      .map( function ( x ) { return x - 1 ; } )
                      .lower()    ;
*/
/*
  const can = Container( "tuna" )   ;
  console.log(
    Coyoneda.lift( [can.x] )
      .map( function ( x ) { return x.toUpperCase() ; } )
      .map( function ( x ) { return x + "!" ; } )
      .lower()
  )   ;
*/


