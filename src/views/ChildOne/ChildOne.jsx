import React from 'react';
import store from 'store/index'
import renderRoutes from 'utils/renderRoutes'

const ChildOne = (props) => {
  return (
    <div>
      ChildOne
      {renderRoutes(props.route.routes, store.getState().user.role_name)}
    </div>
  );
};

export default ChildOne;