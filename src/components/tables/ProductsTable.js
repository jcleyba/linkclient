import React, { useState, useRef } from 'react';
import ReactTable from 'react-table';
import selectTableHOC from 'react-table/lib/hoc/selectTable';

import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CenteredCell } from '../cells/FormatedCell';

const SelectTable = selectTableHOC(ReactTable);

function ProductsTable(props) {
  const [selection, setSelection] = useState([]);
  const [selectAll, setSelectall] = useState(false);
  const tableEl = useRef(null);

  const toggleSelection = (key, shift, row) => {
    let selectionLocal = [...selection];
    const keyIndex = selection.findIndex(item => item.id === key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selectionLocal = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1),
      ];
    } else {
      // it does not exist so add it
      selectionLocal.push(row);
    }
    // update the state
    setSelection(selectionLocal);
    props.updateSelection(selectionLocal);
  };

  const toggleAll = () => {
    const selectAllLocal = selectAll ? false : true;
    const selection = [];
    if (selectAllLocal) {
      const wrappedInstance = tableEl.current.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        if (item._original) {
          selection.push(item._original);
        }
      });
    }
    setSelectall(selectAllLocal);
    setSelection(selection);
    props.updateSelection(selection);
  };

  const isSelected = key => selection.some(item => item.id === key);

  const columns = [
    {
      id: 'codProduct',
      Header: 'Codigo',
      accessor: 'codProduct',
      filterMethod: (filter, row) =>
        row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),
      Cell: cell => <CenteredCell value={cell.original.codProduct} />,
    },
    {
      id: 'description',
      Header: 'Descripción',
      accessor: 'description',
      filterMethod: (filter, row) =>
        row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    },
    {
      id: 'stock',
      Header: 'Stock',
      accessor: 'stock',
      filterable: false, // Custom value accessors!
      Cell: cell => <CenteredCell value={cell.original.stock} />,
    },
    {
      id: 'salePrice',
      Header: 'Precio Venta',
      accessor: 'salePrice',
      filterable: false,
      Cell: cell => <CenteredCell value={cell.original.salePrice} />,
    },
    {
      id: 'costPrice',
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
        <div>
          <Button as={Link} primary to={`/products/${props.original.id}/sales`}>
            Ventas
          </Button>
          <Button
            as={Link}
            color="teal"
            to={`/products/add/${props.original.id}`}
          >
            Editar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {` (${selection.length}) Productos seleccionados`}
      <SelectTable
        filterable
        ref={tableEl}
        defaultPageSize={10}
        data={props.data}
        columns={columns}
        selectType="checkbox"
        keyField="id"
        toggleAll={toggleAll}
        toggleSelection={toggleSelection}
        isSelected={isSelected}
        getTrProps={(state, rowInfo, column, instance) => {
          return {
            style: {
              // Setting opacity to row if product is not available
              opacity: rowInfo && rowInfo.original.available ? 1 : 0.3,
            },
          };
        }}
      />
    </>
  );
}

export default ProductsTable;
