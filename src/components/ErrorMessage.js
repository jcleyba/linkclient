import React from 'react';
import { Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function ErrorMessage(props) {
  const { error } = props;
  if (error.message.includes('403')) {
    sessionStorage.clear();
    props.history.push('/login');
    return null;
  }

  return <Message error header="Error" content={error} />;
}

export default withRouter(ErrorMessage);
