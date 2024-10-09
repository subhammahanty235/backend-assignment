const fetchRequiredFields = (response) => {
    if(!response){
        return null;
    }
    const { current_price, market_cap, price_change_24h } = response.market_data;
    const requiredData = {
        price: current_price.usd,
        marketCap: market_cap.usd,
        change24h: price_change_24h
    };
    
    return requiredData;
}

module.exports = fetchRequiredFields