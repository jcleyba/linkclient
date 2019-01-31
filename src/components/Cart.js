import React from 'react';
import { List, Segment, Header, Label } from 'semantic-ui-react';
import CartItem from './CartItem';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.items !== this.state.items) {
      this.setState({ items: this.props.items });
    }
  }

  removeItem = index => {
    this.setState({ items: [...this.state.items.splice(index, 1)] });
  };

  renderItems = items => {
    if (!items) return;
    return items.map((prod, i) => {
      const subtotal = prod.price * prod.amount;
      return (
        <CartItem
          subtotal={subtotal}
          item={prod}
          key={i}
          removeItem={() => this.removeItem(i)}
        />
      );
    });
  };

  renderTotal = items => {
    if (!items) {
      return null;
    }

    return items.reduce((a, b) => {
      const subtotal = b.price * b.amount;
      return a + subtotal;
    }, 0);
  };
  render() {
    const { items } = this.state;
    return (
      <Segment>
        <Header>Carrito</Header>
        <List divided relaxed>
          {this.renderItems(items)}
          <List.Item>
            <Label size="big" horizontal>
              Total: ${this.renderTotal(items)}
            </Label>
          </List.Item>
        </List>
      </Segment>
    );
  }
}
