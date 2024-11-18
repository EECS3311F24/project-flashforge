import { useEffect, useState } from 'react';

export default function MyDecks() {
    const [decks, setDecks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get user ID from local storage
        if (!userId) {
            setMessage('You need to log in to view your decks.');
            return;
        }

        const fetchDecks = async () => {
            try {
                const response = await fetch(`/api/get-decks?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setDecks(data.decks);
                } else {
                    setMessage(data.message || 'Error fetching decks.');
                }
            } catch (error) {
                setMessage('An error occurred while fetching decks.');
            }
        };

        fetchDecks();
    }, []);

    return (
        <div className="my-decks-container">
            <h2>My Decks</h2>
            {message && <p>{message}</p>}
            <ul>
                {decks.map((deck) => (
                    <li key={deck._id}>
                        <h3>{deck.deckName}</h3>
                        <p>{deck.description}</p>
                        <small>Created on: {new Date(deck.createdAt).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
