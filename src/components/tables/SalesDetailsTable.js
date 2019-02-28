import React from 'react';
import ReactTable from 'react-table';
import { CenteredCell, DateFormatCell, MoneyCell } from '../cells/FormatedCell';

const SalesDetailTable = props => {
  const columns = [
    {
      Header: 'Fecha',
      accessor: 'createdAt',
      Cell: cell => <DateFormatCell value={cell.original.createdAt} />,
    },
    {
      id: 'sale',
      Header: 'Factura',
      Cell: ({ original }) => (
        <CenteredCell value={`${original.saleNumber} - ${original.type}`} />
      ),
    },
    {
      Header: 'Código',
      accessor: 'codProduct',
      Cell: cell => <CenteredCell value={cell.original.product.codProduct} />,
    },
    {
      Header: 'Producto',
      accessor: 'product.description',
    },
    {
      Header: 'Precio',
      accessor: 'price',
      Cell: cell => <CenteredCell><MoneyCell value={cell.original.price} /></CenteredCell>,
    },
    {
      Header: 'Cantidad',
      accessor: 'quantity',
      Cell: cell => <CenteredCell value={cell.original.quantity} />,
    },
  ];

  return (
    <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
  );
};

export default SalesDetailTable;
