import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import { Header, Segment, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

import SaleTable from '../../components/tables/SaleTable';
import { Context } from '../../app/App';

import ErrorMessage from '../../components/ErrorMessage';
import { SALESBYRANGE_QUERY } from '../../queries/sales';
import { isAdmin } from '../../utils';

function SalesReports(props) {
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const { user } = useContext(Context);

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

  const renderTable = () => {
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
          query={SALESBYRANGE_QUERY}
          variables={{
            from: startDate.toISOString(),
            to: endDate.toISOString(),
          }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return <ErrorMessage error={error} />;
            if (!data.salesbyrange) return 'Error';

            return (
              <>
                <Segment>
                  Total vendido:{' '}
                  <Label size="large" circular>
                    ${data.salesbyrange.sum || 0}
                  </Label>
                  Cantidad de ventas:{' '}
                  <Label size="large" circular>
                    {data.salesbyrange.sales.length || 0}
                  </Label>
                </Segment>
                <Segment>
                  <SaleTable data={data.salesbyrange.sales || []} />
                </Segment>
              </>
            );
          }}
        </Query>
      </>
    );
  };

  return renderTable();
}

export default SalesReports;
