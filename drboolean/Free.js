
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
      return Free.of( f ( a ) )  ;
    })  ;
  }

  /*
  // runFree :: Free a -> a
  const runFree = function ( free )  {
    console.log ( 'free:' )  ;
    console.dir ( free ) ;
    return free.cata ( {
      Impure: function ( x, q ) {
        console.log ( 'impure:' ) ;
        console.dir ( x ) ;
        console.dir ( q ( x ) ) ;
        return runFree ( q ( x ) )  ;
      } ,
      Pure: function ( x ) {
        console.log ( 'pure:' ) ;
        console.dir ( x )  ;
        console.log ( '' )  ;
        return x  ;
      } ,
    } ) ;
  }  ;
  */

  // liftF :: ( Monad a m ) => m -> Free a
  const liftF = function ( command ) {
    return Impure ( command, Pure )  ;
  } ;

  // sample
  /*
    console.log (
    //  Free.of ( 1 )
    //  Pure ( 1 )
    //    .chain ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 2 ; } )
    //  Impure ( 1,  id )
        Impure ( 1,  Pure )
          .map ( function ( x ) { return x + 1 ; } )
    )  ;

    runFree (
    //  Free.of ( 1 )
    //  Pure ( 1 )
    // *  .chain ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 2 ; } )
    // *Impure ( 1,  id )
        Impure ( 1,  Pure )
          .map ( function ( x ) { return x + 1 ; } )
    )  ;
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

  /*
  // runMaybe :: Free a -> ?
  const runMaybe = function ( free )  {
    console.log ( 'free:' )  ;
    console.dir ( free ) ;
    return free.cata ( {
      Impure: function ( m, q ) {
        console.log ( 'impure:' ) ;
        console.dir ( m ) ;
        return m.cata ( {
          Just: function ( x ) {
            console.log ( 'just:' ) ;
            console.dir ( x )  ;
            console.dir ( q ( x ) )  ;
            console.log ( '' )  ;
            return runMaybe ( q ( x ) )  ;
          } ,
          Nothing: function ( ) {
            console.log ( 'nothing:' )  ;
            console.dir ( Nothing )  ;
            console.log ( '' )  ;
            return Nothing  ;
          } ,
        } ) ;
      } ,
      Pure: function ( x ) {
        console.log ( 'pure:' ) ;
        console.dir ( x )  ;
        console.log ( '' )  ;
        return x  ;
      } ,
    } ) ;
  }  ;
  */

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
    runMaybe ( maybe_name )
  */
  /*
    runMaybe (
    //  Free.of ( 1 )
    //  Pure ( 1 )
    // *  .chain ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 2 ; } )
    // *Impure ( 1,  id )
    // *Impure ( 1,  Pure )
    //  nothing
    //    .map ( function ( x ) { return x + 1 ; } )
    //    .map ( function ( x ) { return x + 2 ; } )
        just ( 1 )
          .map ( function ( x ) { return x + 1 ; } )
          .map ( function ( x ) { return x + 2 ; } )
    ) ;
  */

  /**/
    maybe_name.foldMap ( maybeToTask, Task.of )
                .fork ( console.error , console.log ) ;


// IO via Free

  // data IO a = IO ( a -> ( ) )
  const IO = daggy.taggedSum ( { IO: [ 'f' ] } ) ;

  // io :: Free a
  const io = compose ( liftF, IO.IO ) ;

  // unsafePerformIO :: Free a -> ()
  const unsafePerformIO = function ( free ) {
    return free.cata ( {
      Impure: function ( m, q ) {
        console.log ( 'impure:' )  ;
        console.dir ( m )  ;
        return unsafePerformIO ( q ( m.f( ) ) )
      }  ,
      Pure: id  ,
    } ) ;
  }  ;

  // sample

  /*
    // localStorage :: Free ( IO ( a -> { a } ) )
    const localStorage = io ( function ( ) {
      return { preference: 'blue' }  ;
    } )  ;
    // printLn :: a -> ( a -> IO ( a -> ( ) ) )
    const printLn = function (x) {
      return io ( function ( ) { console.log( x )  ; } )  ;
    } ;

    // printStorege :: Free ( IO ( ) )
    const printStorage = localStorage
                          .map ( function ( l ) { return l.preference ; } )
                          .chain ( printLn )
                          ;
    unsafePerformIO ( printStorage )  ;

    console.log (
      localStorage
        .chain ( function ( l ) { return l.preference ; } )
    //  .map ( function ( l ) { return l.preference ; } )
    )  ;

    unsafePerformIO (
      localStorage
    // *.chain ( function ( l ) { return l.preference ; } )
        .map ( function ( l ) { return l.preference ; } )
        .chain ( printLn )
    )  ;
  */




