import React from 'react';
import { List, Label, Button } from 'semantic-ui-react';

const CartItem = props => {
  return (
    <List.Item>
      <Label size="big" horizontal color="teal">
        {props.item.description}
      </Label>{' '}
      Cantidad: <b>{props.item.amount}</b> - Precio:{' '}
      <b>${props.item.salePrice}</b> - Subtotal: <b>${props.subtotal}</b>
      <Button floated="right" color="red" onClick={props.removeItem}>
        Borrar
      </Button>
    </List.Item>
  );
};

export default CartItem;
