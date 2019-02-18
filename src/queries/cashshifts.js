import gql from 'graphql-tag';

export const CASHSHIFTS_QUERY = gql`
  query CashShiftsQuery($id: ID) {
    cashshifts(id: $id) {
      id
      existingAmount
      salesSum
      cashOutSum
      id_User
      observation
      createdAt
      sumPrior
      shiftStart
    }
  }
`;

export const FEWCASHSHIFTS_QUERY = gql`
  query FewCashShiftsQuery($id: ID) {
    fewcashshifts(id: $id) {
      id
      existingAmount
      salesSum
      cashOutSum
      id_User
      observation
      createdAt
      sumPrior
      shiftStart
    }
  }
`;

export const CASHSHIFTS_MUTATION = gql`
  mutation CashShiftsMutation(
    $id: ID
    $existingAmount: Float!
    $salesSum: Float
    $cashOutSum: Float
    $id_User: Int!
    $observation: String
  ) {
    cashshift(
      id: $id
      existingAmount: $existingAmount
      salesSum: $salesSum
      cashOutSum: $cashOutSum
      id_User: $id_User
      observation: $observation
    ) {
      id
    }
  }
`;
