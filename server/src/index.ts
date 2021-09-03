import { VoteResolver } from './resolvers/vote';
import { CommentResolver } from './resolvers/comment';
import { UserResolver } from './resolvers/user';
import { PostResolver } from './resolvers/post';
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
import { Post } from './entities/post';
import { Vote } from './entities/Vote';
import { User } from './entities/user';
import { Comment } from './entities/comment';

config();

const main = async () => {
  await createConnection({
    url: process.env.DATABASE_URL,
    type: "postgres",
    logging: true,
    synchronize: true,
    entities: [
      Post, Comment, Vote, User
    ]
  });

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
      resolvers: [PostResolver, UserResolver, CommentResolver, VoteResolver],
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

