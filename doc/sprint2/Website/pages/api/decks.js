import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db('flashforge');  // Replace with your actual database name

        // Fetch data from the "decks" collection
        const decks = await db.collection('decks').find({}).toArray();

        res.status(200).json(decks);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
