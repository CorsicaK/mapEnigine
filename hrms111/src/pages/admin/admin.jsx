import React, { Component } from 'react'
/* 
//判断登录的插件
import memoryUtils from '../../utils/memoryUtils'
*/
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/'
import Header from '../../components/header/'
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import NotFound from '../not-found/not-found'

const { Footer, Sider, Content } = Layout;

/* 管理的路由组件 */
export default class Admin extends Component {
  render() {
    /* 
    //判断登录,接上接口之后再实现
     const user=memoryUtils.user
     //如果内存中没有存储user==>当前未登录
     if(!user||!user._id){
       //自动跳转到登录界面(在render()中)
       return <Redirect to='./login'/>
     } 
     
     */
    return (  
        <Layout style={{height:"100vh"}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{margin:20, backgroundColor:"white"}}>
              <Switch>
                <Redirect exact={true} from='/' to='/home'/>
                <Route path='/home' component={Home}></Route>
                <Route path='/category' component={Category}></Route>
                <Route path='/product' component={Product}></Route>
                <Route path='/role' component={Role}></Route>
                <Route path='/user' component={User}></Route>
                <Route path='/charts/bar' component={Bar}></Route>
                <Route path='/charts/line' component={Line}></Route>
                <Route path='/charts/pie' component={Pie}></Route>
                <Route component={NotFound}></Route>
                
              </Switch>
            </Content>
            <Footer style={{textAlign:"center" ,color:"#ccc"}}>推荐使用谷歌浏览器</Footer>
          </Layout>
        </Layout> 
    )
  }
}
