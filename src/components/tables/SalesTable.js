import React from 'react';
import ReactTable from 'react-table';
import { CenteredCell, DateFormatCell, MoneyCell } from '../cells/FormatedCell';

const SaleTable = props => {
  const columns = [
    {
      Header: 'Fecha',
      accessor: 'createdAt',
      Cell: cell => <DateFormatCell value={cell.original.createdAt} />,
    },
    {
      Header: 'Forma de Pago',
      accesor: 'id_PaymentMethod',
      Cell: cell => (
        <CenteredCell value={cell.original.paymentMethod.description} />
      ),
    },
    {
      Header: 'N. Factura',
      accessor: 'number',
      Cell: cell => <CenteredCell value={cell.original.number} />,
    },
    {
      Header: 'Tipo',
      accessor: 'type',
      Cell: cell => <CenteredCell value={cell.original.type} />,
    },
    {
      Header: 'Monto',
      accessor: 'amount',
      Cell: cell => <MoneyCell value={cell.original.amount} />,
    },
    {
      Header: 'Vendedor',
      accessor: 'id_User',
      Cell: cell => <CenteredCell value={cell.original.user.username} />,
    },
  ];

  return (
    <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
  );
};

export default SaleTable;
