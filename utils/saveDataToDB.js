const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    // delete existings items first
    var hashKey = "id";
    var rangeKey = null;
    var scanParams = {
        TableName: process.env.DYNAMODB_TABLE,
    };

    dynamoDb.scan(scanParams, function (err, data) {
        if (err) ppJson(err); // an error occurred
        else {
            data.Items.forEach(function (obj, i) {
                console.log(i);
                console.log(obj);
                var params = {
                    TableName: scanParams.TableName,
                    Key: buildKey(obj),
                    ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
                    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
                    ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
                };

                dynamoDb.delete(params, function (err, data) {
                    if (err) ppJson(err); // an error occurred
                    else ppJson(data); // successful response
                });

            });
        }
    });


    function buildKey(obj) {
        var key = {};
        key[hashKey] = obj[hashKey]
        if (rangeKey) {
            key[rangeKey] = obj[rangeKey];
        }

        return key;
    }

    // new item define
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
        if (error) {
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