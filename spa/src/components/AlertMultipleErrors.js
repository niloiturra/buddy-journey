import React from 'react';
import { Alert } from 'reactstrap';

const AlertMultipleErrors = ({ color, errors }) => {
  return (
    <Alert color={color}>
      <h6 className="alert-danger">Atenção!</h6>
      <ul>
        {errors.map((error, i) => {
          return <li key={i}>{error}</li>;
        })}
      </ul>
    </Alert>
  );
};

export default AlertMultipleErrors;
