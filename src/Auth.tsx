import React from 'react';
import { Alert, Button } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import jwtDecoder from 'jwt-decode';
import queryString from 'query-string';

import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  ID_TOKEN_KEY,
  NONCE_KEY,
} from '../config';
import jwtDecode from 'jwt-decode';

interface Token {
  nonce: string;
  sub: string;
  email: string;
  name: string;
  exp: string;
}

const generateNonce = async () => {
  const nonce = String.fromCharCode.apply(
    null,
    Array.from(await Random.getRandomBytesAsync(16))
  );
  await SecureStore.setItemAsync(NONCE_KEY, nonce);
  return nonce;
};

interface AuthProps {
  token: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Auth: React.FC<AuthProps> = ({ token, onLogin, onLogout }) => {
  const decodeToken = (token: string) => {
    const decodedToken = jwtDecoder<Token>(token);
    const { nonce, sub, name, exp } = decodedToken;

    SecureStore.getItemAsync(NONCE_KEY).then((storedNonce) => {
      if (nonce === storedNonce) {
        SecureStore.setItemAsync(
          ID_TOKEN_KEY,
          JSON.stringify({
            id: sub,
            name,
            exp,
            token,
          })
        ).then(() => onLogin());
      } else {
        Alert.alert('Error', "Nonces don't match");
        return;
      }
    });
  };

  const handleLoginPress = async () => {
    const nonce = await generateNonce();
    AuthSession.startAsync({
      authUrl:
        `${AUTH_DOMAIN}/authorize?` +
        queryString.stringify({
          client_id: AUTH_CLIENT_ID,
          response_type: 'id_token',
          scope: 'openid profile email',
          redirect_uri: AuthSession.getRedirectUrl(),
          nonce,
        }),
    }).then((result) => {
      console.log(result);
      if (result.type === 'success') {
        decodeToken(result.params.id_token);
      } else if (result.type === 'error' && result.params.error) {
        Alert.alert(
          'Error',
          result.params.error_description ||
            'Something went wrong while logging in'
        );
      }
    });
  };

  const handleLogoutPress = async () => {
    SecureStore.deleteItemAsync(ID_TOKEN_KEY).then(onLogout);
  };

  return token ? (
    <Button title="Logout" onPress={handleLogoutPress}></Button>
  ) : (
    <Button title="Login" onPress={handleLoginPress}></Button>
  );
};

export default Auth;
