import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item

/* 更新分类的Form组件 */
export default class UpdateForm extends Component {
  static propTypes={
    categoryName:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount(){
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.values)
  }
  render() {
    const {categoryName}=this.props
    return (
     <Form>
       <Item initialValue={categoryName}>
       <Input placeholder='请输入分类名称'></Input>
       </Item>
     </Form>
    )
  }
}

