var fs = require('fs');

function read_query(filename){
	return fs.readFileSync('../query/' + filename + ".sql", 'utf8');
}

module.exports = read_query;
