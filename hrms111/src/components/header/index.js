import React, { Component } from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dataUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import { Modal} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button/index'


const { confirm } = Modal;
/* 头部导航组件 */
class Header extends Component {
  state={
    currentTime:formateDate(Date.now()),
  }
/* 获得标题 */
getTitle=()=>{
  const path =this.props.location.pathname
  let title
  menuList.forEach(item=>{
    if(item.key===path){//如果当前item对象的key与path匹配,item的title就是显示的title
      title=item.title
    }else if(item.children){
      //在所有的子item中查找匹配
     const cItem= item.children.find(cItem=>path.indexOf(cItem.key)===0)
     if(cItem){
       title=item.title+'/'+cItem.title
     }
    }
  })
  return title
}

  /* 退出登录 */
  logout=()=>{
    confirm({
      icon: <QuestionCircleOutlined />,
      content: '您确定要退出吗?',
      onOk:()=> {//用箭头函数解决this问题
        //删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user={}
        //跳转到login界面
        this.props.history.replace('/login')
      },

    })
  }
  /* 每秒钟更新一次 */
  getTime=()=>{
    this.intervalId=setInterval(()=>{
      const currentTime=formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }
  /* 第一次render之后操作一次,异步:ajax,定时器 */
  componentDidMount(){
    this.getTime()
  }

  /* 当前组件卸载之前调用 */
  componentWillUnmount(){
    //清除定时器
    clearInterval(this.intervalId)
  }
  render() {
    const {currentTime}=this.state
    const user=memoryUtils.user.id
    const title=this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{user}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
