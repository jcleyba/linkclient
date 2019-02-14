import React from 'react';
import ReactTable from 'react-table';
import { Button, Segment } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { DateFormatCell, MoneyCell } from '../cells/FormatedCell';

import { Consumer } from '../../app/App';
import { CASHOUTS_DELETE } from '../../queries/cashouts';
import { ROLES, ADMIN } from '../../constants';

const renderTable = props => {
  const columns = [
    {
      Header: 'Fecha',
      accessor: 'updatedAt',
      Cell: cell => <DateFormatCell value={cell.original.updatedAt} />,
    },
    {
      Header: 'Concepto',
      accessor: 'description',
    },
    {
      Header: 'Monto',
      accessor: 'amount', // Custom value accessors!
      Cell: cell => <MoneyCell value={cell.original.amount} />,
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
    <Segment>
      <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
    </Segment>
  );
};

const isAdmin = user => {
  return user && ROLES[user.id_UserType] === ADMIN;
};

const CashOutTable = props => {
  return (
    <Consumer>
      {({ user }) => {
        if (isAdmin(user)) return renderTable(props);
      }}
    </Consumer>
  );
};

export default CashOutTable;
