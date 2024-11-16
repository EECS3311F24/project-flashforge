import getDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, deckName, description } = req.body;

    if (!userId || !deckName) {
        return res.status(400).json({ message: 'User ID and deck name are required.' });
    }

    try {
        const db = await getDatabase();
        const decksCollection = db.collection('decks');

        const newDeck = {
            userId,           // Stores the ID of the logged-in user
            deckName,
            description,
            createdAt: new Date()
        };

        await decksCollection.insertOne(newDeck);
        res.status(201).json({ message: 'Deck created successfully!' });
    } catch (error) {
        console.error('Error creating deck:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
