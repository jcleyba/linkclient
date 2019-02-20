import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import { LOGIN_MUTATION } from '../../queries/users';
import { Context } from '../../app/App';

const Login = props => {
  const { setUser } = useContext(Context);
  const [state, setState] = useState({
    email: '',
    password: '',
    errorMsg: '',
  });

  const onInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value, errorMsg: '' });
  };

  useEffect(() => {
    setUser({});
    sessionStorage.clear();
  }, []);

  const onCompleted = ({ login }) => {
    if (login) {
      setUser(login);
      sessionStorage.setItem('user', JSON.stringify(login));
      props.history.push('/');
    } else {
      setState({ ...state, errorMsg: 'Email o contraseña inválidos.' });
    }
  };

  const renderErrorMessage = error => {
    const { errorMsg } = state;

    if (error || errorMsg.length) {
      return (
        <Message error header="Error" content={errorMsg || error.message} />
      );
    }
  };

  const renderForm = (login, loading, error) => {
    const { email, password, errorMsg } = state;
    return (
      <Form onSubmit={login} error={error || !!errorMsg.length}>
        {renderErrorMessage(error)}
        <Form.Field>
          <label>Email</label>
          <Input
            required
            type="email"
            placeholder="john@smith.com"
            name="email"
            value={email}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
    );
  };

  return (
    <>
      <Segment>
        <Header>Login</Header>
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email: state.email, password: state.password }}
          onCompleted={data => onCompleted(data)}
        >
          {(login, { loading, error }) => renderForm(login, loading, error)}
        </Mutation>
      </Segment>
    </>
  );
};
export default withRouter(Login);
