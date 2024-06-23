import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ArticleComponent } from './article/article.component';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { createApollo } from './apollo.config';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { MyArticleComponent } from './my-article/my-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnexionPageComponent,
    DasboardComponent,
    NavComponent,
    ArticleComponent,
    CreateArticleComponent,
    MyArticlesComponent,
    MyArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => createApollo(httpLink),
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
