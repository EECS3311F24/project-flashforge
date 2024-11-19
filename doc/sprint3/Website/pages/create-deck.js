import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateDeck() {
    const [deckName, setDeckName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleCreateDeck = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId'); // Get user ID from local storage or auth context
        if (!userId) {
            setMessage('You need to log in to create a deck.');
            return;
        }

        try {
            const response = await fetch('/api/create-deck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, deckName, description }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Deck created successfully!');
                setDeckName('');
                setDescription('');
                router.push('/my-decks'); // Redirect to "My Decks" page
            } else {
                setMessage(data.message || 'Error creating deck.');
            }
        } catch (error) {
            setMessage('An error occurred during deck creation.');
        }
    };

    return (
        <div className="create-deck-container">
            <h2>Create a New Deck</h2>
            <form onSubmit={handleCreateDeck}>
                <input
                    type="text"
                    placeholder="Deck Name"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Deck</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
