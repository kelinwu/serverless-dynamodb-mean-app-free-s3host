const request = require("request-promise");
const AWS = require("aws-sdk");

const list = [
    "finvis news",
    "yahoo news",
    "google news"
]

function deployScraper(arg) {
    const lambda = new AWS.Lambda({
        region: "us-east-1"
    })
    
    const params = {
        FunctionName: "news-scraper-dev-scrape",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify(arg)
    }

    return lambda.invoke(params, function(error, data) {
        if(error) {
            console.error(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`);
        } else if(data) {
            console.log("lambda.invoked")
            console.log( data);
            return JSON.stringify(data);
        }
    })
}

deployScraper("test");

