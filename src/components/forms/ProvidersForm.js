import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class ProvidersForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      cuit = '',
      razonSocial = '',
      name = '',
      apellido = '',
      email = '',
      phoneNumber1 = '',
      phoneNumber2 = '',
    } = props;
    this.state = {
      cuit,
      razonSocial,
      name,
      apellido,
      email,
      phoneNumber1,
      phoneNumber2,
    };
  }

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
            <label>CUIT (sin espacios o guiones)</label>
            <input
              name="cuit"
              type="number"
              onChange={this.onInputChange}
              value={this.state.cuit}
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
              value={this.state.razonSocial}
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
              value={this.state.name || ''}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Apellido</label>
            <input
              placeholder="Apellido"
              name="apellido"
              value={this.state.apellido || ''}
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
              value={this.state.email || ''}
              onChange={this.onInputChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Teléfono 1</label>
            <input
              placeholder="Teléfono 1"
              name="phoneNumber1"
              value={this.state.phoneNumber1 || ''}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Teléfono 2</label>
            <input
              placeholder="Teléfono 2"
              name="phoneNumber2"
              value={this.state.phoneNumber2 || ''}
              onChange={this.onInputChange}
            />
          </Form.Field>
        </Form.Group>
        <Button primary type="submit" loading={this.props.loading}>
          Submit
        </Button>
      </Form>
    );
  }
}
