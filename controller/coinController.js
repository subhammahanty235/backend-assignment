const CoinModel = require('../models/coin.model')
const axios = require("axios")
const fetchCoin = require('../utils/fetchCoin.util')


const coinIds = ["bitcoin", "matic-network", "ethereum"]
/*
    To increase the readablity, i have used a few practices,
        a. i have created one dedicated util function to fetch the coin data from api, it will return one object only with the required datasets 
*/
//function to save data into database, it's not an API related function, it will be called by the cron Job only
exports.fetchAndSaveCoinData = async () => {
    for(var coin of coinIds){
        let fetchedData = await fetchCoin(coin);
        fetchedData.coin = coin;
        fetchedData.cronJobRunTime = new Date()
        
        await CoinModel.create(fetchedData);
        console.log("Data Added")
    }
}

//controller to fetch data of single coin
exports.fetchSingleCoin = async (req, res) => {
    try {
        const coinName = req.query.coin;
        const fetchedCoin = await fetchCoin(coinName);
        if(!fetchedCoin){
            return  res.status(404).json({success: false , message:"Coin not found"});
        }else{
            return res.status(201).json({success: true , message:"Coin data fetched" , coin: fetchedCoin});
        }
    } catch (error) {
        console.log("Error occured")
        console.log(error.message)
        return  res.status(500).json({success: false , message:"something went wrong"});
    }
}

//function to calculate the standard deviation of the prices
const calcStandardDeviation = (prices) => {
    const n = prices.length;
    const mean = prices.reduce((a, b) => a + b, 0) / n;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return Math.sqrt(variance);
};


exports.findDeviation = async (req, res) => {
    try {
        const coinName = req.query.coin;
        const dbRecords = await CoinModel.find({coin:coinName}).sort({ cronJobRunTime: -1 }).limit(100);
        if(!dbRecords){
            return  res.status(400).json({success: false , message:"no coins found on database"});
        }
        console.log(dbRecords)
        const prices = dbRecords.map(record => record.price);
        const deviation  = calcStandardDeviation(prices);
        return res.status(201).json({success: true , message:"Standard Deviation fetched successfully" , deviation:deviation.toFixed(4)});

    } catch (error) {
        return  res.status(500).json({success: false , message: error});
    }
}