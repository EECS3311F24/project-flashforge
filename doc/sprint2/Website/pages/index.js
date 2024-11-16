import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [decks, setDecks] = useState([
    { name: 'Software Design', href: '/decks/software-design' },
    { name: 'Java Basics', href: '/decks/java-basics' },
    { name: 'Algorithms', href: '/decks/algorithms' },
    { name: 'Data Structures', href: '/decks/data-structures' },
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const savedPreferences = JSON.parse(localStorage.getItem('preferences')) || [];
    setPreferences(savedPreferences);
  }, []);

  // Filter decks by preferences (if selected) and search query
  const filteredDecks = decks.filter(
    (deck) =>
      (preferences.length === 0 || preferences.includes(deck.name)) &&
      deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignOut = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    setUsername(''); // Clear the username from state
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

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a deck..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Flashcard Categories */}
        <div className="deck-categories">
          {filteredDecks.length > 0 ? (
            filteredDecks.map((deck) => (
              <Link href={deck.href} key={deck.name}>
                <div className="category-box flash">{deck.name}</div>
              </Link>
            ))
          ) : (
            <p>No decks match your search or preferences.</p>
          )}
        </div>
      </div>
    </div>
  );
}
