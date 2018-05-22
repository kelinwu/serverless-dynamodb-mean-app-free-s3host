const request = require('request-promise');

module.exports = event => {
    //https://finviz.com/news.ashx
    const url = "https://finviz.com/news.ashx";
    return request({ method: 'GET', url: url });
}