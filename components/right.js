import React, { memo, useState, useEffect } from 'react'
import { Select, List, Icon, Spin } from 'antd'
import { Category, period, lang } from '../types/constant'
import '../css/right.css'
import InfiniteScroll from 'react-infinite-scroller';

// 列表子元素
const ListItem = memo(function ListItem(props) {
      const { item } = props
      const openHTML = (url) => {
             window.open(url)
      }
      return <List.Item key={item.id} onClick={() => openHTML(item.url)} className='right-list-item'>
            <p>{item.username} -/ {item.reponame}</p>
            <p>{item.description}</p>
            <div className='list-item-bottom'>
                  <span className='list-item-bottom-item'>
                        <Icon type="star" theme="filled" />
                        <small>{item.starCount}</small>
                  </span>
                  <span className='list-item-bottom-item'>
                        <Icon type="link" />
                        <small>{item.forkCount}</small>
                  </span>
                  <span className='list-item-bottom-item'>
                        <i className='list-item-bottom-item-i'></i>
                        <small>{item.lang}</small>
                  </span>
            </div>
      </List.Item>
})

// 列表
const RightList = memo(function RightList(props) {
      const { github, setFirstRender, GithubLoading, setOffset } = props
      const [hasMore, setHasMore] = useState(true)
      const handleLoadMore = () => {
            if (github.length > 180) {
                  setHasMore(false)
                  return
            }
            setFirstRender(false)
            if (GithubLoading) return
            setOffset(offset => offset += 30)
      }
      return <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            threshold={150}
            loadMore={() => handleLoadMore()}
            hasMore={hasMore}
            useWindow={false}
      >
            <List
                  dataSource={github}
                  grid={{ gutter: 16, column: 2 }}
                  renderItem={item => (
                        <ListItem item={item} />
                  )}
            >
            </List>
      </InfiniteScroll>
})

// 顶部选择框
const SelectList = memo(function SelectList(props) {
      const { list, width, keys, handleChangeGithub } = props
      const handleSelct = (data) => {
            handleChangeGithub(keys, data)
      }
      return <Select className='right-select'
            style={{ width: width ? width : 100 }}
            defaultValue={list[0].text}
            onChange={handleSelct}
      >
            {
                  list.map(l => (
                        <Select.Option key={l.key}>
                              <span className='search-select-text'>{l.text}</span>
                        </Select.Option>
                  ))
            }
      </Select>
})

// 右侧栏
const Right = memo(function Right(props) {
      const { github,
            setGithubCategory,
            setGithubLang,
            setGithubPeriod,
            getGitHubData,
            GitHubCategory,
            GitHubPeriod,
            GitHubLang,
            setGitHubData,
            GithubLoading
      } = props
      const [offset, setOffset] = useState(0)
      const [firstRender, setFirstRender] = useState(true)
      const handleChangeGithub = (key, data) => {
            switch (key) {
                  case 'category':
                        if (data === GitHubCategory) return;
                        setGithubCategory(data)
                        break;
                  case 'period':
                        if (data === GitHubPeriod) return;
                        setGithubPeriod(data)
                        break;
                  case 'lang':
                        if (data === GitHubLang) return;
                        setGithubLang(data)
                        break;
                  default:
                        break;

            }
            setFirstRender(false)
            setGitHubData([])
            setOffset(0)
      }
      useEffect(() => {
            if (firstRender) return
            getGitHubData(offset)
      }, [GitHubCategory, GitHubPeriod, GitHubLang, offset])
      return <div className='right'>
            <div className="right-head">
                  <img className='right-img' src="/img/github.png" alt="" />
                  <span className='right-title'>GitHub</span>
                  <SelectList
                        list={Category}
                        keys={'category'}
                        handleChangeGithub={handleChangeGithub}

                  />
                  <SelectList list={period}
                        keys={'period'}
                        handleChangeGithub={handleChangeGithub}
                  />
                  <div style={{ marginLeft: 'auto' }}>
                        <SelectList list={lang}
                              width={140}
                              keys={'lang'}
                              handleChangeGithub={handleChangeGithub}
                        />
                  </div>
            </div>
            <div className='right-list'>
                  {
                        github.length > 0 ? <RightList github={github}
                              GithubLoading={GithubLoading}
                              setFirstRender={setFirstRender}
                              setOffset={setOffset}
                        /> : <Spin tip="Loading..." className='loading-left'>
                              </Spin>
                  }
            </div>
      </div>
})

export default Right