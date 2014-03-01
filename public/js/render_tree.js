var m = [20, 0, 20, 0],
i = 0,
root;

var w = $("#body").width();
var h = w;

var tree, diagonal, vis;

var link_height = 150;

d3.json("/tree-max-depth", function(max_depth){

	h = 1000;
	
	tree = d3.layout.tree()
		.size([h, w]);

	diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.x, d.y]; });

	vis = d3.select("#body").append("svg:svg")
		.attr("width", w)
		.attr("height", h)
		.append("svg:g")
		.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	d3.json("/tree-data", function(json) {
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
});

function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * link_height; });

	// update the x position
	var ratio = root.x / (w/2);
	nodes.forEach(function(d) {
		d.x = d.x / ratio;
	});

  // Update the nodes…
  var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
	
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });

  nodeEnter.append("svg:circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		.on("click", function(d) { toggle(d); update(d); });

  nodeEnter.append("svg:text")
    .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1e-6)
		.on("click", function(d) {console.log(d);});

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
	// tree = tree.size([newHeight, w]);
	d3.select("svg").attr("height", newHeight);
	
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 4.5)
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
