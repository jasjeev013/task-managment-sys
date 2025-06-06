
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../features/tasks/tasksThunks';
import TaskForm from '../../components/tasks/TaskForm';
import { reset } from '../../features/tasks/tasksSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTask } from '../../features/tasks/tasksThunks';
import { format } from 'date-fns';

const EditTaskPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { task } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  if (!task) {
    return null;
  }

  const initialValues = {
    _id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd'),
    assignedTo: task.assignedTo._id,
    documents: task.documents || []
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('status', values.status);
    formData.append('priority', values.priority);
    formData.append('dueDate', values.dueDate);
    formData.append('assignedTo', values.assignedTo);
    if (values.documents) {
      values.documents.forEach((file) => {
        if (file instanceof File) {
          formData.append('documents', file);
        }
      });
    }
    dispatch(updateTask({ taskId: id, taskData: formData }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
      <TaskForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        isEdit={true}
        resetAction={reset}
      />
    </div>
  );
};

export default EditTaskPage;