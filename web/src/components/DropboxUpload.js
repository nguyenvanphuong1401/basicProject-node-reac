import React, { Component } from 'react'
import { Upload as AntUpload, message } from 'antd'
import gql from '../api/gql'

export default class DropboxUpload extends Component {

  uploadAction = file => {
    const { onUpload, onProcess } = this.props
    var path = this.props.path || ''
    gql.dropboxUpload(file, path, onProcess).then(res => {
      if (typeof onUpload === 'function') {
        onUpload(res)
      }
    }).catch(err => {
      message['error']('Could not upload file')
    })
  }

  render() {
    return (
      <AntUpload
        {...this.props}
        action={this.uploadAction}
        customRequest={file => { }}
      >
        {this.props.children}
      </AntUpload>
    )
  }
}