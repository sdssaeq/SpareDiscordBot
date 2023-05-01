const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    no:{
        type: Number,
        required: [true,'tambahin discordid!']
    },
    discordid:{
        type: String,
        required: [true,'tambahin discordid!']
    },
    namaplayer:{
        type: String,
        required: [true,'tambahin namaplayer!']
    },
    typebarang:{
        type: String,
        required: [true,'tambahin tipe Barang!']
    },
    namabarang:{
        type: String,
        required: [true,'tambahin nama barang!']
    },
    hargabarang:{
        type: Number,
        required: [true,'tambahin tipe Barang!']
    },
    data:{
        type: String,
        required: [true,'ADD DATA HERE!!']
    },
    jumlah:{
        type: Number,
        required: [true,'tambahin jumlahnya!']
    }
    

},{
    timestamps: true
})

module.exports = mongoose.model('History',dataSchema)