// pages/api/create-deck.js
import getDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, deckName, description, cards } = req.body;

  if (!username || !deckName || !cards || cards.length === 0) {
    return res.status(400).json({ message: 'Username, deck name, and cards are required.' });
  }

  try {
    const db = await getDatabase();
    const decksCollection = db.collection('decks');

    const newDeck = {
      username,  // Use 'username' for user identification
      deckName,
      description,
      cards,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await decksCollection.insertOne(newDeck);
    res.status(201).json({ message: 'Deck created successfully!' });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
