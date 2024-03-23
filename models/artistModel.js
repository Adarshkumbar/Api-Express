//Create schema / model

const { default: mongoose } = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const artist = mongoose.model("Artist", artistSchema);

module.exports = artist;