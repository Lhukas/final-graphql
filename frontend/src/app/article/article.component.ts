import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../Services/articles.services'; // Assurez-vous que le chemin est correct
import { Article } from "../graphql/generated";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article?: Article;
  articleId: number = 0;
  newComment: string = '';
  isLiked: boolean = false; // Ajoutez ceci si vous voulez suivre l'état du like

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.articleId = +params.get('id'); // Le + convertit la chaîne en nombre
      this.loadArticle();
    });
  }

  loadArticle(): void {
    this.articlesService.getArticleById(this.articleId).subscribe(
      (article: Article) => {
        this.article = article;
        console.log('Article Data:', this.article); // Affiche les données dans la console
      },
      error => {
        console.error('Error loading article', error);
      }
    );
  }

  addLike(): void {
    this.articlesService.addLike(this.articleId).subscribe(
      () => {
        this.isLiked = true;
        this.loadArticle();
      },
      error => {
        console.error('Error adding like', error);
      }
    );
  }

  addComment(): void {
    if (this.newComment.trim() === '') return;

    this.articlesService.addComment(this.articleId, this.newComment).subscribe(
      () => {
        this.newComment = '';
        this.loadArticle();
      },
      error => {
        console.error('Error adding comment', error);
      }
    );
  }
}
