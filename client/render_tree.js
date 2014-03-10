////////////////////////////////////////////////////////////////////////////////
// required libraries
var jquery = require('jquery-browserify');
var d3 = require('d3-browserify');

var i = 0;
var root; // this is the hierarchy tree
var tree, diagonal, vis;        // supporting variables for drawing tree

// component size
var w = jquery("#body").width(); // width
var h = 1000;                    // height
var link_height = 150;           // height of the connection link

////////////////////////////////////////////////////////////////////////////////
// Zoom feature for tree
// define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

// zoom handler
function zoom() {
  vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

////////////////////////////////////////////////////////////////////////////////
// basic layout for the tree
// create a tree layout using d3js
tree = d3.layout.tree()
	.size([h, w]);
diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

// create the svg tag and append to the body of the website
vis = d3.select("#body").append("svg:svg")
	.attr("width", w)
	.attr("height", h)
  .call(zoomListener)
	.append("svg:g")
	.attr("transform", "translate(" + 0 + "," + 80 + ")");

////////////////////////////////////////////////////////////////////////////////
// request the tree data from the server and then render
d3.json("/data/tree-data", function(json) {
	root = json;
	root.x0 = w / 2;
	root.y0 = 0;

	function toggleAll(d) {
		if (d.children) {
			d.children.forEach(toggleAll);
			toggle(d);
		}
	}

	// Initialize the display to show a few nodes.
	root.children.forEach(toggleAll);

	// update the new position
	update(root);
});

////////////////////////////////////////////////////////////////////////////////
// Toggle children.
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
}

////////////////////////////////////////////////////////////////////////////////
// update for each toggle
function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * link_height; });

	// update the x position
  var offsetLeft = 0;
  var ratio;
  if(nodes.length === 1){
    ratio = root.x / (w/2);
  } else {
    offsetLeft = d3.min(nodes, function(d) {return d.x;});
    offsetLeft -= 50;
    ratio = (root.x - offsetLeft) / (w/2);
  }
  nodes.forEach(function(d) {
		d.x = (d.x - offsetLeft) / ratio;
	});

  // Update the nodes…
  var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
	
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });

  // the node
  nodeEnter.append("svg:circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		.on("click", function(d) { toggle(d); update(d); });

  // text for displaying name
  nodeEnter.append("svg:text")
  //.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
    .attr("y", -19)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1e-6)
		.on("click", function(d) {console.log(d);});

  // append picture
  nodeEnter.append("svg:image")
    .attr("xlink:href", function(d){ return "/member_images/" + d.picture; })
    .attr("x", -25)
    .attr("y", -78)
    .attr("height", "50px")
    .attr("width", "50px");

	// compute the new tree height
	var currentMaxDepth = 0;
	function findMaxDepth(parent){
		if(parent.children && parent.children.length > 0){
			parent.children.forEach(function(d){
				findMaxDepth(d);
			});
		} else if(parent.depth > currentMaxDepth){
			currentMaxDepth = parent.depth;
		}
	}
	findMaxDepth(root);
	var newHeight = (currentMaxDepth + 1) * link_height;
	d3.select("svg").attr("height", newHeight);
	
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")";
    });

  nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

  // Update the links…
  var link = vis.selectAll("path.link")
    .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
