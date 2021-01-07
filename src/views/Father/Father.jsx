import React, { useReducer } from 'react';
import store from 'store/index'
import renderRoutes from 'utils/renderRoutes'
import PersonalContext from 'utils/context'
import reducer from 'utils/reducer'

const Father = (props) => {
  const [state, dispatch] = useReducer(reducer, 0)
  return (
    <PersonalContext.Provider value={{
      userName: 'skuo company',
      state: state,
      dispatch: dispatch
    }}>
      <div style={{ textAlign: 'center' }}>
        Father:{state}
        {renderRoutes(props.route.routes, store.getState().user.role_name)}
      </div>
    </PersonalContext.Provider>
  );
};

export default Father;