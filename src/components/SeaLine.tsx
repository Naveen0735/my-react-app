import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const SeaLine: React.FC = () => {
  const seaSpring = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: async (next) => {
      while (1) {
        await next({ backgroundPosition: '100% 50%' });
        await next({ backgroundPosition: '0% 50%' });
      }
    },
    config: { duration: 1500 },
  });

  return (
    <animated.div
      style={{
        width: '100%',
        height: '50px',
        background: 'linear-gradient(45deg,rgb(10, 75, 141),rgb(121, 176, 238),rgb(8, 52, 95))',
        backgroundSize: '200% 200%',
        borderRadius: '5px',
        backgroundPosition: seaSpring.backgroundPosition,
      }}
    />
  );
};

export default SeaLine;
