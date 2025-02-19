import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import './Counter.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  const getBackgroundColor = (count: number) => {
    return `rgba(255, 0, 0, ${Math.min(count / 100, 1)})`;
  };

  return (
    <Box
      className="counter-container"
      sx={{ backgroundColor: getBackgroundColor(count), p: 2 }}
    >
      <Typography variant="h3">{count}</Typography>
      <Typography variant="h6">Counter</Typography>
      <Box
        className="counter-buttons"
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
      >
        <Button variant="contained" onClick={increment}>
          +
        </Button>
        <Button variant="contained" onClick={reset}>
          Reset
        </Button>
        <Button variant="contained" onClick={decrement}>
          -
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
