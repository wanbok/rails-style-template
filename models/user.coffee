mongoose = require 'mongoose'

User = new mongoose.Schema {
  email: { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
  name: { type: String, required: true },
  birth: Date,
  age: Number,
  followings: Array,
  followers: Array
}

module.exports = mongoose.model 'User', User