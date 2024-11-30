import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function Create() {
  const [deckName, setDeckName] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([{ question: '', answer: '' }]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Function to add a new card
  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]);
  };

  // Function to handle input change for each card
  const handleInputChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem('username'); // Use 'username' stored in localStorage
    if (!username) {
      setMessage('You need to log in to create a deck.');
      return;
    }

    // Create deck object
    const newDeck = {
      username, // Use 'username' here
      deckName,
      description,
      cards,
    };

    try {
      // Send the deck data to the backend API
      const response = await fetch('/api/create-deck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDeck),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Deck created successfully!');
        setDeckName('');
        setDescription('');
        setCards([{ question: '', answer: '' }]);
        router.push('/my-decks'); // Redirect to "My Decks" page
      } else {
        setMessage(data.message || 'Error creating deck.');
      }
    } catch (error) {
      setMessage('An error occurred while creating the deck.');
    }
  };

  return (
    
    <div className="create-container">
      <div className="sidebar"><Navbar /></div>
      <h2>Create a New Deck</h2>
      <form className="deck-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        {cards.map((card, index) => (
          <div key={index} className="card-input">
            <input
              type="text"
              placeholder="Question"
              value={card.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Answer"
              value={card.answer}
              onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
              className="input-field"
              required
            />
          </div>
        ))}
        
        <button type="button" onClick={addCard} className="add-card-btn">
          Add Another Card
        </button>

        {/* Submit / Finish button */}
        <div className="submit-container">
          
          <button type="submit" className="submit-btn">
            Finish
          </button>
        </div>
      </form>

      {/* Display messages to the user */}
      <p>{message}</p>
      
      
    </div>
  );
}
