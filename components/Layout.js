import React, { memo } from 'react'
import Header from './Header'
import '../css/layout.css'
const Layout = memo(function Layout(props) {
      const { setJueJinCategory,
            getJueJinData,
            setJueJinData, JueJinCategory } = props
      return <div>
            <Header
                  setJueJinCategory={setJueJinCategory}
                  setJueJinData={setJueJinData}
                  getJueJinData={getJueJinData}
                  JueJinCategory={JueJinCategory}
            />
            {props.children}
      </div>
})

export default Layout