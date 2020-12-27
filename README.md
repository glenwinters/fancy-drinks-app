# fancy-drinks-app

Fancy Drinks, an app about cocktails

## Development

### Setup

```
npm install expo-cli --global
yarn
```

Copy `config.ts.example` to `config.ts` and fill in the variables.

### Run locally

```
yarn start
```

Note: I've had to use the tunneling option to test on my phone because there
seems to be a port forwarding issue with the LAN option, though it's probably
because I'm using VS Code Remote Containers, which adds a layer of forwarding.

### Config

| Variable         | Description                                 |
| ---------------- | ------------------------------------------- |
| AUTH_CLIENT_ID   | Auth0 client ID                             |
| AUTH_DOMAIN      | Auth0 domain                                |
| ID_TOKEN_KEY     | SecureStore key for the ID token            |
| NONCE_KEY        | SecureStore key for the nonce               |
| GRAPHQL_ENDPOINT | URL for the GraphQL API                     |
| AUTH_NAMESPACE   | Auth0 JWT namespace for additional metadata |

## Resources

* [Expo docs](https://docs.expo.io/)
* [Hasura docs](https://hasura.io/docs/1.0/graphql/core/index.html)
* [Auth0 docs](https://auth0.com/docs/)
* [Apollo Client docs](https://www.apollographql.com/docs/react/)
* [Udemy course on Hasura, Auth0 and Apollo client](https://www.udemy.com/course/how-to-make-a-full-stack-react-native-app-with-easy-backend/)
