import React from 'react';

export default ({onClick, value}) => (
  <button
    className="square"
    onClick={onClick}
    data-testid="square"
  >
    {value}
  </button>
);
