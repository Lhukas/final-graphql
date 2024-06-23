import {ChangeDetectorRef, Component, OnInit, SimpleChanges} from '@angular/core';
import {ArticlesService} from "../Services/articles.services";
import {Router} from "@angular/router";
import {Article} from "../graphql/generated";

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private router: Router) { }

  ngOnInit(): void {
    this.loadArticles();
  }


  articles?: Article[];


  loadArticles(): void {


    let idUser : number = Number(sessionStorage.getItem('ID-user'));

    console.log(idUser)


    this.articleService.getArticlesByUserId(idUser).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      error => {
        console.error('Error loading articles', error);
      }
    );
  }


  async removeArticle(articleId: number): Promise<void> {
    try {
      await this.articleService.deleteArticle(articleId).toPromise();
      location.reload()
      await this.loadArticles();
    } catch (error) {
    }
  }
  navigateToArticleDetail(articleId: number): void {
    this.router.navigate(['/myArticles', articleId]);
  }


}
