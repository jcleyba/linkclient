import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { CASHOUTS_DELETE } from '../queries/cashouts';

export default class CashOutTable extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Fecha',
        accessor: 'updatedAt',
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
        accessor: 'id_User',
      },
      {
        id: 'id',
        Header: 'Acciones',
        Cell: props => (
          <div style={{ textAlign: 'center' }}>
            <Mutation
              mutation={CASHOUTS_DELETE}
              variables={{ id: props.original.id }}
              onCompleted={this.props.onCompleted}
            >
              {(deletecashout, { loading, error }) => {
                return (
                  <Button color="red" onClick={deletecashout}>
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
      <ReactTable
        defaultPageSize={10}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}
