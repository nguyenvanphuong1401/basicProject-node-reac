import axios from 'axios'
import _ from 'lodash'
import {API_URL, AWS_CLOUDFRONT_URL} from '../config'

class Gql {
  constructor(){
    this.endpoint = `${API_URL}`
    this.token = localStorage.getItem('_token')
  }

  getToken = () => {
    console.log("token: ", localStorage.getItem('_token'))
    return localStorage.getItem('_token')
  }

  /**
   * 
   */
  request = (query, variables = null) => {
    console.log(this.endpoint)
    return new Promise((rs, rj) => {
      let requestOptions = {
        url: this.endpoint,
        method: 'post',
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
        withCredentials: false,
        data: {
          query, variables
        }
      }
      axios(requestOptions).then(res => {
        if(_.get(res, 'data.errors')) return rj(res.data.errors)
        return rs(res.data.data)
      }).catch(err => rj(err))
    })
  }

  login = async (email, password) => {
    const q = `mutation login($email: String!, $password: String!){
      login(email: $email, password: $password){
        id,user{firstName,lastName,roles},expired
      }
    }`
    return this.request(q, {email, password}).then(res => {
      const {token, user} = res.login
      localStorage.setItem('_token', token)
      return Promise.resolve(user)
    }).catch(err => Promise.reject(err))
  }

  createSignedUrl(file) {
    const q = `mutation createSignedUrl($filename: String!, $filemime: String!){
      createSignedUrl(filename: $filename, fileMime: $filemime){
        key, url
      }
    }`
    return new Promise(resolve => {
      this.request(q, {
        filename: file.name,
        filemime: file.type,
      }).then(res => resolve(res.createSignedUrl)).catch(() => resolve(null))
    })
  }

  async s3Upload(file, onProcess = e => {}){
    const s3Obj = await this.createSignedUrl(file)
    if (s3Obj) {
      return new Promise((resolve, reject) => {
        axios.put(s3Obj.url, file, {
          onUploadProgress: onProcess,
          headers: {'Content-Type': file.type}
        }).then(async res => resolve({
          file: file,
          key: s3Obj.key,
          url: await this.getFileUrl(s3Obj.key)
        })).catch(err => reject(err))
      })
    }
  }

  getFileUrl = key => {
    return `${AWS_CLOUDFRONT_URL}/${key}`
  }

  createDropboxSignedUrl(path) {
    const q = `mutation createDropboxSignedUrl{createDropboxSignedUrl(path:"${path}"){url, path}}`
    return new Promise(resolve => {
      this.request(q).then(res => resolve(res.createDropboxSignedUrl)).catch(() => resolve(null))
    })
  }

  getDropboxFile = path => {
    const q = `query getDropboxFile{getDropboxFile(path:"${path}"){id,name,url}}`
    return new Promise(resolve => {
      this.request(q).then(res => resolve(res.getDropboxFile)).catch(() => resolve(null))
    })
  }

  async dropboxUpload(file, path = '', onProcess = e => {}){
    const signedUrl = await this.createDropboxSignedUrl(path + '/' + file.name)
    if (signedUrl) {
      return new Promise((resolve, reject) => {
        axios.post(signedUrl.url, file, {
          onUploadProgress: onProcess,
          headers: {'Content-Type': 'application/octet-stream'}
        }).then(async res => {
          var entry = await this.getDropboxFile(`/niftyjs/${signedUrl.path}`)
          resolve({
            key: entry.id,
            file: file, 
            name: entry.name,
            url: entry.url
          })
        }).catch(err => reject(err))
      })
    }
  }
}

export default new Gql()