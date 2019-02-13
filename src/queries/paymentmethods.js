import gql from 'graphql-tag';

export const PAYMENTMETHODS_QUERY = gql`
  query PaymentMethodsQuery {
    paymentmethods {
      id
      description
    }
  }
`;
