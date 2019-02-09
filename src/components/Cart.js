import React, { useState, useEffect } from 'react';

import { List, Segment, Header, Label, Input } from 'semantic-ui-react';
import CartItem from './CartItem';
import { Consumer } from '../app/App';
import Checkout from './Checkout';

const Cart = props => {
  const [items, setItems] = useState(props.items || []);
  const [payment, setPayment] = useState(0);
  let total = 0;

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

    total = items.reduce((a, b) => {
      const subtotal = b.salePrice * b.amount;
      return a + subtotal;
    }, 0);
  };

  const renderPayment = () => {
    return (
      <Input
        placeholder="Paga con"
        type="number"
        min="0"
        value={payment}
        onChange={e => setPayment(e.target.value)}
      />
    );
  };

  const renderRemain = () => {
    let pay = parseInt(payment);
    let tot = parseInt(total);

    pay = isNaN(pay) ? 0 : pay;
    tot = isNaN(tot) ? 0 : tot;

    return pay - tot;
  };

  return (
    <Consumer>
      {({ cart, user, setCart }) => (
        <>
          <Segment>
            <Header>Carrito</Header>
            <List divided relaxed>
              {renderItems(cart)}
              {renderTotal(cart)}
              <List.Item>
                Paga con: {renderPayment()}
                <Label size="big" tag color="orange" style={{ marginLeft: 30 }}>
                  Total: ${total}
                </Label>
                <Label size="big" tag>
                  Vuelto: ${renderRemain()}
                </Label>
              </List.Item>
            </List>
          </Segment>
          <Checkout
            onCompleted={() => setCart([])}
            user={user}
            cart={cart}
            total={total}
          />
        </>
      )}
    </Consumer>
  );
};

export default Cart;
