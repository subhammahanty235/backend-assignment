const mongoose = require('mongoose')

const connectMongo = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log("Database is connected"))
        .catch((err) => { console.log(err) })
}

module.exports = connectMongo