import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import { Segment, Header } from 'semantic-ui-react';
import { Context } from '../../app/App';

import CashShiftForm from '../../components/forms/CashShiftForm';

import CashShiftTable from '../../components/tables/CashShiftTable';
import { FEWCASHSHIFTS_QUERY } from '../../queries/cashshifts';
import { isAdmin } from '../../utils';

const Cash = props => {
  const { user } = useContext(Context);

  const renderTable = data => {
    if (!isAdmin(user)) {
      return null;
    }
    return (
      <Segment>
        <CashShiftTable data={data.fewcashshifts || []} />
      </Segment>
    );
  };

  return (
    <>
      <h1>Caja</h1>
      <Query query={FEWCASHSHIFTS_QUERY}>
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <Header> Nueva Caja </Header>
              <Segment>
                <CashShiftForm user={user} onCompleted={refetch} />
              </Segment>
              {renderTable(data)}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Cash;
