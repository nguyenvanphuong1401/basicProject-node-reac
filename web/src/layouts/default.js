import React from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Icon, Drawer, Row, Col, Spin } from 'antd'
import {withWindowSizeListener} from 'react-window-size-listener'
import LeftMenu from '../components/LeftMenu'
import {Helmet} from "react-helmet"
//import SiteSelector from '../components/sites/SiteSelector'

const { Header, Sider, Content } = Layout;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
`
const LeftMenuToggle = styled.span`
  display: inline-flex;
  height: 64px;
  width: 64px;
  line-height: 64px;
  text-align: center;
  &:hover{
    background: rgba(0, 0, 0, 0.025);
  }
  i{
    font-size:20px;
    width: 100%;
    margin-top: 3px;
    line-height: 64px;
  }
`

const MOBILEWIDTH = 991

class defaultLayout extends React.Component{
  state = {
    collapsed: false,
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const {collapsed} = this.state
    const {windowSize, appInit} = this.props
    const {title, toolbar} = this.props
    if (!appInit) return <Spin/>
    return (
      <Container>
        {this.props.title && <Helmet><title>{this.props.title} - NiftyJS CRM</title></Helmet>}
        <Layout>
          <Layout
            style={{
              display: `${windowSize.windowWidth > MOBILEWIDTH ? 'grid':'unset'}`,
              gridTemplateColumns: `${collapsed ? '80px' : '220px'} auto`
            }}
          >
            <div>
              {windowSize.windowWidth > MOBILEWIDTH ? <Sider width={220} style={{height:'100%'}} trigger={null} collapsible collapsed={collapsed}>
              <LeftMenu/>
              </Sider> : <Drawer headerStyle={{
                  padding:'7px 24px', 
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  height:'100%'
                }} 
                drawerStyle={{
                  minHeight:'100%',
                  backgroundColor:'#001529'
                }} 
                bodyStyle={{
                  padding: 0
                }} 
                visible={collapsed} 
                placement="left" 
                closable={false} 
                maskClosable={true} 
                onClose={e => {
                  this.setState({
                    collapsed: false
                  })
                }}>
              <LeftMenu/>
              </Drawer>}
            </div>
            <div style={{width: '100%',position: 'relative', zIndex: 2, overflow:'auto', display:'grid', gridTemplateRows:'64px 71px auto 51px'}}>
              <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyItems:'center' }}>
                <Row type="flex" style={{width:"calc(100%)", paddingRight: 15}}>
                  <Col span={12} lg={18} style={{display:'flex', alignItems:'center'}}>
                    <LeftMenuToggle>
                      <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                        />
                    </LeftMenuToggle>
                    {/* <SiteSelector/> */}
                  </Col>
                  <Col span={12} lg={6}>
                    <div>UserMenu</div>
                  </Col>
                </Row>
              </Header>
              <Row type="flex" style={{alignItems:'center', padding: '0 20px'}}>
                <Col span={24} md={12}>
                  <h2 style={{margin: '20px 0'}}>{title} </h2>
                </Col>
                <Col span={0} md={12} style={{textAlign:'right'}}>
                  {toolbar}
                </Col>
              </Row>
              <Content style={{boxSizing:'border-box', maxWidth:'100vw', overflow:'hidden', background: '#F7F9FB', padding: '20px', /*minHeight: 'calc(100% - 117px)', maxHeight: 'calc(100% - 117px)',*/ borderTop: '1px solid rgb(227, 233, 240)', borderBottom: '1px solid rgb(227, 233, 240)'}}>
                <div style={{
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden'
                  }}>
                  <Route {...this.props} />
                </div>
              </Content>
              <Layout.Footer>NiftyJS ©2020 Created by NiftyJS</Layout.Footer>
            </div>
          </Layout>
        </Layout>
      </Container>
    )
  }
}

export default connect(
  state => {
    return {
      appInit: state.app.appInit,
      currentUser: state.app.currentUser
    }
  }
)(withWindowSizeListener(defaultLayout))