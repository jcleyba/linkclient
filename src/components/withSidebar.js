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
      <Menu.Item as={Link} to="/">
        <Icon name="home" />
        Vender
      </Menu.Item>
      <Menu.Item as={Link} to="/sales">
        <Icon name="food" />
        Productos
      </Menu.Item>
      <Menu.Item as={Link} to="/providers">
        <Icon name="briefcase" />
        Proveedores
      </Menu.Item>
      <Menu.Item as={Link} to="/cash">
        <Icon name="money bill alternate outline" />
        Caja
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
