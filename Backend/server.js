const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const htmlFilePath = path.join(__dirname, '..', 'linked file');
const app = express();
const session = require("express-session")
app.use(session({
    secret: 'your-secret-key', // a secret key used to sign the session ID cookie (required)
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something is stored
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day (in milliseconds)
    }
}));
app.use(express.static(htmlFilePath));

const signupRoute = require('./signup');
const loginRoute = require('./login');
const profileRoutes = require('./profile');

const port =  process.env.PORT | 3000;


// Middleware to parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML files
app.get('/signup', (req, res) => {
    res.sendFile(path.join(htmlFilePath, 'sign_up.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(htmlFilePath,'sign_in.html'));
});

// Use routes
app.use(signupRoute);
app.use(loginRoute);
app.use(profileRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
