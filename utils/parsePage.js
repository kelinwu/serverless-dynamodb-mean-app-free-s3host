const cheerio = require('cheerio');

module.exports = page => {
    try{
        const $ = cheerio.load(page);

        const newsData = $('.nn-tab-link').text().split('\n')[2].trim();

        // const newsDate = $('.time').html();
        // const data = {
        //     newsData,
        //     newsDate
        // }

        return Promise.resolve(newsData);

        // console.log(data);
        // console.log("************************");
        // console.log(news)

    } catch(error) {
        return Promise.reject(`Error parsing page: ${JSON.stringify(error)}`)
    } 
}