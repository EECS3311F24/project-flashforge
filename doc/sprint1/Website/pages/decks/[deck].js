import { useState } from 'react';
import Navbar from '../../components/Navbar'; 

const DeckPage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const deckData = [
    { question: "What is Software Design?", answer: "The process of defining the architecture, components, and interfaces of a system." },
    { question: "What is a protected variable?", answer: "A variable that can only be accessed within its class and its subclasses." },
    { question: "What does # represent in a UML diagram?", answer: "A protected variable." },
  ];

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className="front">
          {deckData[currentCard].question}
        </div>
        <div className="back">
          {deckData[currentCard].answer}
        </div>
      </div>
      <div className="controls">
        <button onClick={() => setCurrentCard((currentCard - 1 + deckData.length) % deckData.length)}>←</button>
        <button onClick={() => setCurrentCard((currentCard + 1) % deckData.length)}>→</button>
      </div>
      <div className="sidebar"><Navbar></Navbar></div>
    </div>   
  );
  
};

export default DeckPage;
