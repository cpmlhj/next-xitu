import { applyMiddleware, createStore, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import SystemService from './serve'
import { composeWithDevTools } from 'redux-devtools-extension'
// state
const initState = {
      selectTypes: 'frontend',
      JueJin: [],
      github: [],
      JueJinCategory: 'frontend',
      JueJInOrder: 'heat',
      JueJinLoading: false,
      GithubLoading: false,
      GitHubCategory: 'trending',
      GitHubPeriod: 'day',
      GitHubLang: 'javascript',
}

// types
export const actionTypes = {
      ACTION_GET_JUE_JIN_DATA: 'ACTION_GET_JUE_JIN_DATA',
      ACTION_SET_JUEJIN_DATA: 'ACTION_SET_JUEJIN_DATA',
      ACTION_SET_JUEJIN_CATEGORY: 'ACTION_SET_JUEJIN_CATEGORY',
      ACTION_SET_JUEJIN_ORDER: 'ACTION_SET_JUEJIN_ORDER',
      ACTION_SET_JUEJIN_LOADING: 'ACTION_SET_JUEJIN_LOADING',
      ACTION_SET_GIT_HUB_DATA: 'ACTION_SET_GIT_HUB_DATA',
      ACTION_SET_GIT_HUB_CATEGORY: 'ACTION_SET_GIT_HUB_CATEGORY',
      ACTION_SET_GIT_HUB_PERIOD: 'ACTION_SET_GIT_HUB_PERIOD',
      ACTION_SET_GIT_HUB_LANG: 'ACTION_SET_GIT_HUB_LANG',
      ACTION_SET_GIT_HUB_LOADING: 'ACTION_SET_GIT_HUB_LOADING'
}

// Actions
export function setJueJinData(list) {
      return {
            type: actionTypes.ACTION_SET_JUEJIN_DATA,
            payload: list
      }
}
export function setGitHubData(list) {
      return {
            type: actionTypes.ACTION_SET_GIT_HUB_DATA,
            payload: list
      }
}
export function setJueJinCategory(category) {
      return {
            type: actionTypes.ACTION_SET_JUEJIN_CATEGORY,
            payload: category
      }
}
export function setJueJinOrder(order) {
      return {
            type: actionTypes.ACTION_SET_JUEJIN_ORDER,
            payload: order
      }
}

export function setJueJinLoading(loading) {
      return {
            type: actionTypes.ACTION_SET_JUEJIN_LOADING,
            payload: loading
      }
}
export function setGitHubLoading(loading) {
      return {
            type: actionTypes.ACTION_SET_GIT_HUB_LOADING,
            payload: loading
      }
}

export function setGithubCategory(category) {
      console.log(category, 'categorycategorycategory')
      return {
            type: actionTypes.ACTION_SET_GIT_HUB_CATEGORY,
            payload: category
      }
}
export function setGithubPeriod(period) {
      return {
            type: actionTypes.ACTION_SET_GIT_HUB_PERIOD,
            payload: period
      }
}

export function setGithubLang(lang) {
      return {
            type: actionTypes.ACTION_SET_GIT_HUB_LANG,
            payload: lang
      }
}

export function getJueJinData(offset = 0) {
      return async (dispatch, getState) => {
            const { JueJin, JueJinCategory, JueJInOrder } = getState()
            dispatch(setJueJinLoading(true))
            await SystemService.getJueJinData({
                  JueJinCategory, JueJInOrder, offset
            }).then(res => {
                  if (res.code === 200) {
                        dispatch(setJueJinLoading(false))
                        dispatch(setJueJinData(JueJin.concat(res.data)))

                  }
            })
      }
}
export function getGitHubData(offset = 0) {
      return async (dispatch, getState) => {
            const { github, GitHubCategory, GitHubPeriod, GitHubLang } = getState()
            dispatch(setGitHubLoading(true))
            await SystemService.getGitHubData({
                  GitHubCategory, GitHubPeriod, GitHubLang, offset
            }).then(res => {
                  if (res.code === 200) {
                        dispatch(setGitHubLoading(false))
                        dispatch(setGitHubData(github.concat(res.data)))
                  }
            })
      }
}

// Reducers

export const reducer = {
      JueJin: (state = [], action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_JUEJIN_DATA:
                        return payload;
                  default:
                        return state
            }
      },
      github: (state = [], action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_GIT_HUB_DATA:
                        return payload;
                  default:
                        return state
            }
      },
      JueJinCategory: (state = '', action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_JUEJIN_CATEGORY:
                        return payload;
                  default:
                        return state
            }
      },
      JueJInOrder: (state = '', action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_JUEJIN_ORDER:
                        return payload;
                  default:
                        return state
            }
      },
      JueJinLoading: (state = false, action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_JUEJIN_LOADING:
                        return payload;
                  default:
                        return state
            }
      },
      GithubLoading: (state = false, action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_GIT_HUB_LOADING:
                        return payload;
                  default:
                        return state
            }
      },
      GitHubCategory: (state = '', action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_GIT_HUB_CATEGORY:
                        return payload;
                  default:
                        return state
            }
      },
      GitHubPeriod: (state = '', action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_GIT_HUB_PERIOD:
                        return payload;
                  default:
                        return state
            }
      },
      GitHubLang: (state = '', action) => {
            const { type, payload } = action
            switch (type) {
                  case actionTypes.ACTION_SET_GIT_HUB_LANG:
                        return payload;
                  default:
                        return state
            }
      },
}

export function initializeStore(initialState = initState) {
      return createStore(
            combineReducers(reducer),
            initialState,
            composeWithDevTools(applyMiddleware(reduxThunk))
      )
}


