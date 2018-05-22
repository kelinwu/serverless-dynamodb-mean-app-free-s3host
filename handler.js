'use strict';
const { getPage, parsePage, saveDataToDB, deployScrapers } = require('./utils');

module.exports.scrape = (event, context, callback) => {
  // fetch page
  getPage(event)
    // parse page
    .then(page => parsePage(page))
    // save data to db
    .then(newsData => saveDataToDB(newsData, event))
    //completion message
    .then(()=> callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Scraped ${event}`
      })
    }))
    .catch(error => callback(new Error(`Error scraping: ${JSON.stringify(error)} `))
  );
};

module.exports.launch_scrapers = (event, context, callback) => {
  const fakeDatabaseResult = [1];

  fakeDatabaseResult.forEach(item => {
    deployScrapers(item);
  })
}