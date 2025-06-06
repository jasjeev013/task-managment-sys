import UserList from '../../components/users/UserList';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Link
          to="/users/create"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Create User
        </Link>
      </div>
      <UserList />
    </div>
  );
};

export default UsersPage;