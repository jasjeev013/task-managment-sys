// src/components/common/Alert.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Alert = ({ type, message, resetAction }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resetAction) {
        dispatch(resetAction());
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, resetAction]);

  return (
    <div
      className={`p-4 mb-4 rounded-lg ${
        type === 'error'
          ? 'bg-red-100 text-red-700'
          : 'bg-green-100 text-green-700'
      }`}
      role="alert"
    >
      <span className="font-medium">
        {type === 'error' ? 'Error!' : 'Success!'}
      </span>{' '}
      {message}
    </div>
  );
};

export default Alert;