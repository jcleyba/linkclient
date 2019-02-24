import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { PRODUCTS_BULK_MUTATION } from '../../queries/products';

function BulkUpdateForm(props) {
  const [stock, setStock] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [costPrice, setCostPrice] = useState('');

  const updateData = () => {
    let data = props.data || [];

    data = data.map(item => {
      const { __typename, ...other } = item;
      return {
        ...other,
        id: parseInt(item.id),
      };
    });

    if (stock) {
      data = data.map(item => {
        item.stock = stock;

        return item;
      });
    }
    if (salePrice) {
      data = data.map(item => {
        item.salePrice = (item.salePrice * (100 + salePrice)) / 100;

        return item;
      });
    }

    if (costPrice) {
      data = data.map(item => {
        item.costPrice = (item.costPrice * (100 + salePrice)) / 100;

        return item;
      });
    }

    return data;
  };

  const onCompleted = () => {
    props.refetch();
  };

  return (
    <Mutation
      mutation={PRODUCTS_BULK_MUTATION}
      variables={{ prods: updateData() }}
      onCompleted={onCompleted}
    >
      {(bulkupdate, { data, loading, error }) => {
        if (error) return 'Algo salio mal...';

        return (
          <Form onSubmit={bulkupdate}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Stock</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  onChange={e => setStock(parseInt(e.target.value))}
                  value={stock}
                  placeholder="Stock"
                />
              </Form.Field>
              <Form.Field>
                <label>Porcentaje precio VENTA (sin el signo %)</label>
                <input
                  type="number"
                  placeholder="20%"
                  name="salePrice"
                  min="0"
                  value={salePrice}
                  onChange={e => setSalePrice(parseFloat(e.target.value))}
                />
              </Form.Field>
              <Form.Field>
                <label>Porcentaje precio COSTO (sin el signo %)</label>
                <input
                  type="number"
                  placeholder="20%"
                  name="costPrice"
                  min="0"
                  value={costPrice}
                  onChange={e => setCostPrice(parseFloat(e.target.value))}
                />
              </Form.Field>
            </Form.Group>
            <Button
              primary
              type="submit"
              loading={loading}
              disabled={
                (!stock && !salePrice && !costPrice) || !props.data.length
              }
            >
              Guardar
            </Button>
          </Form>
        );
      }}
    </Mutation>
  );
}

export default BulkUpdateForm;
