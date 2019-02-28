import React from 'react';
import { format } from 'date-fns';

const CenteredCell = function(prop) {
  return <div style={{ textAlign: 'center' }}>{prop.value || prop.children}</div>;
};

const DateFormatCell = function(prop) {
  return <div>{format(new Date(prop.value), 'DD/MMM/YYYY HH:mm')}</div>;
};

const MoneyCell = function(prop) {
    return <div>{'$' + prop.value}</div>;
};

export { CenteredCell, DateFormatCell, MoneyCell };
