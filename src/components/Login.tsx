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

}