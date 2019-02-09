import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default class ProductsTable extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Codigo',
        accessor: 'codProduct',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Stock',
        accessor: 'stock', // Custom value accessors!
      },
      {
        Header: 'Precio Venta',
        accessor: 'salePrice',
      },
      {
        Header: 'Precio Costo',
        accessor: 'costPrice',
      },
      {
        id: 'id',
        Header: '',
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
        defaultPageSize={10}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}
