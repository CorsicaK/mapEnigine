import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import {reqCategorys,reqAddOrUpdateProduct} from '../../api'


const Item = Form.Item
const TextArea = Input.TextArea

/* const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
]; */
/* Product的添加和更新的子路由组件 */
export default class ProductAddUpdate extends Component {
  state = {
    options:[],
  };

  initOptions=(categorys)=>{
    //根据categorys生成options数组
   const options= categorys.map(c=>({
      value:c._id,//具体是否为_id/name根据接口返回结果
      label:c.name,
    }))
    //更新options状态
    this.setState({
      options
    })
  }

  /* 获取一级分类列表 */
  getCategorys=async(parentId)=>{
    const result= await reqCategorys(parentId) //接口返回结果:{status:0,data:categorys}
    if(result.status===0){
      const categorys=result.data
      this.initOptions(categorys)
    }
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };


  onFinish =async (values)  => {
    //进行表单验证,验证通过再发送请求  
    if (values) {
      /* 
      alert('发送请求')
      console.log('Received values of form: ', values); 
      */
     //1.收集数据
      const {name,desc,price,categoryIds}=values
      const product={name,desc,price,categoryIds}
      //如果是更新,需要添加_id
      if(this.isUpdate){
        product._id = this.product._id
      }
     //2.调用接口请求函数去添加或更新
     const result=await reqAddOrUpdateProduct(product)

     //3.根据结果提示
      if(result.status===0){
        message.success(`${this.isUpdate?'更新':'添加'}商品成功!`)
        this.history.goBack()
      }else{
        message.error(`${this.isUpdate?'更新':'添加'}商品失败!`)
      }
    }
  };

  componentDidMount(){
    this.getCategorys()
  }

  componentWillMount(){
    //用来判断这个表单是用作添加还是更新
    //取出携带的state信息
    const product=this.props.location.state//如果是添加就没有值,否则有值
    //保存一个是否是更新的标识
    this.isUpdate=!!product
    //保存商品(如果没有,保存是{})
    this.product=product||{}
  }
  render() {
    const {isUpdate,product}=this
    const {categoryId}=product
    //用来接收级联分类ID的数组
    const categoryIds=[]
    if(isUpdate){
      categoryIds.push(categoryId)
    }

    //头部左侧标题
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>{isUpdate?'修改商品':'添加商品'}</span>
      </span>
    )

    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2, },//左侧label宽度
      wrapperCol: { span: 10, },//指定右侧包裹的宽度
    };

    //
    return (
      <Card title={title}>
        <Form  {...formItemLayout} onFinish={this.onFinish}>
          <Item
            label="商品名称"
            name="name"
            initialValue={product.name}
            style={{ fontSize: 30, fontWeight: "bold" }}
            rules={[{ required: true, message: '请输入商品名称', },]}
          >
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item
            label="商品描述"
            name="desc"
            initialValue={product.desc}
            style={{ fontSize: 30, fontWeight: "bold" }}
            rules={[{ required: true, message: '请输入商品描述', },]}
          >
            <TextArea placeholder="请输入商品描述" autosize />
          </Item>
          <Item
            label="商品价格"
            style={{ fontSize: 30, fontWeight: "bold" }}
            name="price"
            initialValue={product.price}
            rules={[{ required: true, message: '请输入商品价格', },]}
          >
            <Input type="number" min={0} max={50000} addonAfter="元/月" />
          </Item>
          <Item
            label="商品分类"
            name="categoryIds"
            style={{ fontSize: 30, fontWeight: "bold" }}
          >
            <Cascader
              placeholder="请指定商品分类"
              options={this.state.options}  /* 需要显示的列表数据数组 */

            />
          </Item>
          <Item>
            <Button style={{ marginLeft: 100 }} type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

