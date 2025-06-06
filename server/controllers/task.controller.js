const Task = require('../models/Task');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const upload = require('../utils/fileUpload');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @route   GET /api/v1/users/:userId/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    let query;

    if (req.params.userId) {
      query = Task.find({ assignedTo: req.params.userId });
    } else {
      // Regular user can only see their assigned tasks
      if (req.user.role !== 'admin') {
        query = Task.find({ assignedTo: req.user.id });
      } else {
        // Admin can see all tasks
        query = Task.find();
      }
    }

    // Filtering
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    if (req.query.priority) {
      query = query.where('priority').equals(req.query.priority);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Task.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const tasks = await query.populate('assignedTo', 'email role');

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'assignedTo',
      'email role'
    );

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (
      task.assignedTo._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to access this task`,
          401
        )
      );
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Check if assignedTo user exists
    const assignedUser = await User.findById(req.body.assignedTo);
    if (!assignedUser) {
      return next(
        new ErrorResponse(`User not found with id of ${req.body.assignedTo}`, 404)
      );
    }

    // Handle file upload
    upload(req, res, async function(err) {
      if (err) {
        return next(err);
      }

      // Check if files were uploaded
      let documents = [];
      if (req.files && req.files.length > 0) {
        documents = req.files.map(file => ({
          fileName: file.filename,
          filePath: file.path,
          fileType: file.mimetype,
          fileSize: file.size
        }));
      }

      const task = await Task.create({
        ...req.body,
        documents
      });

      res.status(201).json({
        success: true,
        data: task
      });
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (
      task.assignedTo.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this task`,
          401
        )
      );
    }

    // Handle file upload
    upload(req, res, async function(err) {
      if (err) {
        return next(err);
      }

      // Check if files were uploaded
      let documents = task.documents;
      if (req.files && req.files.length > 0) {
        // Check if adding new files would exceed the limit
        if (documents.length + req.files.length > 3) {
          return next(
            new ErrorResponse('Cannot upload more than 3 documents per task', 400)
          );
        }

        const newDocuments = req.files.map(file => ({
          fileName: file.filename,
          filePath: file.path,
          fileType: file.mimetype,
          fileSize: file.size
        }));

        documents = [...documents, ...newDocuments];
      }

      task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          documents
        },
        {
          new: true,
          runValidators: true
        }
      );

      res.status(200).json({
        success: true,
        data: task
      });
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (
      task.assignedTo.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this task`,
          401
        )
      );
    }

    await task.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Download task document
// @route   GET /api/v1/tasks/:id/documents/:docId
// @access  Private
exports.downloadDocument = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (
      task.assignedTo.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to access this document`,
          401
        )
      );
    }

    const document = task.documents.id(req.params.docId);

    if (!document) {
      return next(
        new ErrorResponse(`Document not found with id of ${req.params.docId}`, 404)
      );
    }

    res.download(document.filePath);
  } catch (err) {
    next(err);
  }
};