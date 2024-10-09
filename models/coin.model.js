const mongoose = require('mongoose')

const CoinSchema = mongoose.Schema({
    //name of the crypto currency 
    coin:{
        type:String,
    },
    //market cap of the crypto currency while data was saved
    marketCap:{
        type: Number,
    },
    // difference of price (24 hours) while data was saved
    change24h:{
        type: Number
    },
    //price of the coin while data was saved
    price:{
        type: Number
    },
    //timestamp when the data was saved using the cronjob
    cronJobRunTime:{
        type:Date,
    },

})

const CoinModel = mongoose.model('coin', CoinSchema);
module.exports = CoinModel;