var http = require('http');

http.createServer(function(request, response) {
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('db');

	db.serialize(function() {
		/*db.run('CREATE TABLE lorem (info TEXT)');

		var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
		for (var i = 0; i < 10; i++) {
			stmt.run('Ipsum ' + i);
		}
		stmt.finalize();*/

		var body = '';

		db.each('SELECT rowid AS id, info FROM lorem',
			function(err, row) {
				console.log(row.id + ': ' + row.info);
				body += row.id + ': ' + row.info + '<br />';
			},
			function(){
				var html = '<html>'+
					'<head>'+
					'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
					'</head>'+
					'<body>'+
					body+
					'</body>'+
					'</html>';

				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(html);
				response.end();
			}
		);		
	});
	db.close();
}).listen(8888);