import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Create() {
  const [cards, setCards] = useState([{ question: '', answer: '' }]);

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

  return (
    <div className="create-container">
      <h2>Create a New Deck</h2>
      <form className="deck-form">
        {cards.map((card, index) => (
          <div key={index} className="card-input">
            <input
              type="text"
              placeholder="Question"
              value={card.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Answer"
              value={card.answer}
              onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
              className="input-field"
            />
            <div className="sidebar"><Navbar></Navbar></div>
          </div>
        ))}
        <button type="button" onClick={addCard} className="add-card-btn">
          Add Another Card
        </button>
      </form>
    </div>
  );
}
