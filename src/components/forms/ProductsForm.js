import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import ProvidersSelect from '../selects/ProvidersSelect';
import ProductTypesSelect from '../selects/ProductTypesSelect';

function ProductsForm(props) {
  const { stock: initialStock } = props.initialValues;
  const {
    stock = '',
    minimumStock = '',
    codProduct = '',
    description = '',
    salePrice = '',
    costPrice = '',
    ...other
  } = props.initialValues;
  const [state, setState] = useState({
    stock,
    minimumStock,
    codProduct,
    description,
    salePrice,
    costPrice,
    ...other,
  });

  let id_Provider = props.initialValues.id_Provider || '';
  let id_ProductType = props.initialValues.id_ProductType || '';

  const setProvider = provider => {
    id_Provider = provider;
  };

  const setProductType = type => {
    id_ProductType = type;
  };

  const onInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const onSubmit = () => {
    props.onSubmit(
      {
        ...state,
        id_ProductType,
        id_Provider,
      },
      props.mutation
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Codigo</label>
          <input
            placeholder="Codigo"
            name="codProduct"
            required
            value={state.codProduct}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Descripcion</label>
          <input
            placeholder="Descripcion"
            name="description"
            value={state.description}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Stock</label>
          <input
            placeholder="Stock"
            name="stock"
            type="number"
            required
            min={initialStock}
            value={state.stock}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Stock mínimo</label>
          <input
            placeholder="Stock mínimo"
            name="minimumStock"
            type="number"
            value={state.minimumStock}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Precio Venta</label>
          <input
            placeholder="Precio Venta"
            name="salePrice"
            type="number"
            required
            value={state.salePrice}
            onChange={onInputChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Precio Costo</label>
          <input
            placeholder="Precio Costo"
            name="costPrice"
            type="number"
            required
            value={state.costPrice}
            onChange={onInputChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <ProvidersSelect
          provider={id_Provider.toString()}
          setProvider={setProvider}
        />
        <ProductTypesSelect
          productType={id_ProductType.toString()}
          setProductType={setProductType}
        />
      </Form.Group>
      <Button
        primary
        type="submit"
        loading={props.loading}
        disabled={!id_Provider || !id_ProductType}
      >
        Submit
      </Button>
    </Form>
  );
}

export default ProductsForm;
