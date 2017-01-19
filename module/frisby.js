var curry = _.curry ;
        var _ = R    ;
// basic functions
    var id = function(x){
        return x    ;
    }    ;
    var add = curry(function(x,y){
        return x + y    ;
    })    ;

// container
    var Container = function(x){
        this.__value = x    ;
        console.log(this)    ;
    }    ;
    Container.of = function(x){
        return new Container(x)        ;
    }    ;
    Container.prototype.map = function(f){
        return Container.of(f(this.__value))    ;
    }    ;
    Container.prototype.join = function(){
        return Container.of(this.__value)    ;
    }    ;
    Container.prototype.chain = function(f){
        return Container.of(f(this.__value)).join()        ;
    //    return this.map(f).join()    ;
    }    ;
    Container.prototype.ap = function(other_container){
        return other_container.map(this.__value)    ;
    }    ;
    
// maybe
    var Maybe = function(x){
        this.__value = x    ;
        console.log(this)    ;
    }    ;
    Maybe.of = function(x){
        return new Maybe(x)        ;
    }    ;
    Maybe.prototype.isNothing = function(){
        return (
                    this.__value === null
            ||        this.__value === undefined
        )    ;
    }    ;
    Maybe.prototype.map = function(f){
        return this.isNothing() ?
                Maybe.of(null)
            :    Maybe.of(f(this.__value))
        ;
    }    ;
    Maybe.prototype.join = function(){
        return this.isNothing ?
            Maybe.of(null)
        :    this.__value
        ;
    }    ;
    Maybe.prototype.chain = function(f){
        return this.map(f).join()    ;
    }    ;
    Maybe.prototype.ap = function(other_maybe){
        return other_maybe.map(this.__value)    ;
    }    ;
    
// either
    var Left = function(x){
        this.__value = x    ;
        console.log(this)    ;
    }    ;
    Left.of = function(x){
        return new Left(x)        ;
    }    ;
    Left.prototype.map = function(f){
        return this        ;
    }
    
    var Right = function(x){
        this.__value = x    ;
        console.log(this)    ;
    }    ;
    Right.of = function(x){
        return new Right(x)        ;
    }    ;
    Right.prototype.map = function(f){
        return Right.of(f(this.__value))    ;
    }    ;
    
    var either = curry(function(f,g,e){
        switch(e.constructor){
            case Left    :
                return f(e.__value)        ;
            case Right    :
                return g(e.__value)        ;
        }
    })    ;

// io
    var IO = function(f){
        this.unsafePerformIO = f    ;
    }    ;
    IO.of = function(x){
        console.log(x)    ;
        return new IO(function(){
            return x    ;
        })    ;
    }    ;
    IO.prototype.map = function(f){
        return new IO(_.compose(f,this.unsafePerformIO))
    }    ;
    IO.prototype.join = function(){
        var thiz = this        ;
        return new IO(function(){
            return thiz.unsafePerformIO().unsafePerformIO()        ;
        })    ;
    }    ;
    IO.prototype.chain = function(f){
        return this.map(f).join()    ;
    }    ;
    IO.prototype.ap = function(other_io){
        var thiz = this        ;
        return other_io.map(thiz.unsafePerformIO)    ;
    }    ;
    
// join
    var join = function(mma){
        return mma.join()    ;
    }    ;
    
// chain
    var chain = curry(function(f,m){
        return m.map(f).join()        ;
    })    ;
    
// lift
    var liftA2 = curry(function(f,functor1,functor2){
        return functor1.map(f).ap(functor2)    ;
    })    ;
    var liftA3 = curry(function(f,functor1,functor3){
        return functor1.map(f).ap(functor2).ap(functor3)    ;
    })    ;
    

