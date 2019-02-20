import gql from 'graphql-tag';

export const SALES_MUTATION = gql`
  mutation SalesMutation(
    $type: String!
    $amount: Float!
    $id_User: Int!
    $details: [ProductDetail]!
    $id_PaymentMethod: Int!
  ) {
    sales(
      type: $type
      amount: $amount
      id_User: $id_User
      details: $details
      id_PaymentMethod: $id_PaymentMethod
    )
  }
`;

export const SALES_QUERY = gql`
  query SalesQuery {
    sales {
      number
      type
      amount
      user {
        username
      }
      paymentMethod {
        description
      }
      createdAt
    }
  }
`;

export const SALESBYRANGE_QUERY = gql`
  query SalesByRangeQuery($from: String!, $to: String!) {
    salesbyrange(from: $from, to: $to) {
      sum
      sales {
        number
        type
        amount
        user {
          username
        }
        paymentMethod {
          description
        }
        createdAt
      }
    }
  }
`;
