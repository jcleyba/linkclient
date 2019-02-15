import React, { useState } from 'react';
import { Form, Button, Confirm } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { CASHSHIFTS_MUTATION } from '../../queries/cashshifts';

const CashShiftForm = ({ user, onCompleted }) => {
  const [observation, setObservation] = useState('');
  const [existingAmount, setExistingAmount] = useState('');
  const [open, setOpen] = useState(false);
  let parsedVariables = {
    existingAmount: parseFloat(existingAmount),
    observation,
    id_User: parseInt(user.id),
  };

  return (
    <Mutation
      mutation={CASHSHIFTS_MUTATION}
      variables={parsedVariables}
      onCompleted={onCompleted}
    >
      {(cashshift, { data, loading, error }) => {
        if (error) return 'Algo salio mal...';

        return (
          <Form onSubmit={() => setOpen(true)}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Dejo en Caja</label>
                <input
                  required
                  type="number"
                  placeholder="$20"
                  min="0"
                  name="existingAmount"
                  value={existingAmount}
                  onChange={e => setExistingAmount(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Observaciones de Caja</label>
                <input
                  name="observation"
                  type="text"
                  onChange={e => setObservation(e.target.value)}
                  value={observation}
                  placeholder="Observación"
                />
              </Form.Field>
            </Form.Group>
            <Button primary type="submit" loading={loading}>
              Cerrar Caja
            </Button>
            <Confirm
              open={open}
              header="CIERRE DE CAJA"
              content="Seguro de cerrar su turno de caja?"
              onCancel={() => setOpen(false)}
              onConfirm={() => {
                setOpen(false);
                cashshift();
              }}
            />
          </Form>
        );
      }}
    </Mutation>
  );
};
export default CashShiftForm;
