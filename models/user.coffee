mongoose = require 'mongoose'

User = new mongoose.Schema {
	userId: { type: String, index: { unique: true }, required: true },
	name: { type: String, required: true },
	birth: Date,
	school: String,
	grade: Number,
	class: String,
	address: String,
	addressForSchool: String,
	followings: Array,
	gcmRegId: String
}

module.exports = mongoose.model 'User', User