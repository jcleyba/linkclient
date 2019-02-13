import React from 'react';
import { Icon, Button, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import CashOutTable from '../../components/tables/CashOutTable';
import { CASHOUTS_QUERY } from '../../queries/cashouts';

const CashOut = props => {
  const { match } = props;

  return (
    <>
      <Header as="h1">Egresos</Header>
      <Button
        icon
        primary
        labelPosition="left"
        as={Link}
        to={`${match.path}/add`}
      >
        <Icon name="add" />
        Nuevo
      </Button>
      <Query query={CASHOUTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <CashOutTable
              data={data.cashouts || []}
              onDelete={() => refetch()}
            />
          );
        }}
      </Query>
    </>
  );
};

export default CashOut;
