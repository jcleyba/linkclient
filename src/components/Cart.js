import React, { useState, useEffect } from 'react';

import { List, Segment, Header, Label } from 'semantic-ui-react';
import CartItem from './CartItem';
import { Consumer } from '../app/App';

const Cart = props => {
  const [items, setItems] = useState(props.items || []);

  // Hooks!!
  useEffect(() => {
    setItems(props.items);
  }, [props.items, items]);

  const removeItem = index => setItems([...items.splice(index, 1)]);

  const renderItems = items => {
    if (!items) return null;

    return items.map((prod, i) => {
      const subtotal = prod.salePrice * prod.amount;
      return (
        <CartItem
          subtotal={subtotal}
          item={prod}
          key={i}
          removeItem={() => removeItem(i)}
        />
      );
    });
  };

  const renderTotal = items => {
    if (!items) return null;

    return items.reduce((a, b) => {
      const subtotal = b.salePrice * b.amount;
      return a + subtotal;
    }, 0);
  };

  return (
    <Consumer>
      {({ cart }) => (
        <Segment>
          <Header>Carrito</Header>
          <List divided relaxed>
            {renderItems(cart)}
            <List.Item>
              <Label size="big" horizontal>
                Total: ${renderTotal(cart)}
              </Label>
            </List.Item>
          </List>
        </Segment>
      )}
    </Consumer>
  );
};

export default Cart;
