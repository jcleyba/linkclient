import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ProvidersTable extends React.Component {
  render() {
    const columns = [
      {
        Header: 'CUIT',
        accessor: 'cuit',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Apellido',
        accessor: 'apellido',
      },
      {
        Header: 'Razon Social',
        accessor: 'razonSocial',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Teléfono 1',
        accessor: 'phoneNumber1',
      },
      {
        id: 'id',
        Header: 'Acciones',
        minWidth: 120,
        Cell: props => (
          <div>
            <Button
              as={Link}
              primary
              to={`providers/${props.original.id}/products`}
            >
              Catálogo
            </Button>
            <Button
              as={Link}
              color="teal"
              to={`providers/add/${props.original.id}`}
            >
              Editar
            </Button>
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
