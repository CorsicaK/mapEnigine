import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { regLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

/* 登录的路由组件 */
//alt+<-返回上一个界面

const Item = Form.Item;
export default class Login extends Component {
  onFinish = async (values) => {
    if (values) {
      const { id, psd } = values
      const response = await regLogin(id, psd)
      /*console.log('请求success', response.data) */
      const result = response.data    //{status:0,data:user} {status:1,msg:'xxx'}这里要根据自己后期的接口文档改
      if (result.status === 0) {//登录成功
        //提示登录成功
        message.success('登录成功')
        //保存user
        const user =result.data
        memoryUtils.user=user           //保存在内存中
        storageUtils.saveUser(user)     //保存到local中
        // 跳转到后台界面,不需要回退回来,所以用history的replace方法,要回退用push
        this.history.replace('/')
      } else {//登录失败
        //提示错误信息
        message.error(result.message)
      }
    } else {
      console.log('检验失败')
    }
  }
  render() {
    //如果用户已经登录,自动跳转到管理界面
    const user=memoryUtils.user
    if(user&&user._id){
      return <Redirect to='/'/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <span>人  力  资  源  系  统</span>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item name="id" rules={[{ required: true, message: '账号不能为空!', },]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号"
              />
            </Item>
            <Item name="psd" rules={[
              { required: true, message: '密码不能为空!', },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '密码格式错误', },
            ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
        </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
