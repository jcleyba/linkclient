import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

function ProvidersForm(props) {
  const [state, setState] = useState({ ...props.initialValues });

  const onInputChange = ({ target }) => {
    setState({
      [target.name]: target.value,
    });
  };

  const onSubmit = () => {
    props.onSubmit(state, props.mutation);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>CUIT (sin espacios o guiones)</label>
          <input
            name="cuit"
            type="number"
            onChange={onInputChange}
            value={state.cuit}
            required
            placeholder="CUIT"
          />
        </Form.Field>
        <Form.Field required>
          <label>Razon Social</label>
          <input
            required
            placeholder="Razon Social"
            name="razonSocial"
            value={state.razonSocial}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Nombre</label>
          <input
            placeholder="Nombre"
            name="name"
            value={state.name || ''}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Apellido</label>
          <input
            placeholder="Apellido"
            name="apellido"
            value={state.apellido || ''}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            value={state.email || ''}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Teléfono 1</label>
          <input
            placeholder="Teléfono 1"
            name="phoneNumber1"
            value={state.phoneNumber1 || ''}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Teléfono 2</label>
          <input
            placeholder="Teléfono 2"
            name="phoneNumber2"
            value={state.phoneNumber2 || ''}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Button primary type="submit" loading={props.loading}>
        Submit
      </Button>
    </Form>
  );
}

export default ProvidersForm;
