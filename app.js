const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser());

app.get('/', function(request, response){
	response.sendFile('index.html');
});

app.listen(3000, function(){
	console.log("server listening on port "+3000);
});



