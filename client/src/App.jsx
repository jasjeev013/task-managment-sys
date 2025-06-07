import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import HomePage from './pages/dashboard/HomePage';
import TasksPage from './pages/tasks/TasksPage';
import CreateTaskPage from './pages/tasks/CreateTaskPage';
import EditTaskPage from './pages/tasks/EditTaskPage';
import TaskDetailsPage from './pages/tasks/TaskDetailsPage';
import UsersPage from './pages/users/UsersPage';
import CreateUserPage from './pages/users/CreateUserPage';
import EditUserPage from './pages/users/EditUserPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />

        {/* Protected routes under /dashboard */}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact element={<DashboardPage />}>
            {/* Dashboard home */}
            <Route exact index element={<HomePage />} />
            
            {/* Task routes */}
            <Route exact path="tasks">
              <Route exact index element={<TasksPage />} />
              <Route exact path="create" element={<CreateTaskPage />} />
              <Route exact path=":id" element={<TaskDetailsPage />} />
              <Route exact path=":id/edit" element={<EditTaskPage />} />
            </Route>

            {/* Admin-only routes */}
            <Route exact path="users" element={<AdminRoute />}>
              <Route exact index element={<UsersPage />} />
              <Route exact path="create" element={<CreateUserPage />} />
              <Route exact path=":id/edit" element={<EditUserPage />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;