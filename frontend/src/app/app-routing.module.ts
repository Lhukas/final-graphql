import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {ConnexionPageComponent} from "./connexion-page/connexion-page.component";
import {DasboardComponent} from "./dasboard/dasboard.component";
import {ArticleComponent} from "./article/article.component";



const routes: Routes = [
  { path: '', component : ConnexionPageComponent },
  { path: 'dashboard', component : DasboardComponent },
  { path: 'article/:id', component: ArticleComponent } // Chemin dynamique pour l'affichage des détails de l'article

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
