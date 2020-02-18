import React, {Component} from 'react'
import { Button } from 'antd'
import {history} from '../history'

export default class Page404 extends Component{
  handleBacktoHome = (e) => {
    e.preventDefault()
    history.push('/admin/users-manager')
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',  
        alignItems: 'center',
        bottom: 150,
        width: '100%',
      }}>
        <Button 
          style={{
            width: 300,
            textAlign: 'center',
            fontSize: 26,
            height: 40,}} 
            onClick={this.handleBacktoHome}>
          Back to Home
        </Button>
      </div>
    )
  }
}