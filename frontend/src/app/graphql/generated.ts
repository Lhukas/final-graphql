import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  title: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  article?: Maybe<Article>;
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Like = {
  __typename?: 'Like';
  article?: Maybe<Article>;
  id: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  createArticle?: Maybe<Article>;
  deleteArticle?: Maybe<Article>;
  likeArticle?: Maybe<Like>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  updateArticle?: Maybe<Article>;
};


export type MutationAddCommentArgs = {
  articleId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLikeArticleArgs = {
  articleId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  articlesByUser?: Maybe<Array<Maybe<Article>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryArticleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryArticlesByUserArgs = {
  userId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Maybe<Article>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
};

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetArticleByIdQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, title: string, content: string, author?: { __typename?: 'User', id: number, email: string } | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, author?: { __typename?: 'User', id: number, email: string } | null } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } | null };

export type GetArticlesWithDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesWithDetailsQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', id: number, title: string, content: string, author?: { __typename?: 'User', id: number, email: string } | null, comments?: Array<{ __typename?: 'Comment', id: number } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } | null> | null };

export type AddCommentMutationVariables = Exact<{
  articleId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: { __typename?: 'Comment', id: number, content: string, author?: { __typename?: 'User', id: number, email: string } | null, article?: { __typename?: 'Article', id: number } | null } | null };

export type AddLikeMutationVariables = Exact<{
  articleId: Scalars['Int']['input'];
}>;


export type AddLikeMutation = { __typename?: 'Mutation', likeArticle?: { __typename?: 'Like', id: number } | null };

export type CreateArticleMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'Article', id: number, title: string, content: string, author?: { __typename?: 'User', id: number, email: string } | null } | null };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: { __typename?: 'Article', id: number, title: string, content: string, author?: { __typename?: 'User', id: number, email: string } | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, author?: { __typename?: 'User', id: number, email: string } | null } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } | null };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle?: { __typename?: 'Article', id: number } | null };

export type GetArticlesByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetArticlesByUserIdQuery = { __typename?: 'Query', articlesByUser?: Array<{ __typename?: 'Article', id: number, title: string, content: string, author?: { __typename?: 'User', id: number, email: string } | null, comments?: Array<{ __typename?: 'Comment', id: number } | null> | null, likes?: Array<{ __typename?: 'Like', id: number } | null> | null } | null> | null };

export const GetArticleByIdDocument = gql`
    query GetArticleById($id: Int!) {
  article(id: $id) {
    id
    title
    content
    author {
      id
      email
    }
    comments {
      id
      content
      author {
        id
        email
      }
    }
    likes {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleByIdGQL extends Apollo.Query<GetArticleByIdQuery, GetArticleByIdQueryVariables> {
    document = GetArticleByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetArticlesWithDetailsDocument = gql`
    query GetArticlesWithDetails {
  articles {
    id
    title
    content
    author {
      id
      email
    }
    comments {
      id
    }
    likes {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticlesWithDetailsGQL extends Apollo.Query<GetArticlesWithDetailsQuery, GetArticlesWithDetailsQueryVariables> {
    document = GetArticlesWithDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddCommentDocument = gql`
    mutation AddComment($articleId: Int!, $content: String!) {
  addComment(articleId: $articleId, content: $content) {
    id
    content
    author {
      id
      email
    }
    article {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddCommentGQL extends Apollo.Mutation<AddCommentMutation, AddCommentMutationVariables> {
    document = AddCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddLikeDocument = gql`
    mutation AddLike($articleId: Int!) {
  likeArticle(articleId: $articleId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddLikeGQL extends Apollo.Mutation<AddLikeMutation, AddLikeMutationVariables> {
    document = AddLikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateArticleDocument = gql`
    mutation CreateArticle($title: String!, $content: String!) {
  createArticle(title: $title, content: $content) {
    id
    title
    content
    author {
      id
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateArticleGQL extends Apollo.Mutation<CreateArticleMutation, CreateArticleMutationVariables> {
    document = CreateArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: Int!, $title: String!, $content: String!) {
  updateArticle(id: $id, title: $title, content: $content) {
    id
    title
    content
    author {
      id
      email
    }
    comments {
      id
      content
      author {
        id
        email
      }
    }
    likes {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateArticleGQL extends Apollo.Mutation<UpdateArticleMutation, UpdateArticleMutationVariables> {
    document = UpdateArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Int!) {
  deleteArticle(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteArticleGQL extends Apollo.Mutation<DeleteArticleMutation, DeleteArticleMutationVariables> {
    document = DeleteArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetArticlesByUserIdDocument = gql`
    query GetArticlesByUserId($userId: Int!) {
  articlesByUser(userId: $userId) {
    id
    title
    content
    author {
      id
      email
    }
    comments {
      id
    }
    likes {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticlesByUserIdGQL extends Apollo.Query<GetArticlesByUserIdQuery, GetArticlesByUserIdQueryVariables> {
    document = GetArticlesByUserIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }