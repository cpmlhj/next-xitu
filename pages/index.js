import React, { memo, useMemo } from 'react'
import Layout from '../components/Layout'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Left from '../components/left'
import Right from '../components/right'
import '../css/index.css'
import {
      getJueJinData,
      getGitHubData,
      setGithubCategory,
      setGithubLang,
      setGithubPeriod,
      setJueJinData,
      setJueJinCategory,
      setJueJinOrder,
      setGitHubData,
} from '../store'
const Index = memo(function Index(props) {
      const { state: {
            JueJin,
            github,
            JueJinCategory,
            JueJInOrder,
            JueJinLoading,
            GitHubCategory,
            GitHubPeriod,
            GitHubLang,
            GithubLoading
      }, dispatch } = props
      const LeftActionCBS = useMemo(() => {
            return bindActionCreators({
                  setJueJinCategory,
                  setJueJinOrder,
                  getJueJinData,
                  setJueJinData,
            }, dispatch)
      }, [])
      const RightActionCBS = useMemo(() => {
            return bindActionCreators({
                  setGithubCategory,
                  setGithubLang,
                  setGithubPeriod,
                  getGitHubData,
                  setGitHubData
            }, dispatch)
      }, [])
      const headerActionCBS = useMemo(() => {
            return bindActionCreators({
                  setJueJinCategory,
                  setJueJinData,
                  getJueJinData
            }, dispatch)
      }, [])
      return <Layout {...headerActionCBS} JueJinCategory={JueJinCategory}>
            <div className='index'>
                  <Left
                        JueJin={JueJin}
                        JueJinLoading={JueJinLoading}
                        JueJinCategory={JueJinCategory}
                        JueJInOrder={JueJInOrder}
                        {...LeftActionCBS}
                  />
                  <Right github={github}
                        {...RightActionCBS}
                        GithubLoading={GithubLoading}
                        GitHubCategory={GitHubCategory}
                        GitHubPeriod={GitHubPeriod}
                        GitHubLang={GitHubLang}
                  />
            </div>
      </Layout>
})

Index.getInitialProps = async function ({ req, reduxStore }) {
      const { dispatch } = reduxStore
      await dispatch(getJueJinData())
      await dispatch(getGitHubData())
      return {

      }
}

function mapStateToProps(state) {
      return {
            state
      }
}
function mapDispatchToProps(dispatch) {
      return {
            dispatch
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)