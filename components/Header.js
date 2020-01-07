import React, { memo, useEffect, useState } from 'react'
import '../css/header.css'
import { LanguageList } from '../types/constant'
import { Input, Icon, Select } from 'antd'

const Header = memo(function Header(props) {
      const { setJueJinCategory, setJueJinData, JueJinCategory, getJueJinData } = props
      const [firstRender, setFirstRender] = useState(true)
      const handleSelct = (data) => {
            if (data === JueJinCategory) return
            setFirstRender(false)
            setJueJinCategory(data)
            setJueJinData([])
      }
      useEffect(() => {
            if (firstRender) return
            getJueJinData(0)
      }, [JueJinCategory])
      const menu = (
            <Select style={{ width: 120 }} onChange={handleSelct} defaultValue={LanguageList[0].text}>
                  {
                        LanguageList.map((l, index) => (
                              <Select.Option key={l.key}>
                                    <Icon className='search-select' type={l.icon} />
                                    <span className='search-select-text'>{l.text}</span>
                              </Select.Option>
                        ))
                  }
            </Select>
      )
      return <div className='header'>
            <img className='img' src="/img/logo.svg" alt="" />
            <div className='search-input'>
                  <Input placeholder="掘进搜索, 如: Java, 阿里巴巴, 前端面试" />
            </div>
            <div className="book-binner">
                  <Icon type="book" />
                  <span>掘进小册</span>
            </div>
            <div className="book-binner">
                  <Icon type="cloud-download" />
                  <span>下载掘金App</span>
            </div>
            <div className="book-binner">
                  {menu}
            </div>
      </div>
})

export default Header