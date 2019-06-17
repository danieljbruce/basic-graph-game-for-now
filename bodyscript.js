

var generateLevel = function(level){
  var cycle = new UndirectedGraph();
  var ugK5 = new UndirectedGraph();
  var max3 = new UndirectedGraph();

  var lclNumberOfNodes = level;
  for (var i = 0; i < lclNumberOfNodes; i++){
    //cycle.addNode({A: 1, B: i});
    //ugKlclNumberOfNodes.addNode({A: 1, B: i});
  }
  for (var i = 0; i < lclNumberOfNodes; i++){
    cycle.addEdge(i % lclNumberOfNodes, (i + 1) % lclNumberOfNodes);
    //cycle.addEdge((i + 1) % lclNumberOfNodes,i % lclNumberOfNodes);
  }

  for (var i = 0; i < lclNumberOfNodes; i++){
    for (var j = 0; j < i; j++){
      for (var k = 0; k < 3; k++){
        ugK5.addEdge((lclNumberOfNodes * (k % 3)) + j, (lclNumberOfNodes * ((k + 1) % 3)) + i);
      }
    }
  }
  //console.log(ugK5);

  var lclA = 1 + parseInt(Math.random() * (lclNumberOfNodes *2 / 3 - 1));
  var lclB = 1 + parseInt((lclNumberOfNodes - lclA - 1)*Math.random());
  var lclC = lclNumberOfNodes - lclB - lclA;
  for (var i = 0; i < lclA; i++){
    for (var j = 0; j < lclB; j++){
      max3.addEdge(i, j + lclNumberOfNodes);
    }  
  }
  for (var i = 0; i < lclA; i++){
    for (var j = 0; j < lclC; j++){
      max3.addEdge(i, j+ (lclNumberOfNodes * 2));
    }
  }
  for (var i = 0; i < lclB; i++){
    for (var j = 0; j < lclC; j++){
      max3.addEdge(i + lclNumberOfNodes, j + (lclNumberOfNodes * 2));
    }
  }

  var edges = DT.fUndirectedGraphTod3Edges(max3);
  console.log(edges);
  var theGraph = new D3Graph(edges);

};

var currentLevel = 3;
generateLevel(currentLevel);
