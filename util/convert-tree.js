// contains the function for converting the children in tree structure from {}
// to [] to use with d3js

function childrenObjectToArray (tree){
	if(tree.children === null || tree.children === undefined){
		return;
	}

	if(typeof tree.children == "object"){
		// convert to array
		var children = [];
		for(var child in tree.children){
			var childTree = tree.children[child];
			childrenObjectToArray(childTree);
			children.push(childTree);
		}
		tree.children = children;
	}
}

function childrenObjectToArrayRecursive(){
	
}

function childrenArrayToObject(tree){
	
}

exports.childrenObjectToArray = childrenObjectToArray;
exports.childrenArrayToObject = childrenArrayToObject;
