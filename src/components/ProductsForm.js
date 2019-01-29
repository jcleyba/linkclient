import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class ProductsForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      codProduct = '',
      description = '',
      stock = '',
      minimumStock = '',
      price = '',
      precioCosto = '',
      id_Provider = '',
      id_ProductType = '',
    } = props;
    this.state = {
      codProduct,
      description,
      stock,
      minimumStock,
      price,
      precioCosto,
      id_Provider,
      id_ProductType,
    };
  }

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

  onSubmit = () => {
    this.props.onSubmit(this.state, this.props.mutation);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Codigo</label>
            <input
              placeholder="Codigo"
              name="codProduct"
              value={this.state.codProduct}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Descripcion</label>
            <input
              placeholder="Descripcion"
              name="description"
              value={this.state.description}
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
              value={this.state.stock}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Stock mínimo</label>
            <input
              placeholder="Stock mínimo"
              name="minimumStock"
              type="number"
              value={this.state.minimumStock}
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
              value={this.state.price}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Precio Costo</label>
            <input
              placeholder="Precio Costo"
              name="precioCosto"
              type="number"
              value={this.state.precioCosto}
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
                    value={this.state.id_Provider.toString()}
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
              value={this.state.id_ProductType.toString()}
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
    );
  }
}

const PROVIDERS_QUERY = gql`
  query ProvidersQuery {
    providers {
      id
      razonSocial
    }
  }
`;
