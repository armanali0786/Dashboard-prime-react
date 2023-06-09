import React from 'react';
import UsersTable from './UserTable/UserTable';
import Dashboard from './ChartData/Dashboard';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Dashboard/>
      <br></br>
      <UsersTable/>
    </div>
  );
};

export default App;
