// src/components/tasks/TaskList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../features/tasks/tasksThunks';
import TaskCard from './TaskCard';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import { reset } from '../../features/tasks/tasksSlice';
import { useSearchParams } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const { isAdmin } = useSelector((state) => state.auth);

  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const sort = searchParams.get('sort');

  useEffect(() => {
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (sort) filters.sort = sort;

    dispatch(getTasks(filters));
  }, [dispatch, status, priority, sort]);

  const handleFilterChange = (filter, value) => {
    if (value) {
      searchParams.set(filter, value);
    } else {
      searchParams.delete(filter);
    }
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {isError && <Alert type="error" message={message} resetAction={reset} />}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select
            id="status"
            value={status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="sr-only">
            Priority
          </label>
          <select
            id="priority"
            value={priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="sr-only">
            Sort By
          </label>
          <select
            id="sort"
            value={sort || ''}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="">Default</option>
            <option value="dueDate">Due Date (Asc)</option>
            <option value="-dueDate">Due Date (Desc)</option>
            <option value="priority">Priority (Asc)</option>
            <option value="-priority">Priority (Desc)</option>
          </select>
        </div>
      </div>
      <div>
        {tasks && tasks.length > 0 ? (
          tasks.map((task,index) => (
            <TaskCard key={index} task={task} isAdmin={isAdmin} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;