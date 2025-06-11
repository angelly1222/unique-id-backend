const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Generate IDs from 001 to 550
let availableIDs = Array.from({ length: 550 }, (_, i) => String(i + 1).padStart(3, '0'));
let usedIDs = [];

app.get('/getUniqueID', (req, res) => {
    if (availableIDs.length === 0) {
        return res.status(400).json({ error: 'No available IDs left.' });
    }

    const index = Math.floor(Math.random() * availableIDs.length);
    const id = availableIDs.splice(index, 1)[0];
    usedIDs.push(id);

    res.json({ uniqueID: id });
});

app.get('/resetIDs', (req, res) => {
    availableIDs = Array.from({ length: 550 }, (_, i) => String(i + 1).padStart(3, '0'));
    usedIDs = [];
    res.json({ message: 'ID pool has been reset.' });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
