import React from 'react';
import ReactTable from 'react-table';

const CashShiftTable = props => {
  const columns = [
    {
      Header: 'Inicio',
      accessor: 'shiftStart',
    },
    {
      Header: 'Cierre',
      accessor: 'createdAt',
    },
    {
      Header: 'Usuario',
      accessor: 'id_User',
    },
    {
      Header: 'Ventas',
      accessor: 'salesSum',
    },
    {
      Header: 'Caja Inicio',
      accessor: 'sumPrior',
    },
    {
      Header: 'Egresos',
      accessor: 'cashOutSum',
    },
    {
      Header: 'Deja en Caja',
      accessor: 'existingAmount',
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
