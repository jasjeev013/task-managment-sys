import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../features/users/usersThunks';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.email}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Role: <span className="capitalize">{user.role}</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/users/${user._id}/edit`}
            className="text-gray-500 hover:text-primary"
          >
            <FiEdit2 size={18} />
          </Link>
          <button
            onClick={() => handleDelete(user._id)}
            className="text-gray-500 hover:text-red-500"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;