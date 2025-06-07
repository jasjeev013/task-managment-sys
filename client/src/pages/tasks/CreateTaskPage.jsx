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
  // Create a plain JavaScript object
  const taskData = {
    title: values.title,
    description: values.description,
    status: values.status,
    priority: values.priority,
    dueDate: values.dueDate,
    assignedTo: values.assignedTo,
    // If you're handling files separately (recommended)
    documents: values.documents ? values.documents.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      // If you need to send Base64 encoded content:
      // content: await convertToBase64(file) 
    })) : []
  };

  dispatch(createTask(taskData));
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