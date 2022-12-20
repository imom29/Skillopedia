const mongoose = require('mongoose')

const connectDb = async () => {
    
    // const conn = await mongoose.connect(process.env.MONGOURI)
    const conn = await mongoose.connect('mongodb+srv://omtita29:OmtitaJeavio@skillopedia.zaut1ju.mongodb.net/?retryWrites=true&w=majority')


    console.log(`Connected to ${conn.connection.host}`)
}

module.exports = connectDb;