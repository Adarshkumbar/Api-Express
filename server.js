const express = require('express');
const mongose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const artistModel = require('./models/artistModel');
const artistRoute = require('./routes/artistRoutes');

app.use(express.json()); // middleware  for json data
app.use(express.urlencoded({ extended: true })); // middleware for form data

// Routes
app.use("/api/artists", artistRoute);

// Connect to MongoDB
mongose.connect(process.env.mongoURL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});