import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Article, Comment, DeleteArticleGQL, GetArticlesByUserIdGQL, Like, UpdateArticleGQL} from '../graphql/generated';
import { GetArticleByIdGQL, GetArticlesWithDetailsGQL, AddCommentGQL, AddLikeGQL, CreateArticleGQL } from '../graphql/generated';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private apollo: Apollo,
    private getArticleByIdGQL: GetArticleByIdGQL,
    private getArticlesWithDetailsGQL: GetArticlesWithDetailsGQL,
    private addCommentGQL: AddCommentGQL,
    private addLikeGQL: AddLikeGQL,
    private createArticleGQL: CreateArticleGQL,
    private updateArticleGQL: UpdateArticleGQL,
    private deleteArticleGQL: DeleteArticleGQL,
    private getArticlesByUserIdGQL: GetArticlesByUserIdGQL
  ) { }


  // Méthode pour récupérer la liste des articles avec les détails nécessaires
  getArticlesWithDetails(): Observable<Article[]> {
    return this.getArticlesWithDetailsGQL.watch().valueChanges.pipe(
      map(result => result.data.articles as Article[]) // Transformez le résultat pour ne retourner que les articles
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.getArticleByIdGQL.watch({ id }).valueChanges.pipe(
      map(result => result.data.article as Article) // Transformez le résultat pour ne retourner que l'article
    );
  }

  addComment(articleId: number, content: string): Observable<Comment> {
    return this.addCommentGQL.mutate({ articleId, content }).pipe(
      map(result => result.data!.addComment as Comment)
    );
  }

  // Méthode pour ajouter un like
  addLike(articleId: number): Observable<Like> {
    return this.addLikeGQL.mutate({ articleId }).pipe(
      map(result => result.data!.likeArticle as Like)
    );
  }

  // Méthode pour ajouter un article
  createArticle(title: string, content: string): Observable<Article> {
    return this.createArticleGQL.mutate({ title, content }).pipe(
      map(result => result.data!.createArticle as Article)
    );
  }

  // Méthode pour mettre à jour un article
  updateArticle(id: number, title: string, content: string): Observable<Article> {
    return this.updateArticleGQL.mutate({ id, title, content }).pipe(
      map(result => result.data!.updateArticle as Article)
    );
  }

  // Méthode pour supprimer un article
  deleteArticle(id: number): Observable<number> {
    return this.deleteArticleGQL.mutate({ id }).pipe(
      // @ts-ignore
      map(result => result.data!.deleteArticle.id)
    );
  }

  // Méthode pour récupérer les articles d'un utilisateur
  getArticlesByUserId(userId: number): Observable<Article[]> {
    return this.getArticlesByUserIdGQL.watch({ userId }).valueChanges.pipe(
      map(result => result.data.articlesByUser as Article[])
    );
  }



}
