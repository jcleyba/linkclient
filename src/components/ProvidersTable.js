import React from 'react';
import ReactTable from 'react-table';

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
    ];

    return <ReactTable data={this.props.data} columns={columns} />;
  }
}
