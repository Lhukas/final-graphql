import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Apollo} from "apollo-angular";
import {ArticlesService} from "../Services/articles.services";
import {Article} from "../graphql/generated";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {

  articleDetails = {
    title: '',
    content: ''
  };


  constructor(private articleService : ArticlesService, private router: Router) {}



  publishArticle() {

    this.articleService.createArticle(this.articleDetails.title,this.articleDetails.content)
      .subscribe(
        ( article: Article ) => {

          alert('Article publié');
          location.reload()


          this.router.navigate(['/article', article.id]);

        },
        (error) => {
          // Erreur de connexion, afficher un message d'erreur à l'utilisateur
          alert('Identifiant incorrect');
          //this.error = 'Adresse email ou mot de passe incorrect.';
        }
      );
  }

}
