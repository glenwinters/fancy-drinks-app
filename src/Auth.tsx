import React from 'react';
import { Button } from 'react-native';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => (
  <Button title="Login" onPress={onLogin}></Button>
);

export default Auth;
