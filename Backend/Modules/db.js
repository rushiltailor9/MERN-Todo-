const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/taskdb';

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB ✅');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB ❌:', err.message);
    });
