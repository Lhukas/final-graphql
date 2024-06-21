import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../Services/articles.services";
import {Router} from "@angular/router";
import {Article} from "../graphql/generated";



@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {



  constructor(private articleService: ArticlesService, private router: Router) { }

  displayedColumns: string[] = ['title', 'content', 'author', 'comments', 'likes', 'details'];

  ngOnInit(): void {
    this.loadArticles();
  }

  articles?: Article[];


  loadArticles(): void {
    this.articleService.getArticlesWithDetails().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        console.log('Articles Data:', this.articles); // Affiche les données dans la console
      },
      error => {
        console.error('Error loading articles', error);
      }
    );
  }

  navigateToArticleDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

}
