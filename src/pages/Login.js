import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Header, Segment } from 'semantic-ui-react';

class Login extends React.Component {
  componentDidMount() {
    sessionStorage.clear();
  }

  onSubmit = e => {
    e.preventDefault();
    sessionStorage.setItem('token', '123');
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Segment>
          <Header>Login</Header>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Email</label>
              <Input type="email" placeholder="john@smith.com" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input type="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Login);
