import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {ConnexionPageComponent} from "./connexion-page/connexion-page.component";
import {DasboardComponent} from "./dasboard/dasboard.component";
import {ArticleComponent} from "./article/article.component";
import {CreateArticleComponent} from "./create-article/create-article.component";
import {MyArticlesComponent} from "./my-articles/my-articles.component";
import {MyArticleComponent} from "./my-article/my-article.component";



const routes: Routes = [
  { path: '', component : ConnexionPageComponent },
  { path: 'dashboard', component : DasboardComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'newArticle', component: CreateArticleComponent },
  { path: 'myArticles', component: MyArticlesComponent },
  { path: 'myArticles/:id', component: MyArticleComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
