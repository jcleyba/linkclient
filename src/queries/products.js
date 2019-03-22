import gql from 'graphql-tag';

export const PRODUCTS_QUERY = gql`
  query ProductsQuery($id: ID) {
    products(id: $id) {
      id
      codProduct
      description
      stock
      salePrice
      costPrice
      available
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
      id_ProductType
      id_Provider
      salePrice
      costPrice
      available
    }
  }
`;

export const SEARCH_QUERY = gql`
  query ProductQuery($term: String) {
    search(term: $term) {
      id
      codProduct
      description
      stock
      id_ProductType
      id_Provider
      salePrice
      costPrice
    }
  }
`;

export const PRODUCTS_BULK_MUTATION = gql`
  mutation ProductsBulkMutation($prods: [ProductInput]!) {
    productsbulkupdate(prods: $prods){
      id
    }
  }
`;

export const PRODUCTS_MUTATION = gql`
  mutation ProductsMutation(
    $id: ID
    $codProduct: String!
    $description: String!
    $id_ProductType: Int!
    $id_Provider: Int!
    $stock: Float!
    $minimumStock: Float
    $salePrice: Float!
    $costPrice: Float!
    $available: Boolean
  ) {
    products(
      id: $id
      codProduct: $codProduct
      description: $description
      id_ProductType: $id_ProductType
      id_Provider: $id_Provider
      stock: $stock
      minimumStock: $minimumStock
      salePrice: $salePrice
      costPrice: $costPrice
      available: $available
    ) {
      id
    }
  }
`;
