// src/components/tasks/TaskView.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, downloadDocument } from '../../features/tasks/tasksThunks';
import { useParams } from 'react-router-dom';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import { reset } from '../../features/tasks/tasksSlice';
import { format } from 'date-fns';
import { FiDownload } from 'react-icons/fi';

const TaskView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { task, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  const handleDownload = (docId) => {
    dispatch(downloadDocument({ taskId: id, docId }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert type="error" message={message} resetAction={reset} />;
  }

  if (!task) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status}`}>
            {task.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-sm text-gray-900">{task.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
          <p className="mt-1 text-sm text-gray-900">
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Created By</h3>
          <p className="mt-1 text-sm text-gray-900">{task.createdBy?.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
          <p className="mt-1 text-sm text-gray-900">{task.assignedTo?.email}</p>
        </div>
      </div>
      {task.documents && task.documents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500">Documents</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            {task.documents.map((doc, index) => (
              <li key={index} className="py-3 flex justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {doc.fileName}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(doc._id)}
                  className="ml-2 text-primary hover:text-primary-dark flex items-center"
                >
                  <FiDownload className="mr-1" /> Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskView;