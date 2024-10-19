const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from 'public' folder
app.use(express.static('public'));
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve login.html when visiting the root URL "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));  
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
