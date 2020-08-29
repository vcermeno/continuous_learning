import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuctionById(event, context) {
    let auction;
    const { id } = event.pathParameters;

    try {
        const result = await dynamoDB.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id }
        }).promise();

        auction = result.Item;
    } catch(error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    };

    if (!auction) {
        throw new createError.NotFound(`Auction with ID  "${id}" not found`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    };
};
export const handler = middy(getAuctionById)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
