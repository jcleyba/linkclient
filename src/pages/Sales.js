import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Sales extends React.Component {
  render() {
    return (
      <Query query={SALES_QUERY}>
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
    );
  }
}

const SALES_QUERY = gql`
  query SalesQuery {
    products {
      id
      codProduct
      description
      stock
      price
    }
  }
`;

export default Sales;
