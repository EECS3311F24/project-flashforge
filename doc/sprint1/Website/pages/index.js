import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  // State for handling the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  // Handle form submission to add new users
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('User added successfully');
      setName('');  // Clear the form
      setEmail(''); // Clear the form
      setPassword(''); // Clear the password field
    } else {
      alert('Error adding user');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Link href="/" className="active">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/create">Create Deck</Link>
        <Link href="/settings">Settings</Link>
        {username && (
          <div>
            <p className="username-display">Logged in as: {username}</p>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to FlashForge!</h1>
        <p>Your flashcard tool for Software Engineering and CS students.</p>

        {/* Flashcard Categories */}
        <div className="deck-categories">
          <Link href="/decks/software-design">
            <div className="category-box flash">Software Design</div>
          </Link>
          <Link href="/decks/java-basics">
            <div className="category-box flash">Java Basics</div>
          </Link>
          <Link href="/decks/algorithms">
            <div className="category-box flash">Algorithms</div>
          </Link>
          <Link href="/decks/data-structures">
            <div className="category-box flash">Data Structures</div>
          </Link>
        </div>

        {/* Form to Add a New User */}
        <div className="add-user-section">
          <h2>Add a New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
