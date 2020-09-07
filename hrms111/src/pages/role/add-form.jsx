import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'


const Item=Form.Item

/* 添加分类的Form组件 */
export default class AddForm extends Component {
  static propTypes={
    setForm:PropTypes.func.isRequired,//用来传递form对象的函数
  }
  onFinish = values => {
    console.log('Success:', values);
  };

  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6, },//左侧label宽度
      wrapperCol: { span: 15, },//指定右侧包裹的宽度
    };
    return (
     <Form  {...formItemLayout} onFinish={this.onFinish}>
       <Item initialValue='' label="角色名称" name="roleName" rules={[{ required: true, message: '角色名称不能为空!' }]}>
       <Input placeholder='请输入角色名称'></Input>
       </Item>
     </Form>
    )
  }
}

