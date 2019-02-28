import gql from 'graphql-tag';

export const SALEDETAILS_QUERY = gql`
  query SaleDetailsQuery($id: ID, $from: String!, $to: String!) {
    saledetails(id: $id, from: $from, to: $to) {
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
