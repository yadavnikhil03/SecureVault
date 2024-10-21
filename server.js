const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from 'public' folder
app.use(express.static('public'));
app.use(express.json()); // To parse JSON request bodies

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Path to users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Serve login.html when visiting the root URL "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));  
});

// User Registration Endpoint
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Read the existing users from users.json
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        const users = data ? JSON.parse(data) : [];

        // Check if the user already exists
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Add new user to the array
        users.push({ email, password });

        // Write the updated users array to users.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving user data.' });
            }

            // Successful registration
            res.json({ success: true });
        });
    });
});

// User Login Endpoint
// User Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Read the existing users from users.json
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        const users = data ? JSON.parse(data) : [];

        // Check if the user exists and the password matches
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // Successful login
        res.json({ success: true });
    });
});


// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    const fileId = path.basename(req.file.path);
    res.json({ success: true, fileId: fileId });
});

// Download endpoint
app.post('/download', (req, res) => {
    const { fileId } = req.body;
    const filePath = path.join(__dirname, 'uploads', fileId);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File not found.' });
    }

    res.sendFile(filePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
