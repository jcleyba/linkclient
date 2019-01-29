import React from 'react';
import { Segment, Header, Form, Button, Select } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
class AddProduct extends React.Component {
  state = {};

  onSelectChange = ({ target }, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onCompleted = data => {
    this.props.history.push('/products');
  };

  renderQuery = id => {
    let values = this.state;

    return (
      <Query query={PRODUCTS_QUERY} variables={{ id }}>
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
      price,
    } = this.state;

    return {
      ...this.state,
      id_ProductType: parseInt(id_ProductType),
      id_Provider: parseInt(id_Provider),
      stock: parseFloat(stock),
      minimumStock: parseFloat(minimumStock),
      price: parseFloat(price),
    };
  };

  renderMutation = (id, values) => {
    return (
      <Mutation
        mutation={id ? PRODUCTS_MUTATION : PRODUCTS_MUTATION}
        variables={this.parseState()}
        onCompleted={data => this.onCompleted(data)}
      >
        {(products, { data, loading, error }) => (
          <Form onSubmit={products}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Codigo</label>
                <input
                  placeholder="Codigo"
                  name="codProduct"
                  value={this.state.codProduct || values.codProduct}
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Descripcion</label>
                <input
                  placeholder="Descripcion"
                  name="description"
                  value={this.state.description || values.description}
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Stock</label>
                <input
                  placeholder="Stock"
                  name="stock"
                  type="number"
                  value={this.state.stock || values.stock}
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Stock mínimo</label>
                <input
                  placeholder="Stock mínimo"
                  name="minimumStock"
                  type="number"
                  value={this.state.minimumStock || values.minimumStock}
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Precio Venta</label>
                <input
                  placeholder="Precio Venta"
                  name="price"
                  type="number"
                  value={this.state.price || values.price}
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Precio Costo</label>
                <input
                  placeholder="Precio Costo"
                  name="precioCosto"
                  type="number"
                  value={this.state.precioCosto || values.precioCosto}
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Query query={PROVIDERS_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;

                  return (
                    <Form.Field>
                      <label>Proveedor</label>
                      <Select
                        placeholder="Proveedor"
                        name="id_Provider"
                        value={this.state.id_Provider}
                        onChange={this.onSelectChange}
                        options={data.providers.map(({ id, razonSocial }) => ({
                          key: id,
                          value: id,
                          text: razonSocial,
                        }))}
                      />
                    </Form.Field>
                  );
                }}
              </Query>
              <Form.Field>
                <label>Tipo de Producto</label>
                <Select
                  placeholder="Tipo de producto"
                  onChange={this.onSelectChange}
                  name="id_ProductType"
                  value={this.state.id_ProductType}
                  options={[
                    { key: 1, value: '1', text: 'Tipo 1' },
                    { key: 2, value: '2', text: 'Tipo 2' },
                  ]}
                />
              </Form.Field>
            </Form.Group>
            <Button primary type="submit">
              Submit
            </Button>
          </Form>
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

const PRODUCTS_MUTATION = gql`
  mutation ProductsMutation(
    $codProduct: String!
    $description: String!
    $id_ProductType: Int!
    $id_Provider: Int!
    $stock: Float!
    $minimumStock: Float!
    $price: Float!
  ) {
    products(
      codProduct: $codProduct
      description: $description
      id_ProductType: $id_ProductType
      id_Provider: $id_Provider
      stock: $stock
      minimumStock: $minimumStock
      price: $price
    ) {
      id
    }
  }
`;

const PROVIDERS_QUERY = gql`
  query ProvidersQuery {
    providers {
      id
      razonSocial
    }
  }
`;

const PRODUCTS_QUERY = gql`
  query ProductsQuery($id: ID) {
    product(id: $id) {
      id
      codProduct
      description
      stock
      price
    }
  }
`;
export default withRouter(AddProduct);
