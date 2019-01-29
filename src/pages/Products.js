import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';

import ProductsTable from '../components/ProductsTable';
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
            console.log(data);
            return (
              <Segment>
                <ProductsTable data={data.products} />
              </Segment>
            );
          }}
        </Query>
      </div>
    );
  }
}

const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      id
      codProduct
      description
      stock
      price
    }
  }
`;

export default Products;
