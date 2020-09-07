import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item
const Option=Select.Option

/* 添加分类的Form组件 */
export default class AddForm extends Component {
  static propTypes={
    categorys:PropTypes.array.isRequired,//一级分类的数组
    parentId: PropTypes.string.isRequired//父分类的Id
  }
  render() {
    const {categorys,parentId} =this.props
    return (
     <Form>
       <Item initialValue={parentId}>
       <Select >
         <Option value='0'>一级分类</Option>
         {
           categorys.map(c=><Option value={c._id }>{c.name}</Option>)
         }
       </Select>
       </Item>
       <Item initialValue=''>
       <Input placeholder='请输入分类名称'></Input>
       </Item>
     </Form>
    )
  }
}

