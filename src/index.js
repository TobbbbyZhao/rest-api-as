const express = require('express');
const app = express();
const port = 3001;

const user = [];
// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    console.log(user);
    res.json(user);
});

app.post('/users', (req, res) => {
    const newItem = req.body;
    if (newItem.name == "" || newItem.email == "") {
        res.status(400).json({message:'Bad Request'});
    }
    user.push(newItem);
  res.status(201).json({ message: 'Created' });
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing