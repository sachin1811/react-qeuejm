import React, { useEffect, useState } from 'react';

function Light({ backgroundColor, data }) {
  return (
    <div style={{ backgroundColor, padding: '8px' }}>
      <div
        aria-hidden={true}
        className="traffic-light"
        style={{ color: backgroundColor }}
      >
        {data}
      </div>
    </div>
  );
}

export default function TrafficLight({
  initialColor = 'green',
  config,
  layout = 'vertical',
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [currentTime, setCurrentTime] = useState(config[currentColor].duration);

  useEffect(() => {
    const { duration, next } = config[currentColor];
    setCurrentTime(duration);
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor, config]);

  useEffect(() => {
    const timerId2 = setTimeout(() => {
      setCurrentTime(currentTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId2);
    };
  }, [currentTime]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={[
        'traffic-light-container',
        layout === 'vertical' && 'traffic-light-container--vertical',
      ]
        .filter((cls) => !!cls)
        .join(' ')}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor ? config[color].backgroundColor : undefined
          }
          data={color === currentColor ? currentTime : undefined}
        />
      ))}
    </div>
  );
}
