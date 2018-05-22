const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const date = JSON.stringify(new Date());
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            newsData: data,
            scrapedAt: date
        }
    };

    // insertion
    dynamoDb.put(params, error => {
        if(error) {
            console.error(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
            return Promise.reject(
                `Error sawing data to DynamoDB: ${JSON.stringify(error)}`
            )
        } else {
            console.log('params.item')
            console.log(params.Item.scrapedAt);
            return Promise.resolve(params.Item)
        }
    })
}