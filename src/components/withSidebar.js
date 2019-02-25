import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const withSidebar = props => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
    >
      <Menu.Item>
        <Icon name="user" />
        Bienvenido {props.user.username}
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        <Icon name="cart" />
        Vender
      </Menu.Item>
      <Menu.Item as={Link} to="/products">
        <Icon name="food" />
        Productos
      </Menu.Item>
      <Menu.Item as={Link} to="/providers">
        <Icon name="briefcase" />
        Proveedores
      </Menu.Item>
      <Menu.Item as={Link} to="/cash-flow">
        <Icon name="money bill alternate outline" />
        Caja
      </Menu.Item>
      <Menu.Item as={Link} to="/cash-out">
        <Icon name="money bill alternate" />
        Egresos
      </Menu.Item>
      <Menu.Item as="a" onClick={() => props.history.push('/sales-reports')}>
        <Icon name="chart area" />
        Reporte Ventas
      </Menu.Item>
      <Menu.Item as={Link} to="/product-types">
        <Icon name="food" />
        Tipos de Productos
      </Menu.Item>
      <Menu.Item as="a" onClick={() => props.history.push('/login')}>
        <Icon name="log out" />
        Logout
      </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher style={{ marginLeft: 150, padding: 20 }}>
      {props.children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default withRouter(withSidebar);
