const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  downloadDocument
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/documents/:docId')
  .get(downloadDocument);

// Get tasks assigned to specific user
router.route('/user/:userId').get(getTasks);

module.exports = router;