
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


    module.exports = Container   ;


//    Container.of(console.log).ap(Container.of("aaa")) ;


