import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Lockr from 'lockr/index'


/**
 * 将路由配置渲染成节点
 * @param {Array} routes switch路由列表
 * @param {String|Number} authed 当前账号权限,不传则可以访问该routes列表的所有路由
 * @param {Array} multipleRoutes 非switch路由列表，将会在Switch节点前渲染Route
 * @param {Object} extraProps 添加额外的Route props
 * @param {Object} switchProps Switch props
 */
function renderRoutes(routes, authed, multipleRoutes, extraProps, switchProps) {
  let list = [];
  if (authed) authed = String(authed);
  const token = Lockr.get('token')
  const mapFunc = (R) =>
    R.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          // renderRoutes里写了用户权限，自动往子路由下传，方便获取当前登录权限
          route.authed = authed;

          // auth是字符串则添加数组包裹,是数组则遍历字符串化，方便下面的判断
          if (typeof route.auth === "string" || typeof route.auth === "number") {
            route.auth = [route.auth.toString()];
          } else if (Object.prototype.toString.call(route.auth) === "[object Array]") {
            route.auth.forEach((val, idx) => (route.auth[idx] = String(val)));
          }

          /**
           * 判断渲染Route
           * 1、如果路由列表没写auth则默认是可访问的
           * 2、如果renderRoute方法没传authed(当前用户权限)，也是可以访问的(前提是符合1条件)
           * 3、如果即在路由列表写了权限，又添加用户权限，则判断用户权限是否存在路由权限中
           */
          if (!route.auth || authed === undefined || route.auth.includes(authed)) {
            if (!token && !route.notNeedLogin) {
              // 未登录 需要登录授权页
              return <Redirect to={"/login"} />
            } else {
              return route.render
                ? route.render({ ...props, ...extraProps, route: route })
                : route.component && <route.component {...props} {...extraProps} route={route} />;
            }
          } else {
            return <Redirect to={"/exception403"} />
          }
        }}
      />
    ));

  if (routes) {
    list.push(
      <Switch {...switchProps} key="SwitchRoutes">
        {mapFunc(routes)}
      </Switch>
    );
    multipleRoutes && list.unshift(...mapFunc(multipleRoutes));
    return list;
  }
}

export default renderRoutes