import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import ProductsForm from '../components/forms/ProductsForm';
import { PRODUCTS_MUTATION, PRODUCT_QUERY } from '../queries/products';
class AddProduct extends React.Component {
  state = {};

  onCompleted = data => {
    this.props.history.push('/products');
  };

  onSubmit = (state, mutation) => {
    this.setState({ ...state }, mutation);
  };

  renderQuery = id => {
    let values = this.state;

    return (
      <Query
        query={PRODUCT_QUERY}
        variables={{ id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data: productData }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          if (productData.product) {
            values = productData.product;
          }

          return this.renderMutation(id, values);
        }}
      </Query>
    );
  };

  parseState = () => {
    const {
      id_ProductType,
      id_Provider,
      stock,
      minimumStock,
      salePrice,
      costPrice,
    } = this.state;

    return {
      ...this.state,
      id_ProductType: parseInt(id_ProductType),
      id_Provider: parseInt(id_Provider),
      stock: parseFloat(stock),
      minimumStock: parseFloat(minimumStock || 0),
      salePrice: parseFloat(salePrice),
      costPrice: parseFloat(costPrice),
    };
  };

  renderMutation = (id, values) => {
    return (
      <Mutation
        mutation={PRODUCTS_MUTATION}
        variables={{ id, ...this.parseState() }}
        onCompleted={data => this.onCompleted(data)}
      >
        {(products, { data, loading, error }) => (
          <ProductsForm
            mutation={products}
            onSubmit={this.onSubmit}
            loading={loading}
            {...values}
          />
        )}
      </Mutation>
    );
  };

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div>
        <Header>Nuevo Producto</Header>
        <Segment>
          {params.id
            ? this.renderQuery(params.id)
            : this.renderMutation(params.id, this.state)}
        </Segment>
      </div>
    );
  }
}

export default withRouter(AddProduct);
