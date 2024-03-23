const express = require('express');
const mongose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;
const artistModel = require('./models/artistModel');


app.use(express.json()); // middleware  for json data
app.use(express.urlencoded({ extended: true })); // middleware for form data

app.get('/api/artists', async (req, res) => {
    try {
        const artists = await artistModel.find();
        res.status(200).json({ artists });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});

app.get('/api/artists/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const artists = await artistModel.findById(id);
        res.status(200).json({ artists });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});


app.post('/api/artists', async(req, res) => {
    try {
        const artist = await artistModel.create(req.body);
        res.status(202).json({ artist });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});

app.put('/api/artists/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const artist = await artistModel.findByIdAndUpdate(id,req.body);

        if(!artist)
        {
            return res.status(404).json({ message : 'Artist not found'});
        }
        const updatedArtist = await artistModel.findById(id);
        res.status(200).json({updatedArtist});
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});

app.delete('/api/artists/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const artist =await  artistModel.findByIdAndDelete(id);

        if(!artist){
            return res.status(404).json({ message : 'Artist not found'});
        }
        res.status(200).json("Artist deleted Successfully")
    }
    catch(error){
        res.status(400).json({ message : error.message});
    }
});

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