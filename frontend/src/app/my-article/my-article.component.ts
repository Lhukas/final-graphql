import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../Services/articles.services";
import {Article} from "../graphql/generated";

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit{


  article?: Article;
  updatedTitle: string =""
  updatedContent: string =""
  articleId: number = 0;

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
        this.updatedTitle = this.article.title
        this.updatedContent = this.article.content
        console.log('Article Data:', this.article); // Affiche les données dans la console
      },
      error => {
        console.error('Error loading article', error);
      }
    );
  }



  save() : void{
    this.articlesService.updateArticle(this.articleId, this.updatedTitle,  this.updatedContent).subscribe(
      (article: Article) => {
        this.article = article;
        alert("Les modifications ont bien été sauvegardées")
        console.log('Article Data:', this.article);
        //location.reload()
      },
      error => {
        console.error('Error loading article', error);
      }
    );
  }





}
