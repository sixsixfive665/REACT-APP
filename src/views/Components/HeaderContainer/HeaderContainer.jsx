import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import store from 'store/index'
import './HeaderContainer.scss'
import { createHashHistory } from 'history';
import { Menu, Dropdown } from 'antd';
import Lockr from 'lockr/index'
const hashHistory = createHashHistory();

const HeaderContainer = () => {
  function toggleCollapsed() {
    store.dispatch({
      type: 'UpdateConfig',
      payload: {
        menuCollapsed: !store.getState().config.menuCollapsed
      }
    })
    Lockr.set('config', store.getState().config)
  }
  function handleLogout() {
    store.dispatch({
      type: 'FrontLogout'
    })
    store.dispatch({
      type: 'UpdateConfig',
      payload: {
        isLoading: true
      }
    })
    setTimeout(() => {
      store.dispatch({
        type: 'UpdateConfig',
        payload: {
          isLoading: false
        }
      })
      hashHistory.replace({
        pathname: '/login'
      })
    }, 1500);
  }
  function handleChageTheme() {
    let config = store.getState().config
    let nextTheme = config.themeColorArr.indexOf(config.theme) >= config.themeColorArr.length - 1 ? config.themeColorArr[0] : config.themeColorArr[config.themeColorArr.indexOf(config.theme) + 1]
    store.dispatch({
      type: 'UpdateConfig',
      payload: {
        theme: nextTheme
      }
    })
    Lockr.set('config', store.getState().config)
    window.document.documentElement.setAttribute('config-theme', store.getState().config.theme)
  }
  return (
    <div className="header_container">
      <i className="state_icon" onClick={toggleCollapsed}>
        {React.createElement(store.getState().config.menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </i>
      <div className="header_info">
        <Dropdown overlay={(<Menu>
          <Menu.Item>
            <span onClick={handleChageTheme}>
              切换主题
              </span>
          </Menu.Item>
          <Menu.Item>
            <span onClick={handleLogout}>
              退出登录
              </span>
          </Menu.Item>
        </Menu>)}>
          <div className="head_user_info">
            <div className="avatar_img"></div>
            <div className="header_user_name">{store.getState().user.user_name}</div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderContainer;