const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  illness: String,
}, {timestamps: true})

UserSchema.methods.toJSON  = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    password: this.password,
    illness: this.illness,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

mongoose.model('Users', UserSchema)