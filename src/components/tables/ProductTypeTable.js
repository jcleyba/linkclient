import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import { Segment, Button } from 'semantic-ui-react';
import { CenteredCell } from '../cells/FormatedCell';

const renderTable = props => {
  const columns = [
    {
      Header: 'Nombre',
      accessor: 'description',
      Cell: cell => <CenteredCell value={cell.original.description} />,
    },
    {
      id: 'id',
      Header: '',
      filterable: false,
      Cell: props => (
        <div style={{ textAlign: 'center' }}>
          <Button
            as={Link}
            primary
            to={`/product-types/${props.original.id}/sales`}
          >
            Ventas
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Segment>
      <ReactTable defaultPageSize={10} data={props.data} columns={columns} />
    </Segment>
  );
};

export default renderTable;
