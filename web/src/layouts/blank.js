import React from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Layout } from 'antd'
import {Helmet} from "react-helmet"

const { Content } = Layout;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
`

class Blank extends React.Component{
  state = {
    collapsed: false,
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    return (
      <Container>
        {this.props.title && <Helmet><title>{this.props.title}</title></Helmet>}
        <Layout>
          <Content>
            <Route {...this.props} />
          </Content>
        </Layout>
      </Container>
    )
  }
}

export default connect(
  state => ({})
)(Blank)