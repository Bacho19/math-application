const { Schema, model } = require('mongoose')

const tasksListSchema = new Schema({
  name: { type: String, required: true },
  task: { type: String, required: true },
  hint: { type: String },
})

const tasksSchema = new Schema({
  title: { type: String, required: true, unique: true },
  titleNum: { type: String, required: true, unique: true },
  tasks: [tasksListSchema],
  url: { type: String, required: true },
})

module.exports = model('Tasks', tasksSchema)
