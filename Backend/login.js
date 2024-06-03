const express = require('express');
const bcrypt = require("bcryptjs");
const dbConn = require('./dbConn');
const app = express()
const router = express.Router();
const path = require('path');
const htmlFilePath = path.join(__dirname, '..', 'linked file');



router.post('/login', (req, res) => {
    const { username,password,confirm_pass } = req.body;

    if (!username || !password) {
        console.error('Missing username/email or password');
        return res.status(400).send('Username/Email and Password are required');
    }

    // Check if password and confirm password fields match
    if (password !== confirm_pass) {
        console.error('Password and Confirm Password do not match');
        return res.status(400).send('Password and Confirm Password do not match');
    }


    // Check if the username exists
    const queryCheck = 'SELECT * FROM signup WHERE username = ? ';
    dbConn.query(queryCheck, [username], (err, results) => {
        if (err) {
            console.error('Error checking username ', err);
            res.status(500).send('Error logging in');
            return;
        }

        if (results.length === 0) {
            res.status(400).send('Invalid username');
            return;
        }

        const user = results[0];
       // console.log(username,password,user.pass);

        // Compare the hashed password
        bcrypt.compare( password,user.pass, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.status(500).send('Error logging in2');
                return;
            }

            if (!isMatch) {
                res.status(400).send('Invalid username or password');
                return;

            }
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
                // Add other relevant user information as needed
            };

            res.sendFile(path.join(htmlFilePath,"profile.html"));
        });
    });
});

module.exports = router;
