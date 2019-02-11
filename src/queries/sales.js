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
