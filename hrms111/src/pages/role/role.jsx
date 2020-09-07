import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole } from '../../api'
import AddForm from './add-form'

/* 角色路由 */
export default class Role extends Component {
  state = {
    roles: [     //所有角色的列表
      {
        "menu": [
          "/home",//menu的key值
          "/role",
          "/category",
          "/products",
          "/product",
          "/charts/bar"
        ],
        "_id": "sdgerggr",
        "name": "测试",
        "create_time": 1654654456,
        "_v": 0,
        "auth_time": 1654654656,
        "auth_name": "admin"
      }, {
        "menu": [
          "/home",//menu的key值
          "/role",
          "/products",
          "/product",
          "/charts/bar"
        ],
        "_id": "egtwe",
        "name": "erect",
        "create_time": 564642146,
        "_v": 0,
        "auth_time": 5586859685,
        "auth_name": "admin"
      }],
    role: {},//选中的role
    isShowAdd: false,    //是否显示添加界面

  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  /* 
  //这种写法有问题,获取到的是undefined
  onRow=(role)=>{
    return{
      onChange: (role) => {
        console.log('selectedRows: ', role);
      },
      onClick:(e)=>{
        console.log('row',role)
        this.setState({
          role
        })
      }
    }
  } */
  addRole = async (form) => {
    //进行表单验证
    if (form) {
      //隐藏确认框
      this.setState({
        isShowAdd:false
      })
      const { roleName } = form
      form = {}
      //收集输入数据
      const result = await reqAddRole(roleName)
      //请求添加
      if (result.status === 0) {
        message.success('添加角色成功')
        //新产生的角色
        const role = result.data
        //更新roles状态     
        /*//以下更新方法不建议
        const roles = this.state.roles
        roles.push(role)//添加
       //roles.splice(role)//删除 
        this.setState({
          roles
        }) 
        */
       //更新roles状态:基于原本状态数据更新
       this.setState((state)=>({
         roles:[...state.roles,role]
       }))
      } else {
        message.error('添加角色失败')
      }
    }
  }


  componentWillMount() {
    this.initColumn()
  }

  /*  componentDidMount(){
     this.getRoles()
   } */

  render() {
    const { roles, role, isShowAdd } = this.state
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>&nbsp;&nbsp;
        <Button type="primary" disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          /* loading={loading} */
          pagination={{ defaultPageSize: PAGE_SIZE }}
          dataSource={roles}
          columns={this.columns}
          onRow={(role) => {
            return {
              onClick: () => {
                console.log(role)
                this.setState({
                  role
                })
              }
            }
          }}
          rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
        />
        <Modal
          title="添加角色"
          style={{ top: 100 }}
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => { this.setState({ isShowAdd: false }) }}
        >
          <AddForm
            setForm={(form) => { this.form = form } }
            
          />
        </Modal>
      </Card>
    )
  }
}
