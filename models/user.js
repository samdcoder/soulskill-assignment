const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: {type: mongoose.Schema.Types.ObjectId,  ref: 'Id'},
	name: String,
	email: String, 
	phone: Number, 
	job: String
});

module.exports = mongoose.model('User', userSchema);

