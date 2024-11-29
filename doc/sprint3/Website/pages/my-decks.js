import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function MyDecks() {
    const [decks, setDecks] = useState([]);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            setMessage('You need to log in to view your decks.');
            router.push('/login'); // Redirect to login if not logged in
            return;
        }

        const fetchDecks = async () => {
            try {
                const response = await fetch(`/api/get-decks?username=${username}`);
                const data = await response.json();
                
                if (response.ok) {
                    setDecks(data.decks); // Set the fetched decks data
                } else {
                    setMessage(data.message || 'Error fetching decks.');
                }
            } catch (error) {
                setMessage('An error occurred while fetching decks.');
                console.error('Error fetching decks:', error);
            }
        };

        fetchDecks();
    }, [router]);

    return (
        <div className="page-container">
        <div className="sidebar">
            <Navbar />
        </div>
        <div className="content-container">
            <h2>My Decks</h2>
            {message && <p>{message}</p>}

            {/* Display decks in a grid like the home page */}
            <div className="deck-categories">
                {decks.length > 0 ? (
                    decks.map((deck) => (
                        <Link href={`/decks/${deck._id}`} key={deck._id}>
                            <div className="category-box flash">
                                <h3>{deck.deckName}</h3>
                                {/* Assuming deck has a description or other metadata */}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>You have no decks yet. Create a deck to get started.</p>
                )}
            </div>
        </div>
    </div>
);
}
        
