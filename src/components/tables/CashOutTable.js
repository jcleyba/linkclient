import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { format } from 'date-fns';

import { CASHOUTS_DELETE } from '../../queries/cashouts';

const CashOutTable = props => {
  const columns = [
    {
      Header: 'Fecha',
      accessor: 'updatedAt',
      Cell: cell => (
        <div>
          {format(new Date(cell.original.updatedAt), 'DD/MMM/YYYY HH:mm')}
        </div>
      ),
    },
    {
      Header: 'Concepto',
      accessor: 'description',
    },
    {
      Header: 'Monto',
      accessor: 'amount', // Custom value accessors!
    },
    {
      Header: 'Usuario',
      accessor: 'user.username',
    },
    {
      id: 'id',
      Header: 'Acciones',
      Cell: cell => (
        <div style={{ textAlign: 'center' }}>
          <Mutation
            mutation={CASHOUTS_DELETE}
            variables={{ id: cell.original.id }}
            onCompleted={props.onDelete}
          >
            {(deletecashout, { loading, error }) => {
              return (
                <Button color="red" onClick={deletecashout} loading={loading}>
                  Eliminar
                </Button>
              );
            }}
          </Mutation>
        </div>
      ),
    },
  ];

  return (
    <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
  );
};

export default CashOutTable;
