require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use('/api/auth', require('./routes/auth'));
app.use(express.json());
app.use(cors());

const User = require('./models/User'); // Import User Model

const PORT = process.env.PORT || 5026;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1); // Exit the app if no URI is found
}

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('✅ CASW Inventory API is Running! Access API routes at /api');
});
