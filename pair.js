function Pair(pNewFirst, pNewSecond){
	
	var first = pNewFirst;
	var second = pNewSecond;
	
	this.first = function(newFirst){ 
		if (newFirst === undefined) {return first;}
		first = newFirst;
		return first;
	}
	
	this.second = function(newSecond){
		if (newSecond === undefined) {return second;}
		second = newSecond;
		return second;
	}
	
	this.swap = function(){
		var lclTemp = first.clone();
		first = second.clone();
		second = lclTemp;
	}
	
}

