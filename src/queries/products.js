import gql from 'graphql-tag';

export const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      id
      codProduct
      description
      stock
      price
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID) {
    product(id: $id) {
      id
      codProduct
      description
      stock
      price
      id_ProductType
      id_Provider
    }
  }
`;

export const PRODUCTS_MUTATION = gql`
  mutation ProductsMutation(
    $codProduct: String!
    $description: String!
    $id_ProductType: Int!
    $id_Provider: Int!
    $stock: Float!
    $minimumStock: Float!
    $price: Float!
  ) {
    products(
      codProduct: $codProduct
      description: $description
      id_ProductType: $id_ProductType
      id_Provider: $id_Provider
      stock: $stock
      minimumStock: $minimumStock
      price: $price
    ) {
      id
    }
  }
`;
