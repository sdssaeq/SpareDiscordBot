const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    discordid:{
        type: String,
        required: [true,'tambahin discordid!']
    },
    namaplayer:{
        type: String,
        required: [true,'tambahin namaplayer!']
    },
    namabarang:{
        type: String,
        required: [true,'tambahin nama barang!']
    },
    jumlah:{
        type: Number,
        required: [true,'tambahin jumlahnya!']
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Datas',dataSchema)