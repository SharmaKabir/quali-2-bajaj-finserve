import React, { useState } from "react";
import { UserData } from "../types";

interface LoginProps {
  onLoginSuccess: (userData: UserData) => void;
}
const Login:React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!rollNumber || !name) {
      setError('put both');
      return;
    }
    setIsLoading(true);
    const userData = { rollNumber, name };
    onLoginSuccess(userData);
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <h1>Roll Number</h1>
          <input
            id="rollNumber"
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="roll no"
          />
        </div>
        <div className="form-group">
          <h1>Name</h1>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <button type="submit">
        {isLoading ? 'wait' : 'login'}
        </button>
      </form>
    </div>
  );
};
export default Login;
