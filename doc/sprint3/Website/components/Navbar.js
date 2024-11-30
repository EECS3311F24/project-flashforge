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
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        {!username && <li><Link href="/login">Login</Link></li>}
        
        {username && <li><Link href="/my-decks">My Decks</Link></li>}
        <li><Link href="/create">Create Deck</Link></li>
        {username ? (
          <div>
            <li><Link href="/settings">Profile</Link></li>
          </div>
        ) : <li><Link href="/settings">Settings</Link></li>} 
        
        <li><Link href="/tipforum">Study Forge</Link></li>

        {username && (
          <div>
            <p className="username-display">Logged in as: {username}</p>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
