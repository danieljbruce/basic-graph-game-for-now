// data attributes: nodes 1 to 9
// links:

var attachCircleGraph = function(selector, vertexCount, edges, radius, center){
    this.calculateX = function(vertexNumber, vertexCount, radius, center){
        var angle = vertexNumber / vertexCount * 2 * Math.PI;
        var amountToAdd = Math.cos(angle);
        return center + amountToAdd * (center - radius);
    }

    this.calculateY = function(vertexNumber, vertexCount, radius, center){
        var angle = vertexNumber / vertexCount * 2 * Math.PI;
        var amountToAdd = Math.sin(angle);
        return center + amountToAdd * (center - radius);
    }
    // this.getEdgeHtml = function(x1, y1, x2, y2){
    //     return '<line class="link" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"></line>'
    // }
    // this.getVertexHtml = function(x1, y1, radius){
    //     var html = '<g class="node" transform="translate('+x1+', ' +y1+')">';
    //         html += '<circle r="'+radius+'" style="fill: rgb(255, 0, 0);"></circle>';
    //         html += '</g>';
    //     return html;
    // }
    // Fix position of vertices and edges
    // Add event listener to vertices - changes color and grow/shrink animation
    //
    for (var i = 0; i < edges.length; i++){
        var source = edges[i][0];
        var target = edges[i][1];
        var xSource = this.calculateX(source, vertexCount, radius, center);
        var ySource = this.calculateY(source, vertexCount, radius, center);
        var xTarget = this.calculateX(target, vertexCount, radius, center);
        var yTarget = this.calculateY(target, vertexCount, radius, center);
        // d3.select(selector).append(this.getEdgeHtml(xSource, ySource, xTarget, yTarget));
        d3.select("#game").append("line").attr("class","link")
            .attr("x1", xSource).attr("y1", ySource).attr("x2",xTarget)
            .attr("y2", yTarget).attr("source", source).attr("target", target)
    }
    for (var i = 0; i < vertexCount; i++){
        var x = this.calculateX(i, vertexCount, radius, center);
        var y = this.calculateY(i, vertexCount, radius, center);
        // d3.select(selector).append(this.getVertexHtml(x, y, radius));
        d3.select("#game").append("circle").attr("r", radius)
            .attr("transform", "translate("+x+", "+y+")")
            .attr("value", i).style('fill', 'rgb(255, 0, 0)').attr('value', 0);
    }
    $("#game circle").click(function(event){
        var element = event.target;
        var value = (parseInt(d3.select(element).attr('value')) + 1) % 3;
        d3.select(element).attr('value', value);
        if (value === 0){
            d3.select(element).style('fill', 'rgb(255, 0, 0)');
        } else if (value === 1) {
            d3.select(element).style('fill', 'rgb(0, 255, 0)');
        } else {
            d3.select(element).style('fill', 'rgb(0, 0, 255)');
        }
        d3.select(element).transition().duration(200).attr("r", 70).transition().duration(200).attr("r", 50);
        // select lines of interest and consider changing their color
    })
}