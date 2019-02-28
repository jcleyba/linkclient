import React from 'react';
import ReactTable from 'react-table';
import { CenteredCell, DateFormatCell, MoneyCell } from '../cells/FormatedCell';

const CashShiftTable = props => {
  const columns = [
    {
      Header: 'Inicio',
      accessor: 'shiftStart',
      Cell: cell => <DateFormatCell value={cell.original.shiftStart} />,
    },
    {
      Header: 'Cierre',
      accessor: 'createdAt',
      Cell: cell => <DateFormatCell value={cell.original.createdAt} />,
    },
    {
      Header: 'Usuario',
      accessor: 'id_User',
      Cell: cell => <CenteredCell value={cell.original.user.username} />,
    },
    {
      Header: 'Ventas',
      accessor: 'salesSum',
      Cell: cell => <MoneyCell value={cell.original.salesSum} />,
    },
    {
      Header: 'Caja Inicio',
      accessor: 'sumPrior',
      Cell: cell => <MoneyCell value={cell.original.sumPrior} />,
    },
    {
      Header: 'Egresos',
      accessor: 'cashOutSum',
      Cell: cell => <MoneyCell value={cell.original.cashOutSum} />,
    },
    {
      Header: 'Deja en Caja',
      accessor: 'existingAmount',
      Cell: cell => <MoneyCell value={cell.original.existingAmount} />,
    },
    {
      id: 'result',
      Header: 'Resultado',
      Cell: ({ original }) => {
        const { sumPrior, salesSum, existingAmount, cashOutSum } = original;
        const result = existingAmount - sumPrior - (salesSum - cashOutSum);
        return <div>{Math.round(result * 100) / 100}</div>;
      },
    },
    {
      Header: 'Obs',
      accessor: 'observation',
    },
  ];

  return (
    <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
  );
};

export default CashShiftTable;
