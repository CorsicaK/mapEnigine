import React from 'react'
import { HomeOutlined, PieChartOutlined, MailOutlined, } from '@ant-design/icons';
const menuList = [
  {
    title: '首页',                //菜单标题名称
    key: '/home',                 //对应路径
    icon: <HomeOutlined />,       //图标名称
  },
  {
    title: '商品',
    key: 'product',
    icon: <PieChartOutlined />,
    children: [                   //子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: <MailOutlined />,
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <MailOutlined />,
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <PieChartOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <PieChartOutlined />,
  },
  {
    title: '图表',
    key: '/cahrts',
    icon: <PieChartOutlined />,
    children: [                   
      {
        title: '饼图',
        key: '/charts/pie',
        icon: <MailOutlined />,
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: <MailOutlined />,
      },
      {
        title: '柱状图',
        key: '/charts/bar',
        icon: <MailOutlined />,
      }
    ]
  }
]

export default menuList;