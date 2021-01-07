import React, { useContext } from 'react';
import Context from 'utils/context'

const GrandTwo = () => {
  const { state, dispatch } = useContext(Context);
  return (
    <div onClick={() => {
      dispatch({ type: 'add' })
    }}>
      GrandTwo
      <br />
      Grand:{state}
    </div>
  );
};

export default GrandTwo;