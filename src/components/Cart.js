import React, { useState, useContext } from 'react';

import { List, Segment, Header, Label, Input } from 'semantic-ui-react';
import CartItem from './CartItem';
import { Context } from '../app/App';
import Checkout from './Checkout';
import PaymentMethod from './selects/PaymentMethod';

const Cart = props => {
  const { cart, setCart, user } = useContext(Context);
  const [payment, setPayment] = useState(0);

  let total = 0;
  let method = 1;

  const renderItems = items => {
    if (!items) return null;

    return items.map((prod, index) => {
      const subtotal = prod.salePrice * prod.amount;
      return (
        <CartItem
          subtotal={subtotal}
          item={prod}
          key={index}
          removeItem={() => {
            const newCart = items.filter((a, b) => b !== index);
            setCart([...newCart]);
          }}
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

  const setMethod = methodId => {
    method = methodId;
  };

  return (
    <>
      <Segment>
        <Header>Carrito</Header>
        <List divided relaxed>
          {renderItems(cart)}
          {renderTotal(cart)}
          <List.Item>
            Paga con: {renderPayment()}
            {'  '}
            Método: <PaymentMethod onMethodChange={setMethod} />
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
        onCompleted={() => {
          setCart([]);
          setPayment(0);
        }}
        user={user}
        cart={cart}
        total={total}
        method={method}
      />
    </>
  );
};

export default Cart;
