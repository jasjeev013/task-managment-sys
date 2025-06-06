const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add dashboard widgets here */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Welcome</h3>
          <p className="mt-2 text-gray-600">
            Welcome to the Task Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;