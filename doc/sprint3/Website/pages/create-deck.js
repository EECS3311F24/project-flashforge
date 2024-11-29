import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateDeck() {
    const [deckName, setDeckName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleCreateDeck = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId'); // Ensure the user ID is stored in localStorage
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
                setDeckName(''); // Reset form fields
                setDescription('');
                router.push('/my-decks'); // Redirect to the "My Decks" page
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
                <div className="button-container">
                    <button type="submit">Create Deck</button>
                    {/* This "Finish" button could also be used to finalize the creation */}
                    <button
                        type="button"
                        onClick={() => router.push('/my-decks')} // Navigate back to "My Decks" page directly
                        className="finish-button"
                    >
                        Finish
                    </button>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
}
