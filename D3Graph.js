/*function checkWin(pd3Graph){
  //Check to see if the graph is 3-colorable
}
*/

var printObject = function(o) {
	var out = '';
	for (var p in o) {
		out += p + ': ' + o[p] + '\n';
	}
	alert(out);
};

var setColor = function(object){

};

var moveable = true;
//setTimeout(function(){moveable = false;}, 5000);
/*
function Color(){
    var color = "red"
    var Color.prototype.change = function(newColor){

    }  
}
*/


//var seal = {data: "dog"};
function D3Graph(pd3EdgeSet){
    var links = pd3EdgeSet;
    var nodes = {};
    var force = {};
    var svg = {};
    var link =  {};
    var node =  {};
    var width = 960, height = 800;
    var lclNodeColors = new NodeColors();//= new NodeColors();
    var lclEdgeColors = {};//= new EdgeColors();

    //console.log(links);


    function NodeColors(){
        //var lclNodeColors = {};
        var lclTasks = {}; // functions to be run when there is a change in state.
        /*
        NodeColors.Color = function(index, newColor){

        }
        */
        this.setNodeColor = function(pNodeData, pColor){
          nodes.color = pColor;
          pNodeData.color = pColor;
          //console.log(pNodeData);
          //console(node.selectAll("circle").filter(function(d){return (d.index == pNodeData.index);}));
          //lclNodeColors[pNodeId] = pColor;
          //nodes[pColor]
          this.runDelegates(pNodeData.index, pColor);
          return pColor;
        };

        this.getNodeColor = function(pNodeId){
          return node.select("circle").filter(function(d){/*return (d === pNodeId);*/  return (d.index == pNodeId);})[0][0]["__data__"]["color"];
        };

        this.setDelegate = function(pDelegateName, pDelegateFunction){
          lclTasks[pDelegateName] = pDelegateFunction;
        };

        this.removeDelegate = function(pDelegateName){
          delete lclTasks[pDelegateName];
        };

        this.runDelegates = function(pNodeId, pColor){
          //lclTasks.forEach(function(task){console.log(task)});
          //console.log(pColor);
          //console.log(lclNodeColors);
          var lclDelegateResults = [];
          for (var task in lclTasks){
            //console.log(lclTasks[task]);
            lclDelegateResults[task] = lclTasks[task](pNodeId, pColor);
          }
          return lclDelegateResults;
        };
    };



    var colorCircle = function(pNodeId, pColor){

      

      node.selectAll("circle").filter(function(d){/*return (d === pNodeId);*/  return (d.index == pNodeId);})
        //.transition()
        //.duration(500)
        .style("fill", function (d) { return pColor; });
      
      var linkSelection = link.filter(function(d){/*return (d === pNodeId);*/  return (d.source.index == pNodeId || d.target.index == pNodeId);});
      
      linkSelection.style("stroke", function(d){
        var a, b;
        a = lclNodeColors.getNodeColor(d.source.index);
        b = lclNodeColors.getNodeColor(d.target.index);
        //console.log(a + ", " + b);
        if (a === b){
          //console.log("herny");
          d.type = "#ff0000";
          return "#ff0000";
        } else {
          d.type = "#000000";
          return "#000000";
        }
      });

      for (i in linkSelection){
          console.log(i);
      }

      node.selectAll("circle").filter(function(d){/*return (d === pNodeId);*/  return (d.index == pNodeId);})
        .transition()
        .duration(250)
        .attr("r", 32)
        .duration(250)
        .attr("r", 8);

    };
    

    updateNodes = function(){
        var selection = node.select("circle").data();
    };

    lclNodeColors = new NodeColors();

    lclNodeColors.setDelegate("Circle Coloring", function(pNodeId, pColor){colorCircle(pNodeId, pColor);});
    

    
  

	links.forEach(function(link) {


		link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, color: "#ff0000"});
		link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, color: "#ff0000"});
	});

    console.log(nodes);

    var toggleColor = function(pNodeData){
		//console.log(pNode.color);
		//pNodeData.color = "#00ff00";
		if (pNodeData.color === "#00ff00"){
			lclNodeColors.setNodeColor(pNodeData, "#0000ff");
		} else if (pNodeData.color === "#0000ff") {
			lclNodeColors.setNodeColor(pNodeData, "#ff0000");
		} else {
			lclNodeColors.setNodeColor(pNodeData, "#00ff00");
		}

		checkWin();
    };

	var mouseclick = function(pEvent){
		//console.log(pEvent);
		toggleColor(pEvent);
	};

    var mouseover = function () {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 16);
    };

    var mouseout = function() {
      //d3.select(this)
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 8);
    };

    function tick(){
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });


        node
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      //} 
    };

    force =  d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(200)
        .charge(-5000)
        .on("tick", tick)
        .start();
    
    svg = d3.select("#viz").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", function (d) {  return '#ff0000'; });

    node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        //.attr("index", function(d){return this.__data__.index;})
        //.attr("color", 0)
        //.attr('r', 8)        
        .call(force.drag);
        //.append("circle.node").style("fill", function (d) { return '#ff0000'; })
        //.enter().append("svg:circle")
        
    for (var i in node){
      console.log(i);
      //lclNodeColors.setNodeColor(i, "#ff0000");
    }

    for (var i in link){

      //console.log(i);
      i.type = "#ff0000";
    }

    for (var currentNode in Object.keys(nodes)){
        //console.log(currentNode);
        //console.log(svg.selectAll(".node").selectAll("[.index=0]"));
    }
    //delete currentNode;

    for (var currentnode in svg.selectAll(".node").data(force.nodes())){
      
      //console.log(currentnode);  
    }
        
    node.append("circle")
        .attr("r", 8)
        //.call()
        .style("fill", function (d) { /*console.log("lawrence"); console.log(d.color); */return '#ff0000'; });

    node.on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", mouseclick, function(d){return d;});


    var checkWin = function(pTheGraph){
    for (var i = 0; i < links.length; i++){
      //console.log(i);
      //console.log(i[0]["__data__"]);
      console.log(links[i].type);
      if (links[i].type != "#000000") {return false;}
    }
    //console.log(link);
    alert("You Win");
    d3.select("svg")
      .remove();
    currentLevel++;
    generateLevel(currentLevel);
    return true;
    
  };    
}


