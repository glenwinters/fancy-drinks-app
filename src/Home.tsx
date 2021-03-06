import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { User } from '../App';

import { GRAPHQL_ENDPOINT } from '../config';
import { CREATE_USER } from '../data/mutations';
import CocktailList from './CocktailList';

interface HomeProps {
  token: string;
  user: User;
}

const Home: React.FC<HomeProps> = ({ token, user }) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const { id, name, isNewUser } = user;
    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: new InMemoryCache(),
    });

    if (isNewUser) {
      client.mutate({
        mutation: CREATE_USER,
        variables: { id, name },
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <View>
        <CocktailList />
      </View>
    </ApolloProvider>
  );
};

export default Home;
