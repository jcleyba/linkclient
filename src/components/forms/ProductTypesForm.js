import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { PRODUCTTYPES_MUTATION } from '../../queries/producttypes';

const ProductTypesForm = ({ user, onCompleted }) => {
  const [description, setDescription] = useState('');

  return (
    <Mutation
      mutation={PRODUCTTYPES_MUTATION}
      variables={{ description }}
      onCompleted={onCompleted}
    >
      {(producttypes, { data, loading, error }) => {
        if (error) return 'Algo salio mal...';

        return (
          <Form onSubmit={producttypes}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Nombre</label>
                <input
                  required
                  type="text"
                  placeholder="$20"
                  name="amount"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
export default ProductTypesForm;
