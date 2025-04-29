import React, { useState } from 'react';
import { UserData } from '../types';

interface LoginProps {
    onLoginSuccess : (userData: UserData) => void;
}
const Login = ({ onLoginSuccess })=>{
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading]=useState(false);
    



    return(
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                { if(error) && <div className='error-message'>{error}</div>}
            </form>

        </div>
    )
}