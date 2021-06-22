const animeModel = require ('../model/Anime')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertAnime = (data) =>
  new Promise((resolve, reject) => {
    animeModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Anime')))
    .catch(() => reject(requestResponse.serverError))
  })

  exports.getAllAnime = () =>
    new Promise((resolve, reject) => {
        animeModel.find({})
           .then(anime => resolve(requestResponse.suksesWithData(anime)))
           .catch(error => resolve(requestResponse.serverError))
    })

    exports.getbyId = (id) =>
      new Promise((resolve, reject) => {
          animeModel.findOne({
              _id: objectId(id)
          }).then(anime => resolve(requestResponse.suksesWithData(anime)))
          .catch(error => reject(requestResponse.serverError))
      })

exports.editAnime = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    animeModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Daftar Anime'))
      }).catch(() => reject(requestResponse.serverError))
  })

  exports.delete = (id) =>
    new Promise((resolve, reject) => {
      animeModel.findOne({
        _id: objectId(id)
      }).then(anime => {
        animeModel.deleteOne({
          _id: objectId(id)
        }).then(() => {
          deleteImage(anime.image)
          resolve(requestResponse.sukses('Berhasil Hapus List Anime'))
        }).catch(() => reject(requestResponse.serverError))
      })
    })