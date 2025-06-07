import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Task Manager
        </h1>
      </div>
      <LoginForm />
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md text-sm text-gray-600 bg-white p-4 rounded shadow">
        <p className="mb-2 font-medium">For testing purposes, you can use the following logins:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Admin:</strong> <br />
            Email: <code>admin@example.com</code><br />
            Password: <code>AdminPass123!</code>
          </li>
          <li>
            <strong>User:</strong> <br />
            Email: <code>user@example.com</code><br />
            Password: <code>UserPass456!</code>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
