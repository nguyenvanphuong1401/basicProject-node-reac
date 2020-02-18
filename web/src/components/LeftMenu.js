import React from 'react'
import {Menu, Icon} from 'antd'
import {adminMenu} from '../menu'
import { Link, withRouter } from 'react-router-dom'

class LeftMenu extends React.Component {
  render () {
    const { location } = this.props;
    const { SubMenu } = Menu
    return (
      <div className={'left-menu'}>
        <img src="/logo.png" alt="" style={{padding: "5px 15px", height: 64}}/>
        <Menu 
          defaultOpenKeys={['system-setting']}
          theme="dark"
          mode="inline" selectedKeys={[location.pathname]}>
          {adminMenu.map(menu => {
            return (
              menu.child?(
                <SubMenu
                  key="system-setting"
                  title={
                    <span>
                      {menu.icon && <Icon type={menu.icon}/>}
                      <span>{menu.title}</span>
                    </span>
                  }
                >
                  {
                    menu.child.map(sub => {
                      return(
                        <Menu.Item key={sub.router}>
                          <Link to={sub.router}>
                            {sub.icon && <Icon type={sub.icon}/>}
                            <span>{sub.title}</span>
                          </Link>
                        </Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              ) :(
            <Menu.Item key={menu.router}>
              <Link to={menu.router}>
                {menu.icon && <Icon type={menu.icon}/>}
                <span>{menu.title}</span>
              </Link>
            </Menu.Item>
            )
          )})}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftMenu)