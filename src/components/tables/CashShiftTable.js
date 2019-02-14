import React from 'react';
import ReactTable from 'react-table';
import { format } from 'date-fns';

const CashShiftTable = props => {
  const columns = [
    {
      Header: 'Inicio',
      accessor: 'shiftStart',
      Cell: cell => (
        <div>
          {format(new Date(cell.original.shiftStart), 'DD/MMM/YYYY HH:mm')}
        </div>
      ),
    },
    {
      Header: 'Cierre',
      accessor: 'createdAt',
      Cell: cell => (
        <div style={{ textAlign: 'center' }}>
          {format(new Date(cell.original.shiftStart), 'DD/MMM/YYYY HH:mm')}
        </div>
      ),
    },
    {
      Header: 'Usuario',
      accessor: 'id_User',
      Cell: cell => (
        <div style={{ textAlign: 'center' }}>{cell.original.id_User}</div>
      ),
    },
    {
      Header: 'Ventas',
      accessor: 'salesSum',
      Cell: cell => <div>{'$' + cell.original.salesSum}</div>,
    },
    {
      Header: 'Caja Inicio',
      accessor: 'sumPrior',
      Cell: cell => <div>{'$' + cell.original.sumPrior}</div>,
    },
    {
      Header: 'Egresos',
      accessor: 'cashOutSum',
      Cell: cell => <div>{'$' + cell.original.cashOutSum}</div>,
    },
    {
      Header: 'Deja en Caja',
      accessor: 'existingAmount',
      Cell: cell => <div>{'$' + cell.original.existingAmount}</div>,
    },
    {
      id: 'result',
      Header: 'Resultado',
      Cell: ({ original }) => {
        const { sumPrior, salesSum, existingAmount, cashOutSum } = original;
        return <div>{existingAmount - sumPrior - (salesSum - cashOutSum)}</div>;
      },
    },
  ];

  return (
    <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
  );
};

export default CashShiftTable;
