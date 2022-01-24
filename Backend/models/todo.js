const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: true,
  },
  Today: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;
