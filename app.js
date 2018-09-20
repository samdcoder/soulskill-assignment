const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.get('/', function(request, response){
	response.sendFile('index.html');
});

app.post('/', function(request, response){
	if(request.files){
		var file = request.files.filename;
		var filename = file.name;
		var user_email = request.body.email;
		if(file.mimetype != 'application/pdf'){
			console.log('Did not match!');
			response.sendFile('pdf_check.html', {"root": path.join(__dirname, 'public')});
			return;

		}
		// format: soulskill/resumes/user_email_id/resume.pdf

		if(!fs.existsSync(path.join(__dirname, 'resumes', user_email))){
			fs.mkdirSync(path.join(__dirname, 'resumes', user_email));
		}

		file.mv(path.join(__dirname, 'resumes', user_email, filename), function(err) {
				if(err){
					console.log("error: ", err);
					response.send("error occurred!");
				}
			});
	}
});

app.listen(3000, function(){
	console.log("server listening on port "+3000);
});



