import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/graphql'; // Remplacez par l'URL de votre serveur GraphQL

  constructor(private apollo: Apollo) { }

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              email
            }
          }
        }
      `,
      variables: {
        email,
        password
      }
    });
  }


  signUp(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation signup($email: String!, $password: String!) {
          signup(email: $email, password: $password) {
            token
            user {
              id
              email
            }
          }
        }
      `,
      variables: {
        email,
        password
      }
    });
  }

  logout(): void {

    sessionStorage.removeItem('token-user');

  }

}
