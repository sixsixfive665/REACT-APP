import React, { useState, useEffect, useRef } from 'react';
import store from 'store/index'
import MyIcon from 'views/Components/MyIcon/MyIcon'
import { Menu } from 'antd';
import { createHashHistory } from 'history';
import './MenuContainer.scss'
import logoSvg from 'assets/images/logo.svg'
import Lockr from 'lockr/index'

const { SubMenu } = Menu;
const hashHistory = createHashHistory();
const MenuContainer = () => {
  const timer = useRef()
  timer.current = true
  const title = 'React Admin'
  const [collapsed, setCollapsed] = useState(store.getState().config.menuCollapsed)
  // const [selectedColor, setSelectedColor] = useState(store.getState().config.theme)
  const [current, setCurrent] = useState(hashHistory.location.pathname === '/login' ?
    (store.getState().router.routes[2] ? getCurrentPath(store.getState().router.routes) : '/index') : hashHistory.location.pathname)
  const defaultOpenKeys = defaultOpenKeysArr()
  function routeChildRecursion(routes) {
    if (routes[0].routes) {
      routeChildRecursion(routes[0].routes)
    } else {
      return routes[0].path
    }
  }
  function getCurrentPath(routes) {
    if (routes[2]) {
      if (routes[2].routes) {
        routeChildRecursion(routes[2].routes)
      } else {
        return routes[2].path
      }
    }
  }
  function defaultOpenKeysArr() {
    if ((Lockr.get('config') && !Lockr.get('config').menuCollapsed) || !Lockr.get('config')) {
      const currentPathName = hashHistory.location.pathname
      const levelNum = currentPathName.split('/').length - 1
      let nextIndex = 0
      let defaultOpenKeysArr = []
      for (let i = 0; i < levelNum - 1; i++) {
        nextIndex = currentPathName.indexOf('/', nextIndex + 1)
        defaultOpenKeysArr.push(currentPathName.slice(0, nextIndex))
      }
      return defaultOpenKeysArr
    } else {
      return []
    }
  }
  function handleClick(e) {
    // console.log('click ', e);
    if (hashHistory.location.pathname !== e.key) {
      setCurrent(e.key)
      hashHistory.push(e.key)
    }
  }
  function routeRecursion(routes) {
    // console.log(routes)
    const role = store.getState().user.role_name
    return routes.map((route) => {
      if (route.name && route.routes && (route.auth === undefined || route.auth === role || route.auth.includes(role))) {
        return <SubMenu key={route.path} title={
          <span>
            {route.icon ? <MyIcon icon={route.icon} style={{ fontSize: '14px' }} /> : ''}
            <span>{route.name}</span>
          </span>
        }>
          {routeRecursion(route.routes)}
        </SubMenu>
      } else if (route.name && (route.auth === undefined || route.auth === role || route.auth.includes(role))) {
        return <Menu.Item key={route.path}>{
          <span>
            {route.icon ? <MyIcon icon={route.icon} style={{ fontSize: '14px' }} /> : ''}
            <span>{route.name}</span>
          </span>
        }</Menu.Item>
      } else {
        return ''
      }
    })
  }
  useEffect(() => {
    hashHistory.listen((url) => {
      timer.current && setCurrent(url.pathname)
    })
    return () => {
      timer.current = false
    }
  }, [])
  const collapsedData = store.getState().config.menuCollapsed
  useEffect(() => {
    setCollapsed(collapsedData)
  }, [collapsedData])
  return (
    <div className="menu_container" style={{ width: collapsed ? '80px' : '256px' }}>
      <Menu
        id='scroll'
        onClick={handleClick}
        className="menu_fixed"
        style={{ width: collapsed ? '' : '256px' }}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={current}
        defaultOpenKeys={defaultOpenKeys}
      >
        <div className="logo" style={collapsed ? { textAlign: 'center' } : { marginLeft: '22px' }}>
          <img src={logoSvg} className="logo_svg" alt="logo" />
          <span style={{ marginLeft: '8px' }}>{collapsed ? '' : title}</span>
        </div>
        {/* 支持多级菜单 */}
        {routeRecursion(store.getState().router.routes)}
      </Menu>
    </div>
  );
};

export default MenuContainer;