import gql from 'graphql-tag';

export const GET_COCKTAILS = gql`
  {
    cocktails {
      id
      name
    }
  }
`;
