import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription} from "rxjs";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.css']
})
export class ConnexionPageComponent {
  constructor(private authService: AuthService, private router: Router, private apollo: Apollo) {}

  signUpForm = {
    email: '',
    password: ''
  };

  signInForm = {
    email: '',
    password: ''
  };

  togglePanel() {
    const container = document.getElementById('container');
    // @ts-ignore
    container.classList.toggle("right-panel-active");
  }

  onSignUp() {
    this.authService.signUp(this.signUpForm.email, this.signUpForm.password)
      .subscribe(
        ({ data }) => {
          // Réussite de la connexion, gérer la réponse et éventuellement rediriger
          console.log('Inscription réussie:', data);
          // @ts-ignore
          const token = data.signup.token;
          // @ts-ignore
          const id = data?.signup.user.id;

          sessionStorage.setItem('token-user',token);

          sessionStorage.setItem('ID-user', id);


          this.apollo.client.resetStore();

          this.router.navigate(['/dashboard']);

        },
        (error) => {

          alert("L'inscription as échoué");

        }
      );
    // Handle sign up logic here
    console.log('Sign up form data:', this.signUpForm);
  }

  onSignIn() {

    this.authService.login(this.signInForm.email, this.signInForm.password)
      .subscribe(
        ({ data }) => {
          // Réussite de la connexion, gérer la réponse et éventuellement rediriger
          console.log('Connexion réussie:', data);
          // @ts-ignore
          const token = data.login.token; // Vérification optionnelle (?)
          // @ts-ignore
          const id = data?.login.user.id;

          sessionStorage.setItem('token-user',token);


          sessionStorage.setItem('ID-user', id);



            this.apollo.client.resetStore(); // Réinitialiser le cache Apollo

          this.router.navigate(['/dashboard']);

        },
        (error) => {
          // Erreur de connexion, afficher un message d'erreur à l'utilisateur
          alert('Identifiant incorrect');
          //this.error = 'Adresse email ou mot de passe incorrect.';
        }
      );
  }

}
