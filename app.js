const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
const User = require('./models/user');
const env = require('./env');
const PORT = process.env.port || 3000; 

mongoose.connect('mongodb+srv://samdcoder:'+env.mongopw+'@cluster0-bcmtk.mongodb.net/test?retryWrites=true');

app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.get('/', function(request, response){
	response.sendFile('index.html');
});

app.post('/', function(request, response){
	console.log(request);
	if(request.files){
		var file = request.files.filename;
		var filename = file.name;
		var user_email = request.body.email;
		if(file.mimetype != 'application/pdf'){
			response.send({'message': 'Please use .pdf files for uploading resume'});
			return;

		}

		if(!fs.existsSync(path.join(__dirname, 'resumes', user_email))){
			fs.mkdirSync(path.join(__dirname, 'resumes', user_email));
		}

		file.mv(path.join(__dirname, 'resumes', user_email, filename), function(err) {
				if(err){
					console.log("error: ", err);
					response.send("error occurred!");
				}
		});

		//save data to the database
		const user = new User({
			_id: new mongoose.Types.ObjectId(),
			name: request.body.name,
			email: request.body.email,
			phone:  request.body.phone,
			job: request.body.job
		});

		user.save(function(err){
			if(err){
				console.log("Error: ", err);
				return;
			}
		});
		response.send({'message': 'successfully stored the data'});
		
	}
});

app.listen(PORT, function(){
	console.log("server listening on port " + PORT);
});



