import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { profileEnd } from "console";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
// const schema = a.schema({
//   Todo: a.model({
//       content: a.string(),
//       isDone: a.boolean(),
//     })
//     .authorization((allow) => [allow.owner()]),
// });
const schema = a
  .schema({
  // Review: a
  //   .model({
  //     products: a.hasMany("")
  //     reviewId: a.id().required(),
  //     customer: a.string()
  //   }),
    Todo: a
      .model({
        content: a.string(),
        isDone: a.boolean()
      }),
    Tag: a
      .model({
        value: a.string(),
        productId: a.id(),
        tags: a.belongsTo('Product', 'productId')
      }),
    Review: a
      .model({
        productId: a.id(),
        reviews: a.belongsTo('Product', 'productId'),
        customer: a.string(),
        review: a.string(),
        score: a.integer()
      }),
    Sale: a
      .model({
        productId: a.id(),
        sales: a.belongsTo('Product', 'productId'),
        weekEnding: a.date(),
        retailSales: a.integer(),
        wholesaleSales: a.integer(), 
        unitsSold: a.integer(), 
        retailerMargin: a.integer()
      }),
    Product: a.model({
      // id: a.id().required(),
      title: a.string(),
      image: a.url(),
      subtitle: a.string(),
      brand: a.string(),
      reviews: a.hasMany('Review', 'productId'),
      // reviews: a.customType({
      //   reviewId: a.id(),
      //   hasMany("Review", "reviewId")
      //   customer: a.string(),
      //   review: a.string(),
      //   score: a.integer()
      // }),
      retailer: a.string(),
      details: a.string(),
      tags: a.hasMany('Tag', 'productId'),
      sales: a.hasMany('Sale', 'productId')
    })
    // .identifier(["id"]),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // This tells the data client in your app (generateClient())
    // to sign API requests with the user authentication token.
    defaultAuthorizationMode: "userPool",
    // defaultAuthorizationMode: "apiKey",
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
