import { useDispatch } from 'react-redux';
import { createUser } from '../../features/users/usersThunks';
import UserForm from '../../components/users/UserForm';
import { reset } from '../../features/users/usersSlice';

const CreateUserPage = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    role: 'user'
  };

  const onSubmit = (values) => {
    dispatch(createUser(values));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create User</h1>
      <UserForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        resetAction={reset}
      />
    </div>
  );
};

export default CreateUserPage;