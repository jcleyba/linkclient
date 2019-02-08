import gql from 'graphql-tag';

export const CASHOUTS_QUERY = gql`
  query CashoutsQuery($id: ID) {
    cashouts(id: $id) {
      id
      description
      amount
      id_User
      updatedAt
    }
  }
`;

export const CASHOUT_QUERY = gql`
  query CashoutQuery($id: ID) {
    cashout(id: $id) {
      id
      description
      amount
      id_User
      updatedAt
    }
  }
`;

export const CASHOUTS_MUTATION = gql`
  mutation CashoutsMutation(
    $id: ID
    $description: String!
    $id_User: Int!
    $amount: Float!
  ) {
    cashout(
      id: $id
      description: $description
      id_User: $id_User
      amount: $amount
    ) {
      id
    }
  }
`;

export const CASHOUTS_DELETE = gql`
  mutation CashoutsDelete($id: ID!) {
    removecashout(id: $id) {
      id
    }
  }
`;
