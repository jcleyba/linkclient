import React from 'react';
import ReactTable from 'react-table';

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
        Header: 'Precio',
        accessor: 'price',
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
