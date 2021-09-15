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
import { COOKIE_NAME, __prod__ } from "./const/constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { CustomContext } from "./types/CustomContext";
import { Upvote } from "./entities/Upvote";
import { buildDataLoaders } from "./utils/dataLoader";
import { Film } from "./entities/Film";
import { FilmResolver } from "./resolvers/film";

const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        host: process.env.AWS_RDS_POSTGRES_HOST,
        port: 5432,
        database: "reddit",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        ...(__prod__
            ? {
                  extra: {
                      ssl: {
                          rejectUnauthorized: false,
                      },
                  },
                  ssl: true,
              }
            : {}),
        ...(__prod__ ? {} : { synchronize: true }),
        entities: [User, Post, Upvote, Film],
        // migrations: [path.join(__dirname, "/migrations/*")],
    });

    console.log("Postgres connected");

    // if (__prod__) await connection.runMigrations();

    const app = express();
    app.set("trust proxy", 1);

    app.use(
        cors({
            origin: __prod__ ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV,
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
                secure: __prod__, // cookie only work in https
                sameSite: "lax", // protection agaist CSRF //none if difference domain
            },
            secret: process.env.SESSION_SECRET_DEV_PROD as string,
            saveUninitialized: false, //dont' save empty session, when start
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, PostResolver, FilmResolver],
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
    app.listen(PORT, () =>
        console.log(
            `server start port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`
        )
    );
};

main().catch((error) => console.log(error));
