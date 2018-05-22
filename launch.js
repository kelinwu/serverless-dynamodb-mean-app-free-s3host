const request = require('request-promise');
const AWS = require('aws-sdk');

const list = [1,2];

function deployScraper(code) {
    const lambda = new AWS.Lambda({
        region: "us-east-1"
    })

    const params = {
        FunctionName: "news-scraper-dev-scrape",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify(code)
    }

    return lambda.invoke(params, function(error, data) {
        if(error) {
            console.error(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`);
        } else if(data) {
            // console.log(data);
            return JSON.stringify(data);
        }
    })
}

function swarm(arr) {
    arr.forEach(code => {
        deployScraper(code);
    });
}

swarm(list)

