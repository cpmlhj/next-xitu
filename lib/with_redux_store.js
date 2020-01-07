/** 
 * @description for with_redux-store
*/

import React from 'react'
import { initializeStore } from '../store'

// 判断当前是否为服务端
const isServer = typeof window === 'undefined'

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

/**
 * 创建或获取store
 * @param {*} initialState  初始store
 */
function getOrCreateStore(initialState) {
      // 判断当前是否为服务端发起，若不是，共享store
      if (isServer) {
            return initializeStore(initialState)
      }
      // 判断客户端是否可用， 如不可用，创建store 放置到window
      if (!window[__NEXT_REDUX_STORE__]) {

            window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
      }
      return window[__NEXT_REDUX_STORE__]
}


export default App => {
      return class AppWithRedux extends React.Component {
            static async getInitialProps(appContext) {
                  const reduxStore = getOrCreateStore()
                  appContext.ctx.reduxStore = reduxStore
                  let appProps = {}
                  if (typeof App.getInitialProps === 'function') {
                        appProps = await App.getInitialProps(appContext)

                  }
                  return {
                        ...appProps,
                        initialReduxStore: reduxStore.getState()
                  }
            }
            constructor(props) {
                  super(props)
                  this.reduxStore = getOrCreateStore(props.initialReduxStore)
            }
            render() {
                  return <App {...this.props} reduxStore={this.reduxStore} />
            }
      }
}
