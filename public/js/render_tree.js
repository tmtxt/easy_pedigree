$(document).ready(function(){
	// send ajax request to get the tree
	$.ajax('/tree-data').done(function(data){

		// print the tree to the console
		if(console && console.log){
			console.log(data);
		}

		
	});
});
