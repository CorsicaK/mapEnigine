import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';

const Item = List.Item

/* 商品详情页子路由 */
export default class ProductDetail extends Component {
  render() {
    //读取携带过来的state数据
    const {name,desc,price,detail}=this.props.location.state.product

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined 
          style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }} 
          onClick={()=>this.props.history.goBack()}/>
        </LinkButton>
        商品详情
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span className="right">{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span className="right">{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span className="right">{price}</span>
          </Item>
          <Item>
            <span className="left">商品细节:</span>
            <span className="right">{detail}</span>
          </Item>
        </List>
      </Card>
    )
  }
}
