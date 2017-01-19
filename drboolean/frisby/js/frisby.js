
requirejs("https://cdnjs.cloudflare.com/ajax/libs/ramda/0.22.1/ramda.min.js")	;

// basic functions
	var add = curry(function(x){
		return x + y	;
	})	;
//

// container
	var Container = function(x){
		this.__value = x	;
		console.log(this)	;
	}	;
	Container.of = function(x){
		return new Container(x)		;
	}	;
	Container.prototype.map = function(f){
		return Container.of(f(this.__value))	;
	}	;
//

