const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');


const user = [];

app.use(express.json());

app.get('/users', (req, res) => {

      res.status(200).json(user);

  });

app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    const foundUser = user.find(u => u.id == id);
    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  });
  

app.post('/users', (req, res) => {
    const newItem = req.body;
    if (!newItem.name  || !newItem.email) {
        return res.status(400).json({message:'Bad Request'});
    }
    newItem.id=uuidv4();
    user.push(newItem);
  res.status(201).json({ id:newItem.id , name: newItem.name, email: newItem.email });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const foundUser = user.find(u => u.id == id);
    if (!foundUser) {
      return res.status(404).json({ message: 'Not Found' });
    }

    foundUser.name = name;
    foundUser.email = email;
  
    res.status(200).json(foundUser);
  });
  

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    const index = user.findIndex(u => u.id == id);
    if (index !== -1) {
      user.splice(index, 1);
      return res.status(204).json({ message: 'No Content' });
    } else {
      return res.status(404).json({ message: 'Not Found' });
    }
  });
  

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing