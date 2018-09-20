const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

app.use(upload());
app.use(express.static(__dirname+ '\\public'));
app.use(bodyParser());

app.get('/', function(request, response){
	response.sendFile('index.html');
});

app.post('/', function(request, response){
	if(request.files){
		var file = request.files.filename;
		var filename = file.name;
		console.log(file.mimetype);
		if(file.mimetype != 'application/pdf'){
			console.log('Did not match!');
			response.sendFile('pdf_check.html', {"root": path.join(__dirname, 'public')});
		}

		
		
	}
});

app.listen(3000, function(){
	console.log("server listening on port "+3000);
});



