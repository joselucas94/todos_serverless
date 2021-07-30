import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";


export const handle: APIGatewayProxyHandler = async(event) => {
    const {user_id} = event.pathParameters;

    const response = await document.query({
        TableName: "todo_list",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    }).promise();

    if(response.Items) {
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    };

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Usuário não existe"
        }),
    };
}