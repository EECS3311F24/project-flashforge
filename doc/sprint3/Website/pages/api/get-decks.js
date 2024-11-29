import getDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
    const { username } = req.query; // Get username from query params

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const db = await getDatabase();
        const decksCollection = db.collection('decks');

        // Fetch decks from the database based on username, only select necessary fields (_id, deckName)
        const decks = await decksCollection.find({ username }).project({ _id: 1, deckName: 1 }).toArray(); 

        if (decks.length === 0) {
            return res.status(404).json({ message: 'No decks found for this user.' });
        }

        res.status(200).json({ decks }); // Send decks back as response
    } catch (error) {
        console.error('Error fetching decks:', error);
        res.status(500).json({ message: 'Error fetching decks from the database.' });
    }
}
