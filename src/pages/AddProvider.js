import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';

class AddProvider extends React.Component {
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    return (
      <div>
        <Header>Nuevo Proveedor</Header>
        <Segment>
          <Form onSubmit={() => console.log(this.state)}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>CUIT</label>
                <input
                  name="cuit"
                  onChange={this.onInputChange}
                  required
                  placeholder="CUIT"
                />
              </Form.Field>
              <Form.Field>
                <label>Razon Social</label>
                <input
                  required
                  placeholder="Razon Social"
                  name="razonSocial"
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Nombre</label>
                <input
                  placeholder="Nombre"
                  name="name"
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Apellido</label>
                <input
                  placeholder="Apellido"
                  name="apellido"
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  onChange={this.onInputChange}
                />
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

export default AddProvider;
