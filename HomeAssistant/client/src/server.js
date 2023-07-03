const express = require('express');
const mongoose = require('mongoose');
const redirect = require('express-redirect');

const app = express();
const port = 3000; // Set the desired port number
app.use(express.json());
const db = 'mongodb+srv://:@cluster0.ny2h3cn.mongodb.net/HomeAssistant'

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define the schema and model for the form data
const formDataSchema = new mongoose.Schema({
    profileName: String,
    reside: String,
    category: String,
    favPlayer: String,
});

const userp= mongoose.model('userspreferences', formDataSchema);

//module.exports = userp;

// Set up API route to handle form data insertion
app.post('/formdata', (req, res) => {
    const { profileName, reside, category, favPlayer } = req.body;

    const formData = new userp({
        profileName,
        reside,
        category,
        favPlayer,
    });

    formData.save()
        .then(() => {
            console.log('Form data saved:', formData);
            res.status(201).json({ message: 'Form data saved successfully' });
            })
            .catch((error) => {
            console.error('Error saving form data:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

//using find instead of find one (backup)
/**app.get('/readdb', (req, res) => {
    const condition = req.query;
  
    userp
      .find(condition)
      .then((data) => {
        console.log('Form data retrieved:', data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.error('Error retrieving form data:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });**/

app.get('/readdb', (req, res) => {
    const condition = req.query;
  
    userp
      .findOne(condition)
      .then((data) => {
        console.log('Form data retrieved:', data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.error('Error retrieving form data:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  app.get('/deleteProfile', (req, res) => {
    const condition = req.query.condition;
  
    userp
      .deleteOne({ profileName: condition })
      .then((result) => {
        console.log('Document deleted successfully.');
        res.status(200).json({ message: 'Document deleted successfully' });
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Error deleting document' });
      });
  });
  
  
  
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
