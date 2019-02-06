import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;
export const AUTH_QUERY = gql`
  query AuthQuery {
    auth {
      id
      username
      id_UserType
      token
    }
  }
`;
