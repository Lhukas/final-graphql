import 'dotenv/config'; // Charge les variables d'environnement depuis .env
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./resolvers";
import jwt from "jsonwebtoken";


//npx ts-node src/server.ts

const JWT_SECRET = process.env.JWT_SECRET!;

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });

    await server.start();
    server.applyMiddleware({ app });

    const getContext = (req: express.Request) => ({
        req,
        getUserId: () => {
            const Authorization = req.headers.authorization;
            if (Authorization) {
                const token = Authorization.replace("Bearer ", "");
                const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
                return userId;
            }
            throw new Error("Not authenticated");
        },
    });

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
