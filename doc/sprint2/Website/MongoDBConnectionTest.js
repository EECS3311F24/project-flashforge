require("dotenv").config();
const { MongoClient } = require("mongodb");

// Replace this URI with your MongoDB connection string
const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);
async function testConnection() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Ping the database to check if the connection is successful
        await client.db("admin").command({ ping: 1 });
        
        console.log("Connection to MongoDB is successful!");

        // Optionally, you can retrieve server information
        const serverInfo = await client.db("admin").admin().serverStatus();
        console.log("Server info:", serverInfo);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the test connection function
testConnection();
