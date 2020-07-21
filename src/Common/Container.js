import React from 'react';
import './Container.css';

const Container = ({ children }) => (
  <div className="container">
    <div className="phonebook">{children}</div>
  </div>
);

export default Container;
