import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri: "http://localhost:4000/graphql" });

  const auth = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token-user');

    console.log('Current Token:', token); // Affiche le token dans la console
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });

  return {
    link: ApolloLink.from([auth, http]),
    cache: new InMemoryCache(),
  };
}
