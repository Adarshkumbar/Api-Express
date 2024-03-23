const express = require('express');
const router = express.Router();
const {getArtists, deleteArtist, updateArtist, createArtist, getSingleArtist} = require('../controllers/artistController')

router.get('/',getArtists)

router.get('/:id',getSingleArtist)

router.post('/:id',createArtist);

router.delete('/:id',deleteArtist)

router.put('/:id',updateArtist);

module.exports = router;