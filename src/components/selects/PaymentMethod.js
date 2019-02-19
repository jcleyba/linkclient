import React, { useState } from 'react';
import { Select } from 'semantic-ui-react';
import { PAYMENTMETHODS_QUERY } from '../../queries/paymentmethods';
import { Query } from 'react-apollo';
import ErrorMessage from '../ErrorMessage';

const PaymentMethod = props => {
  const [method, setMethod] = useState('1');

  const onChange = data => {
    setMethod(data.value);
    props.onMethodChange(data.value);
  };

  const parseMethods = data => {
    if (!data || !data.paymentmethods) {
      return [];
    }
    return data.paymentmethods.map(({ id, description }) => ({
      key: id,
      value: id,
      text: description,
    }));
  };

  return (
    <Query query={PAYMENTMETHODS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error || !data.paymentmethods)
          return <ErrorMessage error={error} />;

        return (
          <Select
            placeholder="Forma de pago"
            value={method}
            onChange={(e, data) => onChange(data)}
            options={parseMethods(data)}
          />
        );
      }}
    </Query>
  );
};

export default PaymentMethod;
