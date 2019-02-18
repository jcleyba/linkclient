import React from 'react';
import { Query } from 'react-apollo';
import { Segment, Header } from 'semantic-ui-react';
import { Consumer } from '../../app/App';

import CashShiftForm from '../../components/forms/CashShiftForm';

import CashShiftTable from '../../components/tables/CashShiftTable';
import { FEWCASHSHIFTS_QUERY } from '../../queries/cashshifts';

const Cash = props => {
  return (
    <div>
      <h1>Caja</h1>
      <Query query={FEWCASHSHIFTS_QUERY}>
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <Header> Nueva Caja </Header>
              <Segment>
                <Consumer>
                  {({ user }) => (
                    <CashShiftForm user={user} onCompleted={refetch} />
                  )}
                </Consumer>
              </Segment>

              <Segment>
                <CashShiftTable data={data.fewcashshifts || []} />
              </Segment>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default Cash;
