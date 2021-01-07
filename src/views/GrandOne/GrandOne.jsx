import React, { useRef, useEffect, useReducer } from 'react';

const GrandOne = () => {
  const timer = useRef()
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return state + 1

      default:
        return state
    }
  }, 996)
  useEffect(() => {
    timer.current = setInterval(() => {
      dispatch({ type: 'add' })
    }, 1000);
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  return (
    <div>
      GrandOne
      {count}
    </div>
  );
};

export default GrandOne;