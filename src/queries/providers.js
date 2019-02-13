import gql from 'graphql-tag';

export const PROVIDERS_MUTATION = gql`
  mutation ProdiversMutation(
    $id: ID
    $cuit: String!
    $name: String!
    $apellido: String
    $razonSocial: String!
    $email: String
    $phoneNumber1: Float
    $phoneNumber2: Float
  ) {
    providers(
      id: $id
      cuit: $cuit
      name: $name
      apellido: $apellido
      razonSocial: $razonSocial
      email: $email
      phoneNumber1: $phoneNumber1
      phoneNumber2: $phoneNumber2
    ) {
      id
    }
  }
`;

export const PROVIDERS_SELECT_QUERY = gql`
  query ProvidersQuery {
    providers {
      id
      razonSocial
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
      phoneNumber1
      phoneNumber2
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
      phoneNumber1
      phoneNumber2
    }
  }
`;
