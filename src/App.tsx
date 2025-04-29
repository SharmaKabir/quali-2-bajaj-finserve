import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import DynamicForm from './components/DynamicForm';
import { createUser, getFormStructure } from './services/api';
import { FormResponse, UserData } from './types';



const App = () => {
  const [formData, setFormData]=useState(null);
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState(null);
  const [userData, setUserData]=useState(null);
  
  return (
   <>
<div className="app-container">
{isLoading && <div className="loading">Loading...</div>}
      
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}
      
      {!isLoading && !error && !formData && (
        <Login onLoginSuccess={handleLogin} />
      )}
      
      {!isLoading && !error && formData && (
        <DynamicForm formData={formData} />
      )}
   </div>

   </>
  )
}

export default App