import React from 'react';
import { Segment, Header, Form, Button, Select } from 'semantic-ui-react';

class AddProduct extends React.Component {
  render() {
    return (
      <div>
        <Header>Nuevo Producto</Header>
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Codigo</label>
                <input placeholder="Codigo" />
              </Form.Field>
              <Form.Field>
                <label>Descripcion</label>
                <input placeholder="Last Name" />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Stock</label>
                <input placeholder="Stock" />
              </Form.Field>
              <Form.Field>
                <label>Stock mínimo</label>
                <input placeholder="Stock mínimo" />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Precio Venta</label>
                <input placeholder="Precio Venta" />
              </Form.Field>
              <Form.Field>
                <label>Precio Costo</label>
                <input placeholder="Precio Costo" />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Proveedor</label>
                <Select placeholder="Proveedor" options={[]} />{' '}
              </Form.Field>
              <Form.Field>
                <label>Tipo de Producto</label>
                <Select placeholder="Tipo de producto" options={[]} />{' '}
              </Form.Field>
            </Form.Group>
            <Button primary type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default AddProduct;
