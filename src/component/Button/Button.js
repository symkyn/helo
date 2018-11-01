import React from 'react';

const Button = ({ children, className, ...rest }) => (
    <button {...rest} className={`my-button ${ className || '' }`}>
      {children}
    </button>
);

export default Button;