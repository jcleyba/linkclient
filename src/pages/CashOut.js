import React from 'react';
import { Segment, Icon, Button, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import CashOutTable from '../components/CashOutTable';
import { CASHOUTS_QUERY } from '../queries/cashouts';

const CashOut = props => {
  const { match } = props;

  const onComplete = () => {
    match.history.push('/cash-out');
  };

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
      <Query query={CASHOUTS_QUERY} fetchPolicy="no-cache">
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Segment>
              <CashOutTable
                data={data.cashouts || []}
                onComplete={onComplete}
              />
            </Segment>
          );
        }}
      </Query>
    </>
  );
};

export default CashOut;
