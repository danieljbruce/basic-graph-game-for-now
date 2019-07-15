// data attributes: nodes 1 to 9
// links:

var attachCircleGraph = function(selector, vertexCount, edges, radius, center){
    var radiusEnlarged = radius * 1.5; // This variable stores the size the circle grows to when the circle is clicked.
    
    // This function calculates the starting x co-ordinate of the node
    this.calculateX = function(vertexNumber, vertexCount, radius, center){ 
        var angle = vertexNumber / vertexCount * 2 * Math.PI; // This calculates the angle that we want from the centre of the image
        var amountToAdd = Math.cos(angle); // This stores the amount of distance the node should be placed from the centre.
        return center + amountToAdd * (center - radius);
    }
    // This function calculates the starting y co-ordinate of the node
    this.calculateY = function(vertexNumber, vertexCount, radius, center){
        var angle = vertexNumber / vertexCount * 2 * Math.PI; // This calculates the angle that we want from the centre of the image
        var amountToAdd = Math.sin(angle);
        return center + amountToAdd * (center - radius);
    }
    for (var i = 0; i < edges.length; i++){
        var source = edges[i][0];
        var target = edges[i][1];
        var xSource = this.calculateX(source, vertexCount, radius, center);
        var ySource = this.calculateY(source, vertexCount, radius, center);
        var xTarget = this.calculateX(target, vertexCount, radius, center);
        var yTarget = this.calculateY(target, vertexCount, radius, center);
        // d3.select(selector).append(this.getEdgeHtml(xSource, ySource, xTarget, yTarget));
        d3.select("#game").append("line").attr("index", i).attr("class","link")
            .attr("x1", xSource).attr("y1", ySource).attr("x2",xTarget)
            .attr("y2", yTarget).attr("source", source).attr("target", target)
    }
    for (var i = 0; i < vertexCount; i++){
        var x = this.calculateX(i, vertexCount, radius, center);
        var y = this.calculateY(i, vertexCount, radius, center);
        // d3.select(selector).append(this.getVertexHtml(x, y, radius));
        d3.select("#game").append("circle").attr("r", radius)
            .attr("transform", "translate("+x+", "+y+")")
            .attr("index", i).style('fill', 'rgb(255, 0, 0)').attr('color', 0);
    }
    $("#game circle").click(function(event){
        var element = event.target; // stores a variable 'element' that equals the object in the d3 selection
        var colorValue = (parseInt(d3.select(element).attr('color')) + 1) % 3; // Stores a variable 'value' representing the new colour
        d3.select(element).attr('color', colorValue); // Sets the 'value' attribute of the element object to the new value
        // This 'if' block changes the colour of the nodes by changing the fill attribute.
        if (colorValue === 0){ 
            d3.select(element).style('fill', 'rgb(255, 0, 0)'); // Fills the node clicked with red colour
        } else if (colorValue === 1) {
            d3.select(element).style('fill', 'rgb(0, 255, 0)'); // Fills the node clicked with blue colour
        } else {
            d3.select(element).style('fill', 'rgb(0, 0, 255)'); // Fills the node clicked with green colour
        }
        var indexValue = parseInt(d3.select(element).attr('index'));
        for (var i = 0; i < edges.length; i++){
            var source = edges[i][0];
            var target = edges[i][1];
            if (indexValue === source || indexValue === target){
                console.log(i);
                d3.select(d3.selectAll("#game line")[0][i]).style("stroke", "red");
            }
        }
        d3.select(element).transition().duration(200).attr("r", radiusEnlarged).transition().duration(200).attr("r", radius);
        // select lines of interest and consider changing their color
    })
}