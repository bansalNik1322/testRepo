const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});



// Define user schema
const userSchema = {
    name: String,
    email: String,
};

const User = mongoose.model('User', userSchema);

// Routes
app.get('/userform', (req, res) => {
    res.render('userform');
});

app.post('/userform', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
    });

    const savedUser = await newUser.save()
    console.log(savedUser);
    res.send("Done")
});

app.get('/userlist', (req, res) => {
    User.find({})
        .then((foundUsers) => {
            res.render('userlist', { users: foundUsers });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
