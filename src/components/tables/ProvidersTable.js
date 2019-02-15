import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CenteredCell } from '../cells/FormatedCell';

export default class ProvidersTable extends React.Component {
  render() {
    const columns = [
      {
        Header: 'CUIT',
        accessor: 'cuit',
        filterable: false,
      },
      {
        Header: 'Nombre',
        accessor: 'name',
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
      },
      {
        Header: 'Apellido',
        accessor: 'apellido',
        filterable: false,
      },
      {
        Header: 'Razon Social',
        accessor: 'razonSocial',
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
        Cell: cell => <CenteredCell value={cell.original.razonSocial} />,
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: false,
      },
      {
        Header: 'Teléfono 1',
        accessor: 'phoneNumber1',
        filterable: false,
      },
      {
        id: 'id',
        Header: 'Acciones',
        minWidth: 120,
        filterable: false,

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
        filterable
        defaultPageSize={10}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}
