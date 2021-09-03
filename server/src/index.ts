require("dotenv").config();
import("reflect-metadata");
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME } from "./const/constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { CustomContext } from "./types/CustomContext";
import { Upvote } from "./entities/Upvote";
import { buildDataLoaders } from "./utils/dataLoader";

const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        database: "reddit",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Post, Upvote],
    });

    const app = express();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    //session/cokkie store
    const mongoUrl = `mongodb+srv://${process.env.SESSION_DB_USERNAME}:${process.env.SESSION_DB_PASSWORD}@reddit.s2fdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await mongoose.connect(mongoUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log("MongoDB connected");

    app.use(
        session({
            name: COOKIE_NAME,
            store: new MongoStore({ mongoUrl }),
            cookie: {
                maxAge: 1000 * 60 * 60, //on hour
                httpOnly: true, // JS from frontend can not access
                secure: false, // cookie only work in https
                sameSite: "lax", // protection agaist CSRF
            },
            secret: "dev123",
            saveUninitialized: false, //dont' save empty session, when start
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, PostResolver],
            validate: false,
        }),
        context: ({ req, res }): CustomContext => ({
            req,
            res,
            connection,
            dataLoaders: buildDataLoaders(),
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    const PORT = process.env.PORT || 4002;
    app.listen(4002, () =>
        console.log(
            `server start port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`
        )
    );
};

main().catch((error) => console.log(error));
