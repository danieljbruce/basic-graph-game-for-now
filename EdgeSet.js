function EdgeSet(newArray){
	var m_Edges = [];
	
	if (newArray instanceof Array){
		for(var i = 0; i < newArray.length; i++){
			if (newArray[i] instanceof Array && newArray[i].length === 2){
				m_Edges.push(newArray[i]); 
			}
		}
	}
}