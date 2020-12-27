import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { User } from '../App';

import { GRAPHQL_ENDPOINT } from '../config';

interface HomeProps {
  token: string;
  user: User;
}

const Home: React.FC<HomeProps> = ({ token, user }) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    setClient(
      new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: new InMemoryCache(),
      })
    );
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
        <Text>Welcome {user.name}!</Text>
      </View>
    </ApolloProvider>
  );
};

export default Home;
