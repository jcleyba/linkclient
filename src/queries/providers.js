import gql from 'graphql-tag';

export const PROVIDERS_MUTATION = gql`
  mutation ProdiversMutation(
    $cuit: String!
    $name: String!
    $apellido: String!
    $razonSocial: String!
    $email: String!
  ) {
    providers(
      cuit: $cuit
      name: $name
      apellido: $apellido
      razonSocial: $razonSocial
      email: $email
    ) {
      id
    }
  }
`;

export const PROVIDERS_QUERY = gql`
  query ProvidersQuery {
    providers {
      id
      cuit
      name
      razonSocial
      apellido
      email
    }
  }
`;

export const PROVIDER_QUERY = gql`
  query ProviderQuery($id: ID) {
    provider(id: $id) {
      cuit
      name
      razonSocial
      apellido
      email
    }
  }
`;
