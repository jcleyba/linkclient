import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { PROVIDERS_SELECT_QUERY } from '../../queries/providers';
import { Form, Select } from 'semantic-ui-react';

function ProvidersSelect(props) {
  const [provider, setProvider] = useState(props.provider || '');

  const onSelectChange = ({ target }, { name, value }) => {
    setProvider(value);
    props.setProvider(value);
  };
  return (
    <Query query={PROVIDERS_SELECT_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Form.Field required>
            <label>Proveedor</label>
            <Select
              placeholder="Proveedor"
              name="id_Provider"
              value={provider}
              onChange={onSelectChange}
              required
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
  );
}

export default ProvidersSelect;
