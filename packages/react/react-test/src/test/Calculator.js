// Additionally, it renders the BoilingVerdict for the current input value.

import React, {useState} from 'react';
import BoilingVerdict from './BoilingVerdict.js';


export default () => {
  const [temperature, setTemperature] = useState(0);
  const handleChange = e => setTemperature(e.target.value);

  return (
    <div>
      <input type="number" value={temperature} onChange={handleChange} />
      <BoilingVerdict celsius={temperature} />
    </div>
  )
};
