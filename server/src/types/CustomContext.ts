import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Connection } from "typeorm";
import { buildDataLoaders } from "../utils/dataLoader";

export type CustomContext = {
    req: Request & { session: Session & Partial<SessionData> & { userId?: number } };
    res: Response;
    connection: Connection;
    dataLoaders: ReturnType<typeof buildDataLoaders>;
};
