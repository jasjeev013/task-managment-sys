// src/components/tasks/TaskCard.jsx
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/tasks/tasksThunks';

const TaskCard = ({ task, isAdmin }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="task-card bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/tasks/${task._id}`}
            className="text-gray-500 hover:text-primary"
          >
            <FiEye size={18} />
          </Link>
          <Link
            to={`/tasks/${task._id}/edit`}
            className="text-gray-500 hover:text-primary"
          >
            <FiEdit2 size={18} />
          </Link>
          {(isAdmin || task.createdBy === task.assignedTo) && (
            <button
              onClick={() => handleDelete(task._id)}
              className="text-gray-500 hover:text-red-500"
            >
              <FiTrash2 size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status}`}>
          {task.status}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </span>
        {task.documents && task.documents.length > 0 && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {task.documents.length} document(s)
          </span>
        )}
      </div>
      <div className="mt-3 text-sm text-gray-500">
        Assigned to: {task.assignedTo?.email}
      </div>
    </div>
  );
};

export default TaskCard;