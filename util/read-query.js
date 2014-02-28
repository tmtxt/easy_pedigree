var fs = require('fs');

function read_query(filename){
	return fs.readFileSync(__dirname + '/../query/' + filename + ".sql", 'utf8');
}

module.exports = read_query;
