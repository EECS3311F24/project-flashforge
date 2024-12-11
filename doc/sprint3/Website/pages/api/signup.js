import getDatabase from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const db = await getDatabase();
        const usersCollection = db.collection('users');

        // Check if the username already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in the database
        await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
