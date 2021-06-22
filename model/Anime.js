const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeSchema = new Schema({
    judulAnime: {
        type: String
    },
    harga: {
        type: Number
    },
    tahun: {
        type: String,
        default: '2020'
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Anime', AnimeSchema)