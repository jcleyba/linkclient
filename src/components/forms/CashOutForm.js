import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { CASHOUTS_MUTATION } from '../../queries/cashouts';

const CashOutForm = ({ user, onCompleted }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  let parsedVariables = {
    amount: parseFloat(amount),
    description,
    id_User: parseInt(user.id),
  };

  return (
    <Mutation
      mutation={CASHOUTS_MUTATION}
      variables={parsedVariables}
      onCompleted={onCompleted}
    >
      {(cashouts, { data, loading, error }) => {
        if (error) return 'Algo salio mal...';

        return (
          <Form onSubmit={cashouts}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Concepto</label>
                <input
                  name="description"
                  type="text"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
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
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </Form.Field>
            </Form.Group>
            <Button primary type="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        );
      }}
    </Mutation>
  );
};
export default CashOutForm;
