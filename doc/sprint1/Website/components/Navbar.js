import Link from 'next/link';
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    setUsername(''); // Clear the username from state
  };
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/create">Create Deck</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        </ul>
        {username && (
        <div>
          <p className="username-display">Logged in as: {username}</p>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
