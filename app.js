require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cron = require('node-cron');
const { fetchAndSaveCoinData } = require("./controller/coinController");
const connectMongo = require("./database/connectMongo");
const {logger} = require('livlogger')

const app = express();
connectMongo();
app.use(cors());
app.use(express.json());
// a logger function to keep logs about my apis, i created it myself , for details visit: https://www.npmjs.com/package/livlogger
app.use(logger)

//routes
app.use('/api/v1' , require('./routes/coin.route'));

//cronjob
cron.schedule('0 */2 * * *', () => {
    console.log(`cron job running to fetch and save coin data ${new Date()}`);
    fetchAndSaveCoinData();
});

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT)
});