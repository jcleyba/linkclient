import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import { Header, Segment, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

import SalesTable from '../../components/tables/SalesTable';
import SalesDetailTable from '../../components/tables/SalesDetailsTable';
import { Context } from '../../app/App';

import ErrorMessage from '../../components/ErrorMessage';
import { SALES_QUERY } from '../../queries/sales';
import { SALEDETAILS_QUERY } from '../../queries/salesdetails';
import { isAdmin } from '../../utils';

function SalesReports(props) {
  const { match } = props;
  const { id } = match.params;
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const { user } = useContext(Context);

  const query = id ? SALEDETAILS_QUERY : SALES_QUERY;
  const queryProp = id ? 'saledetails' : 'sales';
  const type = id && match.path.includes('types');

  const handleChangeStart = date => {
    let startDate = date;

    if (isBefore(endDate, startDate)) {
      startDate = startOfDay(endDate);
    }

    setStartDate(startDate);
  };

  const handleChangeEnd = date => {
    let endDate = date;

    if (isAfter(startDate, endDate)) {
      endDate = endOfDay(startDate);
    }

    setEndDate(endDate);
  };
  const renderTable = sales => {
    if (!id) {
      return <SalesTable data={sales || []} />;
    }

    return <SalesDetailTable data={sales || []} />;
  };
  const renderPage = () => {
    if (!isAdmin(user)) {
      return 'Usuario no autorizado';
    }

    return (
      <>
        <Header as="h1">Reporte de Ventas</Header>
        <div>
          <Label size="large">
            Desde:{' '}
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeStart}
              dateFormat="dd/MM/yyyy"
            />
          </Label>
          <Label size="large">
            Hasta:{' '}
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeEnd}
              dateFormat="dd/MM/yyyy"
            />
          </Label>
        </div>
        <Query
          query={query}
          variables={{
            id,
            from: startDate.toISOString(),
            to: endDate.toISOString(),
            type,
          }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return <ErrorMessage error={error} />;

            const trueData = data[queryProp];
            if (!trueData) return 'Error de datos';

            return (
              <>
                <Segment>
                  Total vendido:{' '}
                  <Label size="large" circular>
                    ${trueData.sum || 0}
                  </Label>
                  Cantidad de ventas:{' '}
                  <Label size="large" circular>
                    {trueData.sales.length || 0}
                  </Label>
                </Segment>
                <Segment>{renderTable(trueData.sales)}</Segment>
              </>
            );
          }}
        </Query>
      </>
    );
  };

  return renderPage();
}

export default SalesReports;
