import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // For simplicity, we’re just setting the username to localStorage.
    // In a real app, this should go through authentication and then save the user info.
    localStorage.setItem('username', username);

    // Redirect to the home page
    router.push('/');
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <h2>New User</h2>
      <form>
        <input type="text" placeholder="New Username" />
        <input type="password" placeholder="New Password" />
        <button type="submit">Sign Up</button>
      </form>
      <div className="sidebar"><Navbar></Navbar></div>
    </div>
  );
}
