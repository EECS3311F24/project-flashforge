// pages/api/deck.js
import getDatabase from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { deckName, id } = req.query;

  if (!deckName && !id) {
    return res.status(400).json({ message: 'deckName or id is required.' });
  }

  try {
    const db = await getDatabase();
    const decksCollection = db.collection('decks');

    let deck;

    if (deckName) {
      deck = await decksCollection.findOne({ deckName });
    } else if (id) {
      if (ObjectId.isValid(id)) {
        deck = await decksCollection.findOne({ _id: new ObjectId(id) });
      } else {
        return res.status(400).json({ message: 'Invalid id format' });
      }
    }

    if (!deck) {
      return res.status(404).json({ message: 'Deck not found.' });
    }

    res.status(200).json(deck);
  } catch (error) {
    console.error('Error fetching deck:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
