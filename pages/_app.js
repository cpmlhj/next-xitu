import App from 'next/app'
import WithReduxStore from '../lib/with_redux_store'
import React from 'react'
import { Provider } from 'react-redux'

class NewApp extends App {
      render() {
            const { Component, pageProps, reduxStore } = this.props
            return <Provider store={reduxStore}>
                  <Component  {...pageProps} />
            </Provider>
      }
}


export default WithReduxStore(NewApp)