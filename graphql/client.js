// Path: graphql\client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = (accessToken) =>
  new ApolloClient({
    uri: 'https://api.us-east-2.propeldata.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Content-Type': 'application/json',
    },
  });

export default client;
