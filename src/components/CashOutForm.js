import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class CashOutForm extends React.Component {
  constructor(props) {
    super(props);
    const { description = '', amount = '' } = props;
    this.state = {
      description,
      amount,
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
            <label>Concepto</label>
            <input
              name="description"
              type="text"
              onChange={this.onInputChange}
              value={this.state.description}
              required
              placeholder="Concepto"
            />
          </Form.Field>
          <Form.Field>
            <label>Monto</label>
            <input
              required
              type="number"
              placeholder="$20"
              name="amount"
              value={this.state.razonSocial}
              onChange={this.onInputChange}
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
