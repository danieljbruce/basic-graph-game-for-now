function DataTransmute(){

	DataTransmute.prototype.fUndirectedGraphTod3Edges = function(pUndirectedGraph){
		var directedgraph = pUndirectedGraph.getDirectedGraph();
		var returnValue = [];

		var nodes = directedgraph._nodes;

		console.log(nodes);


		for (sourceNode in nodes){

			var sourceKey = directedgraph.getNode(sourceNode)['_outEdges'];//(Object.keys(sourceNode));
			var localCollection = Object.keys(sourceKey);
			for (var i = 0; i < localCollection.length; i++){

				var element = {};
				element.source = sourceNode;
				element.target = localCollection[i];
				element.type = 1;
				console.log(element);
				returnValue.push(element);

			}
		}

		return returnValue;
	};

	DataTransmute.prototype.fd3EdgeSetTod3NodeSet = function(pd3EdgeSet){
		// Compute the distinct nodes from the links.
		var lclGraph = new D3graph(pd3EdgeSet);
		return lclGraph;
	};

	DataTransmute.prototype.fUndirectedGraphTod3Nodes = function(pUndirectedGraph){
		return this.fd3EdgeSetTod3NodeSet(this.fUndirectedGraphTod3Edges(pUndirectedGraph));
	};
}
var DT = new DataTransmute();