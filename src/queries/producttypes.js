import gql from 'graphql-tag';

export const PRODUCTTYPES_QUERY = gql`
  query ProductTypesQuery {
    producttypes {
      id
      description
    }
  }
`;
