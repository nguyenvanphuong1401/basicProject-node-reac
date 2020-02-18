import React from 'react'
import {Table as AntTable, Pagination} from 'antd'

export default class Table extends React.Component{
  render() {
    const {pagination} = this.props
    return (
      <div>
        <div style={{overflow:'auto', maxWidth:'100%', boxSizing:'border-box'}}>
          <div style={{minWidth:1200}}>
            <AntTable {...this.props} pagination={false}/>
          </div>
        </div>
        {pagination && <Pagination {...pagination} showTotal={null} style={{marginTop:20, textAlign:'center'}}/>}
      </div>
    )
  }
}