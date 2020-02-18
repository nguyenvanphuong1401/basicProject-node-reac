import React from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Layout } from 'antd'
import {Helmet} from "react-helmet"
import background from '../assets/images/background.jpg';
import moment from 'moment'

const { Content } = Layout;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
`

class blankLayout extends React.Component{
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
        <Layout style={{display: 'grid',
            justifyContent: 'end',}}>
          <Layout 
          style={{backgroundImage: `url(${background})`,
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 1,}}
            > 
          </Layout>
          <Content style={{position: 'relative',
              padding: '0 40px',
              zIndex: 10,
              height: '100%',
              background: 'white'}}>
            <div style={{
              height: 'calc(100% - 69px)',
              display: 'grid',
              justifyContent: 'end',
              alignContent: 'center',
            }}>
                <Route {...this.props} />
              </div>
              <Layout.Footer style={{ textAlign: 'center', backgroundColor:'white', color: '#A1A9B4'}}>Ray Shose ©{moment().format("YYYY")} Created by RayDavid</Layout.Footer>
          </Content>
        </Layout>
      </Container>
    )
  }
}

export default connect(
  state => ({})
)(blankLayout)