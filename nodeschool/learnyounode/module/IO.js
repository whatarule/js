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


    module.exports = IO ;


