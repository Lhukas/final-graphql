import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Article, Comment, Like, Resolvers} from "./generated/graphql";
import { Context } from "./context";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!; // Utilisez une clé secrète sécurisée

export const typeDefs = gql`

    type Query {
        users: [User]
        articles: [Article]
        article(id: Int!): Article
    }

    type Mutation {
        signup(email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createArticle(title: String!, content: String!): Article
        addComment(articleId: Int!, content: String!): Comment
        likeArticle(articleId: Int!): Like
    }

    type User {
        id: Int!
        email: String!
        articles: [Article]
        comments: [Comment]
        likes: [Like]
    }

    type Article {
        id: Int!
        title: String!
        content: String!
        author: User
        comments: [Comment]
        likes: [Like]
    }

    type Comment {
        id: Int!
        content: String!
        author: User
        article: Article
    }

    type Like {
        id: Int!
        user: User
        article: Article
    }

    type AuthPayload {
        token: String!
        user: User!
    }

`;


// @ts-ignore
export const resolvers: Resolvers<Context> = {
    Query: {
        users: async () => prisma.user.findMany(),
        articles: async () => prisma.article.findMany(),
        article: async (_parent, args, _context) => {
            return prisma.article.findUnique({ where: { id: args.id } }) ?? null;
        },
    },
    Mutation: {
        signup: async (_parent, args, _context) => {
            const hashedPassword = await bcrypt.hash(args.password, 10);
            const user = await prisma.user.create({
                data: {
                    email: args.email,
                    password: hashedPassword,
                },
            });
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            return { token, user };
        },
        login: async (_parent, args, _context) => {
            const user = await prisma.user.findUnique({ where: { email: args.email } });
            if (!user) throw new Error("User not found");
            const valid = await bcrypt.compare(args.password, user.password);
            if (!valid) throw new Error("Invalid password");
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            return { token, user };
        },
        createArticle: async (_parent, args, context) => {
            const userId = getUserId(context);
            return prisma.article.create({
                data: {
                    title: args.title,
                    content: args.content,
                    author: { connect: { id: userId } },
                },
            });
        },
        addComment: async (_parent, args, context) => {
            const userId = getUserId(context);
            return prisma.comment.create({
                data: {
                    content: args.content,
                    author: { connect: { id: userId } },
                    article: { connect: { id: args.articleId } },
                },
            });
        },
        likeArticle: async (_parent, args, context) => {
            const userId = getUserId(context);
            return prisma.like.create({
                data: {
                    user: { connect: { id: userId } },
                    article: { connect: { id: args.articleId } },
                },
            });
        },
    },
    User: {
        articles: (parent) => prisma.article.findMany({ where: { authorId: parent.id } }),
        comments: (parent) => prisma.comment.findMany({ where: { authorId: parent.id } }),
        likes: (parent) => prisma.like.findMany({ where: { userId: parent.id } }),
    },
    Article: {
        author: (parent) => prisma.article.findUnique({ where: { id: parent.id } })
            .author() ?? null, // Utilisez la méthode `author` directement
        comments: (parent) => prisma.comment.findMany({ where: { articleId: parent.id } }),
        likes: (parent) => prisma.like.findMany({ where: { articleId: parent.id } }),
    },
    Comment: {
        author: (parent) => prisma.comment.findUnique({ where: { id: parent.id! } })
            .author() ?? null, // Utilisez la méthode `author` directement
        article: (parent) => prisma.comment.findUnique({ where: { id: parent.id! } })
            .article() ?? null, // Utilisez la méthode `article` directement
    },
    Like: {
        user: (parent) => prisma.like.findUnique({ where: { id: parent.id! } })
            .user() ?? null, // Utilisez la méthode `user` directement
        article: (parent) => prisma.like.findUnique({ where: { id: parent.id! } })
            .article() ?? null, // Utilisez la méthode `article` directement
    },
};



const getUserId = (context: any) => {
    if (!context) throw new Error("Context is required for this operation");
    const Authorization = context.req.get("Authorization");
    if (Authorization) {
        const token = Authorization.replace("Bearer ", "");
        const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
        return userId;

    }
    throw new Error("Not authenticated");
};