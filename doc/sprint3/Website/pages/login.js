import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AuthPage() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('username', data.username); // Store username on successful login
        router.push('/'); // Redirect to homepage
      } else {
        setMessage(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signupUsername, password: signupPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful! You can now log in.');
        setSignupUsername(''); // Clear signup fields
        setSignupPassword('');
      } else {
        setMessage(data.message || 'Error signing up.');
      }
    } catch (error) {
      setMessage('An error occurred during signup.');
    }
  };

  return (
    <div className="auth-container">
      
      <div className="form-section">
        
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            value={loginUsername} 
            onChange={(e) => setLoginUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginPassword} 
            onChange={(e) => setLoginPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="form-section">
        <h2>New User</h2>
        <form onSubmit={handleSignup}>
          <input 
            type="text" 
            placeholder="New Username" 
            value={signupUsername} 
            onChange={(e) => setSignupUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="New Password" 
            value={signupPassword} 
            onChange={(e) => setSignupPassword(e.target.value)} 
            required 
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <p className="message">{message}</p>
      <div className="sidebar"><Navbar /></div>
    </div>
  );
}
