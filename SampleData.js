const { MongoClient } = require('mongodb');
require('dotenv').config();
const dbName = 'FameWall';

async function main() {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');

    const db = client.db(dbName);
    const collection = db.collection('fameEntries');  
    const dummyData = [
      {
        name: "A",
        achievement: "Won first place in a coding competition",
        date: new Date("2023-01-15")
      },
      {
        name: "B",
        achievement: "Published a groundbreaking research paper",
        date: new Date("2023-02-20")
      },
      {
        name: "C",
        achievement: "Completed a marathon",
        date: new Date("2023-03-10")
      }
    ];
    const insertResult = await collection.insertMany(dummyData);
    console.log('Inserted documents =>', insertResult);

  } catch (err) {
    console.error('Error connecting to MongoDB Atlas or inserting data:', err);
  } finally {
    await client.close();
  }
}
main().catch(console.error);
