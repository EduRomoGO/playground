import React, { useState } from 'react';

export default () => {
  const initialState = { name: '' };
  const [state, setState] = useState(initialState);

  const handleChange = e => setState({ name: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(`you typed ${state.name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      Function component
      <input type="file" />
      <label>
        Name:
        <input type="text" value={state.name} onChange={handleChange} />
      </label>
      <input type="submit" value="submit" />
    </form>
  )
};
