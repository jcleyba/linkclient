import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Form, Select } from 'semantic-ui-react';
import { PRODUCTTYPES_QUERY } from '../../queries/producttypes';
import ErrorMessage from '../ErrorMessage';

function ProductTypesSelect(props) {
  const [type, setType] = useState(props.productType || '');

  const onSelectChange = ({ target }, { name, value }) => {
    setType(value);
    props.setProductType(value);
  };
  return (
    <Query query={PRODUCTTYPES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <ErrorMessage error={error} />;
        if (error) return `Error! ${error.message}`;

        return (
          <Form.Field required>
            <label>Tipo de Producto</label>
            <Select
              placeholder="Tipo de producto"
              onChange={onSelectChange}
              name="id_ProductTypes"
              value={type}
              required
              options={data.producttypes.map(({ id, description }) => ({
                key: id,
                value: id,
                text: description,
              }))}
            />
          </Form.Field>
        );
      }}
    </Query>
  );
}

export default ProductTypesSelect;
