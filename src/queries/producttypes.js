import gql from 'graphql-tag';

export const PRODUCTTYPES_QUERY = gql`
  query ProductTypesQuery {
    producttypes {
      id
      description
    }
  }
`;

export const PRODUCTTYPES_MUTATION = gql`
  mutation ProductTypesMutation($description: String!) {
    producttypes(description: $description) {
      description
    }
  }
`;
