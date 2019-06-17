<!DOCTYPE html>

<meta charset="utf-8">
<script src="http://d3js.org/d3.v2.js?2.9.1"></script>
<style>

.link {
  fill: none;
  stroke: #666;
  stroke-width: 1.5px;
}

.node circle {
  fill: #ccc;
  stroke: #fff;
  stroke-width: 1.5px;
}

text {
  font: 10px sans-serif;
  pointer-events: none;
}

</style>

<html>


<head>
    <script type="text/javascript" src="/../d3/d3.js"></script>
	<script type="text/javascript" src="/../Jquery/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" charset="utf-8">
		function loadJson() {
			window.alert("Carico il contenuto del file JSON per popolare la lista");
			$(document).ready(function()
				{
					$.getJSON('/graphsdata.json', function(json) {
						console.log(json);
					});
				});
			}
	</script>	
</head>
<body>
    
	
	<script src="test.js"/>
</body>
</html>
