const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async(event, context, callback) => {
    await updateLastState(JSON.parse(event.body), context).then(() => {
        callback(null, {
            statusCode: 201,
            body: "",
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        })
    }).catch((err) => {
        console.error(err)
    });
};

function updateLastState(body, context){
    const params = {
        TableName: 'laststate',
        Item: {
            'id': body.data.id,
            'emptyX':body.data.emptyX,
            'emptyY':body.data.emptyY,
            'minutes': body.data.minutes,
            'seconds': body.data.seconds,
            'moves': body.data.moves,
            'values': body.data.values
        }
    }
    return ddb.put(params).promise();
}