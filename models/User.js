const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  emailToken: { type: String },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  tasks: [{ type: Types.ObjectId, ref: 'Tasks' }],
  isAdmin: { type: Boolean, default: false },
})

module.exports = model('User', schema)
