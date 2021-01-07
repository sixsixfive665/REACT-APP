import React from 'react'
import { Redirect } from "react-router-dom";
import store from 'store/index'
import { routes as routesApi } from 'api/mock'
import Login from 'views/Login/Login'
import Exception403 from 'views/Exception/Exception403'
import Exception404 from 'views/Exception/Exception404'
import componentMap from './componentMap'

function routeRecursion(routes, isRoot) {
  // console.log(routes)
  routes.forEach(route => {
    componentMap(route)
    if (route.routes) {
      routeRecursion(route.routes, false)
    }
  })
  if (!isRoot) {
    routes.push({
      path: "*",
      render: () => <Redirect to={"/exception404"} />
    })
  }
}
const requestRoutes = () => {
  const routes = [
    {
      path: "/",
      exact: true,
      render: () => <Redirect to={"/login"} />
    },
    {
      path: "/login",
      component: Login,
      notNeedLogin: true
    },
    {
      path: '/exception403',
      component: Exception403,
      notNeedLogin: true
    },
    {
      path: '/exception404',
      component: Exception404,
      notNeedLogin: true
    },
    {
      path: "*",
      render: () => <Redirect to={"/exception404"} />
    }
  ]
  routesApi().then(res => {
    const resData = res.data
    routeRecursion(resData.routes, true)
    routes.splice(2, 0, ...resData.routes)
    // console.log(routes)
    store.dispatch({
      type: 'UpdateRouter',
      payload: {
        routes: routes
      }
    })
  })
}

export default requestRoutes;