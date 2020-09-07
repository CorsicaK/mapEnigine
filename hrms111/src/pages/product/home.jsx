import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

/* Product默认的子路由组件 */
export default class ProductHome extends Component {
  state = {
    total: 0,   //商品的总数量
    products: [
      {
        "status": 1,
        "img": "",
        "_id": "dddddddd",
        "name": "华硕sss",
        "desc": "花草黑丝缎森岛帆高繁琐的",
        "price": 15745,
        "pCategoryId": "415476",
        "categoryId": "fsfsggf",
        "detail": "sfffg",
        "_v": 0
      },
      {
        "status": 0,
        "img": "",
        "_id": "555555",
        "name": "华硕sss",
        "desc": "花草黑丝缎森岛帆高繁琐的",
        "price": 745,
        "pCategoryId": "415477",
        "categoryId": "fsfs56",
        "detail": "sfffg",
        "_v": 0
      },
      {
        "status": 1,
        "img": "",
        "_id": "ER",
        "name": "REAY",
        "desc": "花草黑丝缎森岛帆高繁琐的",
        "price": 26565,
        "pCategoryId": "415477",
        "categoryId": "fsfs56",
        "detail": "sfffg",
        "_v": 0
      },
      {
        "status": 1,
        "img": "",
        "_id": "HTRE",
        "name": "TEGWAT",
        "desc": "YRUJFG",
        "price": 1523,
        "pCategoryId": "415477",
        "categoryId": "fsfs56",
        "detail": "sfffg",
        "_v": 0
      },
      {
        "status": 1,
        "img": "",
        "_id": "555555",
        "name": "华硕sss",
        "desc": "花草黑丝缎森岛帆高繁琐的",
        "price": 745,
        "pCategoryId": "415477",
        "categoryId": "fsfs56",
        "detail": "sfffg",
        "_v": 0
      },
    ],//商品的数组
    loading: false,//是否正在加载
    searchName: '',//搜索的关键字
    searchType: 'productName',//根据哪个字段搜索
  }
  /* 初始化table列数组 */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => "$" + price//拼接上美元符号
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 0 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={()=>this.updateStatus(_id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product )}>修改</LinkButton>
            </span>
          )
        }
      },
    ]

  }
/* 更新指定商品的状态 */
updateStatus=async (productId,status)=>{
  const result=await reqUpdateStatus(productId,status)
  if(result.status===0){
    message.success('更新商品成功')
    this.getProducts(this.pageNum)
  }
}

  /* 获取指定页码的列表数据显示 */
  getProducts = async (pageNum) => {
    this.pageNum=pageNum //保存pageNum,让其他方法可以看到
    this.setState({ loading: true })//显示加载loading
    const { searchName, searchType } = this.state
    //如果搜索关键字有值,进行搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else {//一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    this.setState({ loading: false })//隐藏加载loading
    if (result.status === 0) {//判断请求结果是否正常
      //取出分页数据,更新状态,显示分页列表
      const { total, list } = result.data//从接口中返回的数据中看出需要解构哪些东西
      this.setState({
        total,
        products: list
      })
    }
  }
  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts()
  }
  render() {
    //取出状态数据
    const { products, total, loading, searchType, searchName } = this.state
    const title = (
      <span>
        <Select
          style={{ width: 200 }}
          value={searchType}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 250, margin: '0 15px 0' }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' style={{ width: 100 }} onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={()=>this.props.history.push('/product/addupdate')}>
        <PlusOutlined />添加商品
      </Button>
    )


    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          /* loading={loading} */
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProducts
          }}
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    )
  }
}
