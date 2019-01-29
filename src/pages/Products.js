import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Header, Button, Icon } from 'semantic-ui-react';

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
              <div>
                {data.products &&
                  data.products.map(product => (
                    <li key={product.id}>
                      {product.codProduct} - {product.description} - stock:
                      {product.stock} - ${product.price}
                    </li>
                  ))}
              </div>
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
