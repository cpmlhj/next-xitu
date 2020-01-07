import React, { memo, useState, useEffect, useRef } from 'react'
import { Select, List, Icon, Spin } from 'antd'
import { leftList } from '../types/constant'
import '../css/left.css'
import InfiniteScroll from 'react-infinite-scroller';


// 列表子元素
const ListItem = memo(function ListItem(props) {
      const { item } = props
      const openHTML = (url) => {
            window.open(url)
      }
      return <List.Item key={item.id} onClick={() => openHTML(item.url)} className='list-item'>
            <span className='list-item-meta'>
                  <Icon type="caret-up" />
                  {item.collectionCount}
            </span>
            <div className='list-item-content'>
                  <div>{item.title}</div>
                  <small>{item.user.username}</small>
            </div>
      </List.Item>
})

// 列表
const LeftList = memo(function leftList(props) {
      const { JueJin, setOffset, setFirstRender, JueJinLoading } = props
      const [hasMore, setHasMore] = useState(true)
      const handleLoadMore = () => {
            if (JueJin.length > 180) {
                  setHasMore(false)
                  return
            }
            setFirstRender(false)
            if (JueJinLoading) return
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
                  dataSource={JueJin}
                  renderItem={item => (
                        <ListItem item={item} />
                  )}
            >
            </List>
      </InfiniteScroll>
})

// 左侧栏
const Left = memo(function Left(props) {
      const [offset, setOffset] = useState(0)
      const [firstRender, setFirstRender] = useState(true)
      const { JueJin,
            JueJinCategory,
            JueJInOrder,
            setJueJinCategory,
            setJueJinOrder,
            setJueJinData,
            getJueJinData,
            JueJinLoading
      } = props
      const handleSelct = (data) => {
            if (data === JueJinCategory) return
            setJueJinCategory(data)
            setFirstRender(false)
            setJueJinData([])
            setOffset(0)
      }
      const handleChangeOrder = (order) => {
            if (order === JueJInOrder) return
            setJueJinOrder(order),
                  setFirstRender(false)
            setJueJinData([])
            setOffset(0)
      }
      useEffect(() => {
            if (firstRender) return
            getJueJinData(offset)
      }, [JueJinCategory, JueJInOrder, offset])
      const list = (
            <Select className='left-select'
                  style={{ width: 120 }}
                  defaultValue={leftList[1].text}
                  onChange={handleSelct}
            >
                  {
                        leftList.map(l => (
                              <Select.Option key={l.key}>
                                    <span className='search-select-text'>{l.text}</span>
                              </Select.Option>
                        ))
                  }
            </Select>
      )
      return <div className='left'>
            <div className="left-head">
                  <img className='left-img' src="/img/head.svg" alt="" />
                  <span className='left-title'>掘金</span>
                  {list}
                  <span className={'left-radio'} onClick={() => handleChangeOrder('heat')} style={{ marginLeft: '50px' }}>热门</span>
                  <span className={'left-radio'} onClick={() => handleChangeOrder('time')} >最新</span>
            </div>
            <div className='left-list'>
                  {
                        JueJin.length > 0 ? <LeftList JueJin={JueJin}
                              setOffset={setOffset}
                              JueJinLoading={JueJinLoading}
                              setFirstRender={setFirstRender}
                        /> :
                              <Spin tip="Loading..." className='loading-left'>
                              </Spin>
                  }

            </div>
      </div>
})

export default Left
