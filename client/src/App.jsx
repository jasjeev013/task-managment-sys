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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardPage />}>
            <Route index element={<HomePage />} />
            
            {/* Regular user routes */}
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/create" element={<CreateTaskPage />} />
            <Route path="tasks/:id" element={<TaskDetailsPage />} />
            <Route path="tasks/:id/edit" element={<EditTaskPage />} />

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="users/create" element={<CreateUserPage />} />
              <Route path="users/:id/edit" element={<EditUserPage />} />
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