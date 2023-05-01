const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.mongoUri,{
            useNewUrlParser: true,
            keepAlive: true
        })

        console.log(`MONGO DB CONNECTED: ${conn.connection.host}`)
    
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB