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
    name: '',
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

          sessionStorage.setItem('token-user',token);


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
