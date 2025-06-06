import { useDispatch } from 'react-redux';
import { createTask } from '../../features/tasks/tasksThunks';
import TaskForm from '../../components/tasks/TaskForm';
import { reset } from '../../features/tasks/tasksSlice';

const CreateTaskPage = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
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
        formData.append('documents', file);
      });
    }
    dispatch(createTask(formData));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Task</h1>
      <TaskForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        resetAction={reset}
      />
    </div>
  );
};

export default CreateTaskPage;