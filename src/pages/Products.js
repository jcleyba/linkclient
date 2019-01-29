import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';

import ProductsTable from '../components/ProductsTable';
import { PRODUCTS_QUERY } from '../queries/products';
class Products extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div>
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
        <Query query={PRODUCTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Segment>
                <ProductsTable data={data.products || []} />
              </Segment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Products;
