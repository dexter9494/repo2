const express = require('express');
const router = express.Router();
const path = require('path');
const htmlFilePath = path.join(__dirname, '..', 'linked file');

// Middleware to protect routes
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    next();
}

// GET /dashboard
router.get('/', requireAuth, (req, res) => {
    // Access user data from session
    const user = req.session.user;
    res.sendFile(path.join(htmlFilePath,"profile.html"));
});

// GET /dashboard/logout
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out');
        }
        // Redirect to login page or send logout success message
        res.send('Logged out successfully');
    });
});

module.exports = router;