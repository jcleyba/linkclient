import React from 'react';
import { Query } from 'react-apollo';
import { Segment } from 'semantic-ui-react';

import CashOutTable from '../../components/tables/CashShiftTable';
import { CASHSHIFTS_QUERY } from '../../queries/cashshifts';


const Cash = props => {
  return (
    <div>
      <h1>Caja</h1>{' '}
      <Query query={CASHSHIFTS_QUERY}>
        {({ loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          console.log(data.cashshifts);
          return (
            <Segment>
              <CashOutTable
                data={data.cashshifts || []}
              />
            </Segment>
          );
        }}
      </Query>
      ;
    </div>
  );
};

export default Cash;
