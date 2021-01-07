import React, { Component } from 'react';
import renderRoutes from './utils/renderRoutes'
import { HashRouter as Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import store from 'store/index'
import 'App.scss'
import { Spin } from 'antd';
import Lockr from 'lockr/index'
import MenuContainer from 'views/Components/MenuContainer/MenuContainer'
import HeaderContainer from 'views/Components/HeaderContainer/HeaderContainer'
import FooterContainer from 'views/Components/FooterContainer/FooterContainer';
import requestRoutes from 'router/index'

const hashHistory = createHashHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pathName: hashHistory.location.pathname
    }
    store.subscribe(() => {
      // console.log(store.getState())
      this.setState({
        isLoading: store.getState().config.isLoading
      })
    })
    hashHistory.listen((route) => {
      // console.log(route)
      this.setState({
        pathName: route.pathname
      })
    })
  }

  render() {
    const token = Lockr.get('token')
    return (
      <Router>
        <div className="all_container">
          {/* loading遮罩层 */}
          {this.state.isLoading ? <div className="loading_modal">
            <Spin className="loading_spin" size="large" spinning={this.state.isLoading === true} delay={0} />
          </div> : ''}
          {/* 菜单栏 */}
          {this.state.pathName !== '/login' && token ? <MenuContainer></MenuContainer> : ''}
          <div className="main_container">
            {/* Header区域 */}
            {this.state.pathName !== '/login' && token ? <HeaderContainer></HeaderContainer> : ''}
            {/* 渲染匹配路径的路由组件 */}
            <div className="content_container" style={this.state.pathName !== '/login' ? { padding: '20px 20px 0' } : {}}>
              <div className={this.state.pathName !== '/login' ? 'content_container_bg' : ''}>
                {renderRoutes(store.getState().router.routes, store.getState().user.role_name)}
              </div>
            </div>
            {/* Footer区域 */}
            <FooterContainer></FooterContainer>
          </div>
        </div>
      </Router >
    );
  }

  componentDidMount() {
    // console.log(store.getState().config)
    window.document.documentElement.setAttribute('config-theme', store.getState().config.theme)
    requestRoutes()
    console.log("%c年轻人偷看源码，不讲武德！", "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;color:yellow;");
  }
}

export default App;