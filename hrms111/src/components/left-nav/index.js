import React, { Component } from 'react'
import logo from './images/logo.jpg'
import './index.less'
import { Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
/* import { HomeOutlined, PieChartOutlined, MailOutlined, } from '@ant-design/icons'; */
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
/* 左侧导航组件 */
class LeftNav extends Component {
  /* 
    //根据menu的数据数组生成对应的标签数组
    //方法一:
      //使用map()+递归调用的方法
   
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }
    })
  }
  */
  /* 
    根据menu的数据数组生成对应的标签数组
    方法二:
      使用reduce()+递归调用的方法
   */
  getMenuNodes=(menuList)=>{
    return menuList.reduce((pre,item)=>{
      //向pre添加<Menu.Item>
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        ))
      }else{
        pre.push((
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    },[])
  }


  render() {
    //得到当前请求的路由路径
    let path=this.props.location.pathname
    if(path.indexOf('/product')===0){ //当前请求的是商品或其子路由界面
      path='/product'
    }
    return (
      <div className="left-nav">
        <Link to='/' className="left-nav-header">
          <img src={logo} alt="" />
          <h1>人力资源系统</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          mode="inline"
          theme="dark"
        >
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>

    )
  }
}


/* 
  withRouter高阶组件 
  包装非路由组件,返回一个新的组件
  新的组件向非路由组件传递三个属性:history/location/match
*/
export default withRouter(LeftNav)