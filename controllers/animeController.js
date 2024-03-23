const animeModel = require('../models/animeModel')

const getAnimes = async (req, res) =>{
    try {
        const animes = await animeModel.find();
        res.status(200).json({ animes });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
}

const getAnime = async (req, res) =>{
    try {
        const {id} = req.params;
        const anime = await animeModel.findById(id);
        res.status(200).json({ anime });
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
}

const createAnime = async(req, res) => {
    try{
        const anime = await animeModel.create(req.body);
        res.status(200).json({ anime });
    }catch (error){
        res.status(400).json({message : error.message})
    }
}

const updateAnime = async(req ,res) =>{
    try{
        const {id} = req.params;
        const anime = await animeModel.findByIdAndUpdate(id,req.body);

        const updatedAnime = await animeModel.findById(id);
        res.status(200).json({updatedAnime});
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
}

const deleteAnime =  async (req, res) =>{
    try{
        const  {id} = req.params;
        const anime = await animeModel.findByIdAndDelete(id);
        
        if(!anime){
            res.status(404).json({message : 'Anime not found'});
        }
        res.status(200).json({message : 'Anime Deleted Successfully'});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

module.exports = {createAnime , getAnimes, getAnime , updateAnime , deleteAnime}