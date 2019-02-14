import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CenteredCell } from '../cells/FormatedCell';

export default class ProductsTable extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Codigo',
        accessor: 'codProduct',
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),
        Cell: cell => <CenteredCell value={cell.original.codProduct} />,
      },
      {
        Header: 'Descripción',
        accessor: 'description',
        filterMethod: (filter, row) =>
          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        filterable: false, // Custom value accessors!
        Cell: cell => <CenteredCell value={cell.original.stock} />,
      },
      {
        Header: 'Precio Venta',
        accessor: 'salePrice',
        filterable: false,
        Cell: cell => <CenteredCell value={cell.original.salePrice} />,
      },
      {
        Header: 'Precio Costo',
        accessor: 'costPrice',
        filterable: false,
        Cell: cell => <CenteredCell value={cell.original.costPrice} />,
      },
      {
        id: 'id',
        Header: '',
        filterable: false,
        Cell: props => (
          <div style={{ textAlign: 'center' }}>
            <Button
              as={Link}
              color="green"
              to={`/products/add/${props.original.id}`}
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
