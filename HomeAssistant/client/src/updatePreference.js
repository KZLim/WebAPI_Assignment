const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://:@cluster0.ny2h3cn.mongodb.net/HomeAssistant';
const client = new MongoClient(uri);
const readline = require('readline');

var profileTarget = '';
var newReside = '';
var newCategory = '';
var newFavPlayer = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


async function updateDocument(target, update) {
  try {
    await client.connect();
    const db = client.db("HomeAssistant");
    const coll = db.collection("userspreferences");

    const result = await coll.updateOne(target, update);

    console.log(`${result.modifiedCount} document(s) updated.`);
  } finally {
    await client.close();
  }
}

// Example usage
rl.question("Enter your profile name: ", (updateTarget) => {
    rl.question("Enter your new location: ",(newResidesData)=>{
        rl.question("Enter new category: ",(newCategoryData)=>{
            rl.question("Enter new football player: ",(newFavPlayerData)=>{
                profileTarget = updateTarget;
                newReside = newResidesData;
                newCategory = newCategoryData;
                newFavPlayer = newFavPlayerData;

                const target = { profileName: profileTarget };
                const update = { $set: { reside: newReside, category: newCategory, favPlayer: newFavPlayer,}};

                updateDocument(target, update).catch(console.error);
                rl.close();
            })
        })
    });
});



