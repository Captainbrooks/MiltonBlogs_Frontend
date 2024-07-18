import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
