import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyContext } from "./types/MyContext";

config();

const main = async () => {
  await createConnection();

  const app = express();

  app.use(cors({ origin: ["https://studio.apollographql.com", "http://localhost:3000"], credentials: true, }));
  app.use(cookieParser());

  // ** middleware for getting the userId from cookies
  app.use((req, _, next) => {
    const token = req.cookies["token"];
    try {
      const response = jwt.verify(token, `${process.env.JWT_SECRET}`) as any;
      (req as any).userId = response.userId;
    } catch { }
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          "request.credentials": "include",
        }
      })
    ]
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`graphql server : http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

main();

