import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';

import ProductsTable from '../../components/tables/ProductsTable';
import { PRODUCTS_QUERY } from '../../queries/products';
import BulkUpdateForm from '../../components/forms/BulkUpdateForm';
import { Context } from '../../app/App';
import { isAdmin } from '../../utils';

function Products(props) {
  const { user } = useContext(Context);
  const [selected, setSelected] = useState([]);
  const { match } = props;
  const { id } = match.params;

  const updateSelection = selected => {
    setSelected(selected);
  };

  const renderBulkUpdateForm = refetch => {
    if (!isAdmin(user)) {
      return null;
    }

    return (
      <Segment>
        <BulkUpdateForm data={selected} refetch={refetch} />
      </Segment>
    );
  };

  return (
    <>
      <Header as="h1">Productos</Header>
      <Button
        icon
        primary
        labelPosition="left"
        as={Link}
        to={`${match.path}/add`}
      >
        <Icon name="add" />
        Nuevo
      </Button>
      <Query
        query={PRODUCTS_QUERY}
        variables={{ id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              {renderBulkUpdateForm(refetch)}
              <Segment>
                <ProductsTable
                  data={data.products || []}
                  updateSelection={updateSelection}
                />
              </Segment>
            </>
          );
        }}
      </Query>
    </>
  );
}

export default Products;
