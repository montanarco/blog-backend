import { MongoClient } from 'mongodb';

let db;

async function connectMongo(callback) {
    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect();
    db = client.db('react-blog-db'); // use react-blog-db
    callback();
}

export { db, connectMongo };