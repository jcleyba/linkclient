import React from 'react';
import { Query } from 'react-apollo';
import { Header, Segment } from 'semantic-ui-react';

import SaleTable from '../../components/tables/SaleTable';
import { SALES_QUERY } from '../../queries/sales';

class SalesReports extends React.Component {
  render() {
    return (
      <>
        <Header as="h1">Reporte de Ventas</Header>
        <Query query={SALES_QUERY} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Segment>
                <SaleTable data={data.sales || []} />
              </Segment>
            );
          }}
        </Query>
      </>
    );
  }
}

export default SalesReports;
