const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  documents: [
    {
      fileName: {
        type: String,
        required: true
      },
      filePath: {
        type: String,
        required: true
      },
      fileType: {
        type: String,
        required: true
      },
      fileSize: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from assigning task to themselves
TaskSchema.pre('save', async function(next) {
  if (this.createdBy.toString() === this.assignedTo.toString()) {
    throw new Error('You cannot assign a task to yourself');
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);