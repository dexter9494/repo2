const express = require("express")
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const bcrypt = require('bcryptjs');
const path = require('path');
//const app = express();
const db = require('./dbConn');
const router = express.Router();
//app.use(bodyParser.urlencoded({extended:true}));


const htmlFilePath = path.join(__dirname, '..', 'linked file');


// Use express.static middleware to serve static files
//app.use(express.static(htmlFilePath));

//const db = mysql.createConnection({
//host:'localhost',
 //   user:"root",
   // password:"root",
   // database:"gymproject"
//})
//db.connect((err)=>{
   // if(err){
   //     throw err
   // }
   // console.log("database connected");
//})
//app.get("/",(req,res)=>{
 //   res.sendFile(path.join(htmlFilePath,'sign_up.html'))
//})

router.post('/signup', (req, res) => {
const {fname,lname,username,email} = req.body
const pass = req.body.pass
    const saltRounds = 10;

    try {
        // Check if the username already exists
        const queryCheck = 'SELECT * FROM signup WHERE username = ?';
        db.query(queryCheck, [username], (err, results) => {
            if (err) {
                console.error('Error checking username:', err);
                res.status(500).send('Error signing up1');
                return;
            }

            if (results.length > 0) {
                res.status(400).send('Username already exists');
                return;
            }

            // Username does not exist, proceed with hashing the password
            bcrypt.hash(pass, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Error signing up2');
                    return;
                }

                // Insert the user into the database
                const queryInsert = 'INSERT INTO signup (fname,lname,username,email,pass) VALUES (?,?,?,?,?)';
                db.query(queryInsert, [fname,lname,username,email,hashedPassword], (err, results) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        res.status(500).send('Error signing up3');
                        return;
                    }
                    res.sendFile(path.join(htmlFilePath,'sign_in.html'));
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Error signing up');
    }
});

//const port = 3000
//app.listen(port,()=>{
 //   console.log(`Listening at ${port}`);
//})
module.exports = router;