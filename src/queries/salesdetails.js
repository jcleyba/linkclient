import gql from 'graphql-tag';

export const SALEDETAILS_QUERY = gql`
  query SaleDetailsQuery(
    $id: ID
    $from: String!
    $to: String!
    $type: Boolean
  ) {
    saledetails(id: $id, from: $from, to: $to, type: $type) {
      sum
      sales {
        saleNumber
        type
        quantity
        price
        createdAt
        product {
          codProduct
          description
        }
      }
    }
  }
`;
