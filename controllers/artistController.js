const artistModel = require('../models/artistModel');

const getArtists = async (req, res) => {
    try {
        const artists = await artistModel.find();
        res.status(200).json({ artists });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
}
const getSingleArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artists = await artistModel.findById(id);
        res.status(200).json({ artists });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
}
    

const createArtist = async(req, res) => {
    try {
        const artist = await artistModel.create(req.body);
        res.status(202).json({ artist });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
}
    

const updateArtist = async(req, res) => {
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
}

const deleteArtist =async(req, res) => {
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
}

module.exports = { getArtists , createArtist , updateArtist , deleteArtist , getSingleArtist };