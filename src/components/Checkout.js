import React from 'react';
import { Mutation } from 'react-apollo';
import { SALES_MUTATION } from '../queries/sales';
import { Button, Message } from 'semantic-ui-react';

function Checkout(props) {
  const renderMessage = (data, error) => {
    if (!data && !error) {
      return null;
    }
    return (
      <Message
        error={error}
        positive={data && !!data.sales}
        content={error ? 'Something went wrong' : 'Guardado!'}
      />
    );
  };

  const parseDetails = cart => {
    if (!cart) return [];

    return cart.map(prod => {
      return {
        id_Product: parseInt(prod.id),
        quantity: parseInt(prod.amount),
        price: parseInt(prod.salePrice),
      };
    });
  };

  const parseVariables = () => {
    if (!props.user || !props.cart) {
      return {};
    }

    return {
      type: 'C',
      amount: parseInt(props.total),
      id_User: parseInt(props.user.id),
      details: parseDetails(props.cart),
      id_PaymentMethod: parseInt(props.method),
    };
  };

  return (
    <Mutation
      mutation={SALES_MUTATION}
      variables={{ ...parseVariables() }}
      onCompleted={props.onCompleted}
    >
      {(sales, { data, loading, error }) => {
        return (
          <>
            {renderMessage(data, error)}
            <Button
              primary
              size="big"
              disabled={!props.cart.length}
              loading={loading}
              onClick={sales}
            >
              Guardar
            </Button>
          </>
        );
      }}
    </Mutation>
  );
}

export default Checkout;
