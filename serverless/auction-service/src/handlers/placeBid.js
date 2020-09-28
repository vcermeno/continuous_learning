import AWS from 'aws-sdk';
import commonMiddleware from '../../lib/commonMiddleware';
import createError from 'http-errors';
import { getAuctionById } from '../handlers/getAuctionById';
import placeBidSchema from '../../lib/schemas/placeBidSchema';
import validator from '@middy/validator';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
    const { id } = event.pathParameters;
    const { amount } = event.body;

    const auction = await getAuctionById(id);

    if (auction.status !== 'open'){
        throw new createError.Forbidden('You cannot bid on closed auctions');
    }

    if (amount <= auction.highestBid.amount) {
        const error = `Your bid must be higher than ${amount}`;
        console.error(error);
        throw new createError.Forbidden(error);
    }

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount' : amount,
        },
        ReturnValues: 'ALL_NEW',
    };

    let updatedAuction;

    try {
        const result = await dynamoDB.update(params).promise();
        updatedAuction = result.Attributes;
        console.log("updatedAuction", updatedAuction);
    } catch (error) {
        throw new createError.InternalServerError(error);
    }

    return{
        statusCode: 200,
        body: JSON.stringify(updatedAuction),
    };
};

export const handler = commonMiddleware(placeBid)
    .use(validator({ inputSchema: placeBidSchema }));