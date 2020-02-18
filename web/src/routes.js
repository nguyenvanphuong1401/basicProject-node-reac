import { Router, Switch } from 'react-router-dom'
import { history } from './history'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DefaultLayout from './layouts/default'
import LoginLayout from './layouts/login'
import { Spin } from 'antd'
import gql from './api/gql'
import { setDestination } from './actions'
import LoginPage from './pages/user/Login'
import Page404 from './pages/404'
import Blank from './layouts/blank'
const routers = [
  {
    path: '/',
    component: LoginPage,
    exact: true,
    layout: LoginLayout,
    title: 'Ray Shose'
  },
  {
    component: Page404,
    layout: Blank
  }
]

export default () => {
  return (
    <Router history={history}>
      <Switch>
        {routers.map((router, index) => {
          if (router.layout) {
            return <router.layout {...router} key={index} />
          } else {
            return <DefaultLayout {...router} key={index} />
          }
        })}
      </Switch>
    </Router>
  )
}

function Auth(ComposedComponent) {
  class Auth extends React.Component {
    checkAuth() {
      const { match, history } = this.props
      this.props.setDestination(match)
      var token = gql.getToken()
      if (!token) {
        history.push('/login')
      }
    }
    UNSAFE_componentWillMount() {
      this.checkAuth()
    }

    UNSAFE_componentWillUpdate(nextProps) {
      this.checkAuth()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    render() {
      const { currentUser } = this.props
      if (!currentUser) {
        return <div style={{textAlign:'center'}}><Spin /></div>
      } else {
        return <ComposedComponent {...this.props} />
      }
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.app.currentUser
  })

  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
  return connect(
    mapStateToProps,
    { mapDispatchToProps, setDestination }
  )(Auth)
}