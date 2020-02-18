import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import rootSaga from './sagas'
import * as serviceWorker from './serviceWorker'
import configureStore from './store'
import {ApolloProvider} from '@apollo/react-hooks'
import {apolloClient} from './client'
import './assets/css/style.scss'
//import './assets/css/style.scss'

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render((
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
    <App />
    </ApolloProvider>
  </Provider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
