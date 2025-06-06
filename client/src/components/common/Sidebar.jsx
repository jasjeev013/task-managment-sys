// src/components/common/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiPlusCircle
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: FiHome,
      allowed: true
    },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: FiClipboard,
      allowed: true
    },
    {
      name: 'Create Task',
      path: '/tasks/create',
      icon: FiPlusCircle,
      allowed: true
    },
    {
      name: 'Users',
      path: '/users',
      icon: FiUsers,
      allowed: isAdmin
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: FiSettings,
      allowed: true
    }
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-full fixed">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map(
            (item) =>
              item.allowed && (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;