// src/components/tasks/TaskForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsers } from '../../features/users/usersThunks';
import Alert from '../common/Alert';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
  resetAction
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const { isError, isSuccess, message } = useSelector((state) => state.tasks);
  const [files, setFiles] = useState([]);

 


  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    description: Yup.string()
      .max(500, 'Must be 500 characters or less')
      .required('Required'),
    status: Yup.string()
      .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status')
      .required('Required'),
    priority: Yup.string()
      .oneOf(['low', 'medium', 'high'], 'Invalid priority')
      .required('Required'),
    dueDate: Yup.date().required('Required'),
    assignedTo: Yup.string().required('Required')
  });

  const handleFileChange = (event, setFieldValue) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length + files.length > 3) {
      alert('You can only upload up to 3 documents');
      return;
    }
    setFiles([...files, ...newFiles]);
    setFieldValue('documents', [...files, ...newFiles]);
  };

  const removeFile = (index, setFieldValue) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setFieldValue('documents', newFiles);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Task' : 'Create Task'}
      </h2>
      {isError && <Alert type="error" message={message} resetAction={resetAction} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Assign To
                </label>
                <Field
                  as="select"
                  name="assignedTo"
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select User</option>
                  {users!=null && users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.email} ({user.role})
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="assignedTo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Priority
                </label>
                <Field
                  as="select"
                  name="priority"
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
                <ErrorMessage
                  name="priority"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <Field
                  type="date"
                  name="dueDate"
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents (PDF only, max 3)
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                accept=".pdf"
                multiple
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {files.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Selected Files:
                  </h4>
                  <ul className="mt-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm text-gray-600 py-1"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index, setFieldValue)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {isEdit && initialValues.documents && initialValues.documents.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Existing Documents:
                  </h4>
                  <ul className="mt-1">
                    {initialValues.documents.map((doc, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm text-gray-600 py-1"
                      >
                        <span>{doc.fileName}</span>
                        <a
                          href={`/api/v1/tasks/${initialValues._id}/documents/${doc._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isSubmitting
                  ? isEdit
                    ? 'Updating...'
                    : 'Creating...'
                  : isEdit
                  ? 'Update Task'
                  : 'Create Task'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;