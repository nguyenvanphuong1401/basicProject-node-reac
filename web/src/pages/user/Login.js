import React from 'react'
import {connect} from 'react-redux'
import {setCurrentUser, setDestination} from '../../actions'
import styled from 'styled-components'
import {Link, Redirect} from 'react-router-dom'
import { Form, Input, Button, notification } from 'antd'
import gql from '../../api/gql'
import _ from 'lodash'
import Loading from '../../components/Loading'
import logo from '../../assets/images/logo.png'

const Container = styled.div`
  margin: auto;
  text-align: center;
  padding: 25px;
`
class PageLogin extends React.Component{
  state = {
    loading: false,
  }

  handleLogin = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({loading: true})
        gql.login(values.email, values.password).then(user => {
          console.log(user)
        }).catch(err => {
          this.setState({loading: false})
          notification['error']({
            message: _.get(err, '[0].message')
          })
        })
      }
    });
  }

  render () {
    const {loading} = this.state
    const { getFieldDecorator } = this.props.form
    const {appInit, currentUser} = this.props
    if(!appInit) return <Loading/>
    if(currentUser) return <Redirect to="/profile"/>
    return (
      <Container>
        <img src={logo} style={{width:450}} alt="NiftyJS CRM"/>
        <h1 style={{color: '#8397A7', fontSize: 28,margin: '40px 0'}}>Please login to your account.</h1>
        <Form onSubmit={this.handleLogin} style={{textAlign: 'initial'}}>
          <Form.Item label={'Email:'}>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Email is required'}, { type: 'email', message: 'Email is not valid'}]
            })(<Input style={{textAlign: 'initial'}} placeholder="Email"/>)}
          </Form.Item>
          <Form.Item label={'Password:'}>
            {getFieldDecorator('password', {
              rules: [{required: true}]
            })(<Input.Password placeholder="Password"/>)}
          </Form.Item>
          <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: 20}}>
            <div style={{display: 'inline'}}>
              <Button type="primary" icon="check"/>
               &nbsp; &nbsp; Remember me
            </div>
            <Link to='/forgot-password-confirm-email'>Forgot password?</Link>
          </div>
          <Form.Item style={{textAlign: 'center'}}>
            <Button loading={loading} style={{background: '#0081FA', height: 40,
            borderRadius: 5, color: 'white', 
            border: 'none', width: '100%', 
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)'}} htmlType="submit">Login</Button>
          </Form.Item>
          <Form.Item style={{textAlign: 'center'}}>
            <Link className={'register-link'} to="/register">Create an account</Link>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  appInit: state.app.appInit,
  currentUser: state.app.currentUser,
  destination: state.app.destination
})

export default connect(
    mapStateToProps,
    {setCurrentUser, setDestination}
)(Form.create({name: 'login_form'})(PageLogin))