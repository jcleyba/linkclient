import React from 'react';
import { Button, Input, Card } from 'semantic-ui-react';

class Result extends React.Component {
  state = {
    amount: 1,
  };

  onAmountChange = ({ target }) => {
    this.setState({ amount: target.value });
  };

  render() {
    const { amount } = this.state;
    const { product, onSelect } = this.props;
    const { description, precioCosto, price, stock } = product;

    return (
      <Card>
        <Card.Content>
          <Card.Header>{description}</Card.Header>
          Costo: <b>${precioCosto}</b> - Precio: <b>${price} </b>- Stock:{' '}
          <b>{stock}</b>
        </Card.Content>
        <Card.Content extra>
          <Input
            action
            type="number"
            min="1"
            value={this.state.amount}
            onChange={this.onAmountChange}
            placeholder="Cantidad"
          >
            <input />
            <Button
              primary
              type="submit"
              disabled={!this.state.amount}
              onClick={() => onSelect({ ...product, amount })}
            >
              Agregar
            </Button>
          </Input>
        </Card.Content>
      </Card>
    );
  }
}

export default Result;
