
  const daggy = require ( 'daggy' )  ;
  const Task = require ( 'data.task' ) ;
  const _ = require ( 'lodash' )  ;

  const id = function ( x ) {
      return x  ;
  }
  const compose = function ( f, g ) {
    return function ( x ) {
      return f ( g ( x ) )  ;
    } ;
  }
  const kleisli_comp = function ( f, g ) {
    return function ( x ) {
      return f ( x ).chain ( g )  ;
    } ;
  }


// Free

  // data Free a = Impure a ( a -> a ) | Pure a
  const Free = daggy.taggedSum ( { Impure: [ 'x_impure', 'f_impure' ], Pure: [ 'x_pure' ] } )  ;
  // Impure :: a -> ( a -> a ) -> Free a
  const Impure = Free.Impure ;
  // Pure :: a -> Free a
  const Pure = Free.Pure ;

  // Free.of :: a -> Free a
  Free.of = Pure  ;

  // chain :: ( a -> Free a ) -> Free a
  Free.prototype.chain = function ( f ) {
    return this.cata ( {
      Impure: function ( x, g ) {
        return Impure ( x, kleisli_comp ( g, f ) )  ;
      } ,
      Pure: function ( x ) {
        return f ( x )  ;
      } ,
    } )
  } ;
  // map :: ( a -> a ) -> Free a
  Free.prototype.map = function ( f ) {
    return this.chain( function ( a ) {
      return Free.of ( f ( a ) )  ;
    })  ;
  }

  // foldMap :: ( Monad m ) => ? -> ( a -> m )  -> a
  Free.prototype.foldMap = function ( interpreter, of ) {
    // console.log ( 'Free:' )  ;
    // console.dir ( this )  ;
    return this.cata ( {
      Impure: function ( intruction_of_arg, next ) {
        // console.log ( 'Impure:' )  ;
        // console.dir ( intruction_of_arg )  ;
        // console.dir ( interpreter (intruction_of_arg)
        //                 .chain ( function ( result ) { return next ( result )  ; } ) 
        // )  ;
        return interpreter ( intruction_of_arg )
          .chain ( function ( result ) {
            return next ( result ).foldMap ( interpreter, of )  ;
          } ) ;
      } ,
      Pure: function ( a ) {
        // console.log ( 'Pure:' )  ;
        // console.dir ( a )  ;
        return of ( a ) ;
      } ,
    } ) ;
  }  ;

  // liftF :: ( Monad a m ) => m -> Free a
  const liftF = function ( command ) {
    return Impure ( command, Pure )  ;
  } ;

  // maybeToTask :: Maybe a -> Task a
  const maybeToTask = function ( m ) {
    return m.cata ( {
      Just: Task.of ,
      Nothing: Task.rejected  ,
    } ) ;
  } ;
  // ioToTask :: IO a -> Task a
  const ioToTask = function ( i ) {
    return new Task ( function ( rej, res ) {
      return res ( i.f() ) ;
    } )  ;
  }  ;

  // sample
  /*
  */


// Maybe via Free

  // data Maybe a = Just a | Nothing
  const Maybe = daggy.taggedSum ( { Just: [ 'x_just' ], Nothing: [ ] } )  ;
  
  // Just :: a -> Maybe a
  const Just = Maybe.Just   ;
  // Nothing :: Maybe a
  const Nothing = Maybe.Nothing ;

  // just ::  a -> Free a
  const just = compose ( liftF, Just ) ;
  // nothing :: Free a
  const nothing = liftF ( Nothing ) ;

  // sample
    // safeProp :: String -> { a } -> Free a
    const safeProp = function ( k, o ) {
    return o [ k ]  ?
      just ( o [ k ] )  :
      nothing ;
    }

    // maybe_name :: Free ( Maybe String )
    const maybe_name = safeProp ( 'user', { user: { name: 'jerry' } } )
                        .chain ( function ( u ) { return safeProp( 'name', u ) ; } )
                        .map ( function ( n ) {  return n.toUpperCase() ; } )
                        ;
    
  /*
    maybe_name.foldMap ( maybeToTask, Task.of )
                .fork ( console.error, console.log ) ;
  */


// IO via Free

  // data IO a = IO ( a -> ( ) )
  const IO = daggy.taggedSum ( { IO: [ 'f' ] } ) ;

  // io :: Free a
  const io = compose ( liftF, IO.IO ) ;

  // sample

    // localStorage :: Free ( IO ( a -> { a } ) )
    const localStorage = io ( function ( ) {
      return { preference: 'blue' }  ;
    } )  ;
    // printLn :: a -> ( a -> IO ( a -> ( ) ) )
    const printLn = function (x) {
      return io ( function ( ) {
        console.log ( x )  ;
        console.log ( '' )  ;
      } )  ;
    } ;

    // printStorege :: Free ( IO ( ) )
    const printStorage = localStorage
                          .map ( function ( l ) { return l.preference ; } )
                          .chain ( printLn )
                          ;
    
  /*
    printStorage.foldMap ( ioToTask, Task.of )
                  .fork( console.err, id ) ;
  */



// interpreter

  // dispatch :: ( Monad -> m ) => [ [ m, ( m -> Task a ) ] ] -> ( m -> Task a )
  const dispatch = function ( pairs ) {
    return function ( m ) {
      const interpreter = _.find ( pairs, function ( pair ) {
        return m.constructor == pair [ 0 ]  ;
      } )  ;
      // console.log ( 'interpreter:' )  ;
      // console.dir ( interpreter [ 0 ] )  ;
      return interpreter [ 1 ] ( m )  ;
    }  ;
  }  ;
  // interpret :: ( Monad -> m ) => m -> Task a
  const interpret = dispatch ( [ [ Maybe, maybeToTask ], [ IO, ioToTask ], ] ) ;

  // sample

    const console_res = function ( x ) {
      console.log ( x )  ;
      console.log ( '' )  ;
    } ;

  /*
    maybe_name.foldMap ( interpret, Task.of )
                .fork ( console.error, console_res ) ;

    printStorage.foldMap ( interpret, Task.of )
                  .fork ( console.error, id ) ;
  */

  
  Free.prototype.foldMap_io = function ( ) {
    this.foldMap ( interpret, Task.of ).fork ( console.error, id ) ;
  } ;

  module.exports = {
    id: id  ,
    interpret: interpret  ,
    just: just  ,
    nothing: nothing ,
    io: io  ,
  } ;


