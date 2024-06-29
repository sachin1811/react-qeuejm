import React, { useState } from 'react';
import TrafficLight from './TrafficLight';

import './style.css';

const config = {
  red: {
    backgroundColor: 'red',
    duration: 40,
    next: 'green',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 10,
    next: 'red',
  },
  green: {
    backgroundColor: 'green',
    duration: 20,
    next: 'yellow',
  },
};

export default function App() {
  const [redValue, setRedValue] = useState(40);
  const [yellowValue, setYellowValue] = useState(10);
  const [greenValue, setGreenValue] = useState(20);
  const [configValue, setConfigValue] = useState(config);

  const handleConfigure = () => {
    let data = JSON.parse(JSON.stringify({ ...configValue }));
    data.red.duration = redValue * 1;
    data.yellow.duration = yellowValue * 1;
    data.green.duration = greenValue * 1;
    setConfigValue({ ...data });
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Traffic lights Application</h2>
      <div>
        <h4> Configure Traffic lights Time (in sec) :-</h4>
        <div className="input-wrapper">
          <h6>RED: </h6>
          <input
            value={redValue}
            onChange={(e) => setRedValue(e.target.value)}
          />
          <h6>YELLOW: </h6>
          <input
            value={yellowValue}
            onChange={(e) => setYellowValue(e.target.value)}
          />
          <h6>GREEN: </h6>
          <input
            value={greenValue}
            onChange={(e) => setGreenValue(e.target.value)}
          />
        </div>
        <button onClick={() => handleConfigure()}>Update Time</button>
      </div>
      <div className="wrapper">
        <TrafficLight config={configValue} layout="horizontal" />
        <TrafficLight config={configValue} />
      </div>
    </>
  );
}
