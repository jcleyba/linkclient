import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value, error: '' });
  };

  componentDidMount() {
    sessionStorage.clear();
  }

  onCompleted = ({ login }) => {
    if (login) {
      sessionStorage.setItem('token', login.token);
      this.props.history.push('/');
    } else {
      this.setState({ error: 'Email o contraseña inválidos.' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <Segment>
          <Header>Login</Header>
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this.onCompleted(data)}
          >
            {(login, { loading, error: formError }) => (
              <Form onSubmit={login} error={!!error || !!formError}>
                {!!formError || !!error ? (
                  <Message
                    error
                    header="Error"
                    content={error || formError.message}
                  />
                ) : null}
                <Form.Field>
                  <label>Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@smith.com"
                    name="email"
                    value={email}
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <Button
                  type="submit"
                  primary
                  disabled={!email || !password}
                  loading={loading}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Mutation>
        </Segment>
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;
export default withRouter(Login);
