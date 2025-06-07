import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Alert from '../common/Alert';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
  resetAction
}) => {
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.users);

  useEffect(() => {
    // if (isSuccess) {
    //   navigate('/users');
    // }
  }, [isSuccess]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    role: Yup.string()
      .oneOf(['user', 'admin'], 'Invalid role')
      .required('Required'),
    password: isEdit
      ? Yup.string() // When editing, password can be optional or not changed
      : Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Required'),
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit User' : 'Create User'}
      </h2>
      {isError && <Alert type="error" message={message} resetAction={resetAction} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isEdit}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={isEdit ? "Leave blank to keep current password" : ""}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/users')}
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
                  ? 'Update User'
                  : 'Create User'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
