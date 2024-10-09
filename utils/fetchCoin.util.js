const axios = require('axios');
const fetchRequiredFields = require('./fetchRequiredFields.util');

const fetchCoin = async (coinId) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-MTTyHX71U6vCiSWVAo4cZw9E'
      }
    };
    const response = await axios.get(url, options);
    console.log(response.data)
    
    const filteredData = fetchRequiredFields(response.data)
    return filteredData;
}

module.exports = fetchCoin;