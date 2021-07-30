import { APIGatewayProxyHandler } from "aws-lambda"
import { v4 as uuidv4 } from "uuid";

import { document } from "src/utils/dynamodbClient";

interface IToDo {
    title: string;
    deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {

    const { user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as IToDo;
    const date = new Date(deadline);
    console.log(date);
    

    await document.put({
        TableName: "todo_list",
        Item: {
            id:uuidv4(),
            user_id,
            title,
            done: false,
            deadline: String(date),
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: " To do created!"
        }),
        headers: {
            "Content-type": "aplication/json"
        }
    }
}