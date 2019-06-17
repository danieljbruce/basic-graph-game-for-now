$("#game").empty();
attachCircleGraph("#game", 5, [[0,1], [1,2], [2,3], [3, 4], [4, 0]], 50, 475);
var html = '<g class="node" transform="translate(475, 475)">'
    html += '<circle r="50" style="fill: rgb(255, 0, 0);"></circle>'
    html += '</g>'
$("#game").append(html);