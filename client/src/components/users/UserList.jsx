import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/users/usersThunks';
import UserCard from './UserCard';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import { reset } from '../../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {isError && <Alert type="error" message={message} resetAction={reset} />}
      <div>
        {users && users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;