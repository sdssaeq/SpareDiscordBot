const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    type:{
        type: String,
        required: [true,'tambahin tipe!']
    },
    typebarang:{
        type: String,
        required: [true,'tambahin tipe Barang!']
    },
    nama:{
        type: String,
        required: [true,'tambahin namardp!']
    },
    harga:{
        type: Number,
        required: [true,'tambahin jumlahnya!']
    },
    data:[{
    }]

},{
    timestamps: true
})

module.exports = mongoose.model('Rdp',dataSchema)