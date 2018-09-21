const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const env = require('./env');
const PORT = process.env.port || 3000; 

mongoose.connect('mongodb+srv://samdcoder:'+env.mongopw+'@cluster0-bcmtk.mongodb.net/test?retryWrites=true');

app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(cookieParser());

app.get('/', function(request, response){
	response.sendFile('index.html');
});

app.post('/', function(request, response){
	//Creating/updating a user's visit count in cookies. user's email is key and value is count
	if(request.cookies[request.body.email+'Count'] != null){
		var visitCount = parseInt(request.cookies[request.body.email+'Count']);
		visitCount += 1;
		response.cookie(request.body.email+'Count', visitCount);
	}
	else{
		response.cookie(request.body.email+'Count', 1);
	}

	if(request.files){
		var file = request.files.filename;
		var filename = file.name;
		var user_email = request.body.email;
		if(file.mimetype != 'application/pdf'){
			response.send({'message': 'Please upload your resume in .pdf format.', 'code':400});
			return;

		}

		if(!fs.existsSync(path.join(__dirname, 'resumes', user_email))){
			fs.mkdirSync(path.join(__dirname, 'resumes', user_email));
		}

		file.mv(path.join(__dirname, 'resumes', user_email, filename), function(err) {
				if(err){
					console.log("error: ", err);
					response.send({'message': 'error occurred while saving resume!', 'code':400});
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
				response.send({'message': err, 'code':400});
				console.log("Error: ", err);
				return;
			}
		});
		response.send({'message': 'Successfully stored the data!', 'code':200});
		
	}
});

app.use(function(request, response, next){
  response.sendFile('404.html', {root: path.join(__dirname, 'public')});
  });

app.listen(PORT, function(){
	console.log("server listening on port " + PORT);
});



