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
            router.push('/login');
            return;
        }

        const fetchDecks = async () => {
            try {
                const response = await fetch(`/api/get-decks?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    console.log('Fetched decks:', data.decks); // Debugging
                    setDecks(data.decks);
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
            <div className="content-container">
            <div className="sidebar"><Navbar /></div>
                <h2>My Decks</h2>
                {message && <p>{message}</p>}

                <div className="deck-categories">
                    {decks.length > 0 ? (
                        decks.map((deck) => (
                            <div key={deck._id} className="deck-item">
                                <Link href={`/decks/${deck._id}`}>
                                    <div className="category-box flash">
                                        <h3>{deck.deckName}</h3>
                                    </div>
                                </Link>
 
                            </div>
                        ))
                    ) : (
                        <p>You have no decks yet. Create a deck to get started.</p>
                        
                    )}
                </div>
            </div>
        </div>
    );
}
