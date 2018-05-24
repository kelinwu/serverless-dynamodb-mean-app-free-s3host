const request = require('request-promise');

module.exports = event => {
    //https://finviz.com/news.ashx
    //https://www.investing.com/news/stock-market-news
    //https://www.investing.com/news/most-popular-news
    const url = "https://finviz.com/news.ashx";
    return request({ method: 'GET', url: url });
}