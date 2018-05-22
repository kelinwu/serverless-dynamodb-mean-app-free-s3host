const  AWS = require('aws-sdk');

module.exports = (item) => {
    const lambda = new AWS.Lambda({
        region: "us-east-1"
    })

    const params = {
        FunctionName: "news-scraper-dev-scrape",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify(item)
    }

    return lambda.invoke(params, function(error, data) {
        if(error) {
            console.error(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`);
        } else if(data) {
            console.log('serless schedule')
            console.log(data);
            return JSON.stringify(data);
        }
    })
}