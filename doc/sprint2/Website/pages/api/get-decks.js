import getDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const db = await getDatabase();
        const decksCollection = db.collection('decks');
        const userDecks = await decksCollection.find({ userId }).toArray();

        res.status(200).json({ decks: userDecks });
    } catch (error) {
        console.error('Error fetching decks:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
