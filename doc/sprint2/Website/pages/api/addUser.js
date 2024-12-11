import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const client = await clientPromise;
            const db = client.db('FlashForge');

            // Insert a new user with name, email, and password
            const { name, email, password } = req.body;
            const result = await db.collection('users').insertOne({ name, email, password });

            res.status(201).json({ message: 'User added', result });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
