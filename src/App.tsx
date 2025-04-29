import  { useState } from 'react';
import './App.css';
import Login from './components/Login';
import DynamicForm from './components/DynamicForm';
import { createUser, getFormStructure } from './services/api';
import { FormResponse, UserData } from './types';



const App = () => {
  const [formData, setFormData]=useState<FormResponse | null>(null);
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState<string | null>(null);
  const [_userData, setUserData]=useState<UserData | null>(null);
  const handleLogin= async(userData:UserData)=>{
    setIsLoading(false);
    setError(null);
    try {
      
      try {
        await createUser(userData);
      } catch (err: any) {
        
        if (err.response?.status !== 409) {
          throw err;
        }
        
        console.log('fetch directly');
      }
      
    
      const formResponse = await getFormStructure(userData.rollNumber);
      
      setUserData(userData);
      setFormData(formResponse);
    } catch (err: any) {
      setError(err.response?.data?.message || 'err');
      console.error('err in login:', err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
   <>
<div className="app-container">
{isLoading && <div className="loading">loading wait</div>}
      
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => setError(null)}>try-again</button>
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