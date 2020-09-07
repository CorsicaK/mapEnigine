import React, { Component } from 'react'
import './not-found.less'
import { Row, Col, Button } from 'antd'

export default class NotFound extends Component {
  goHome=()=>{
      this.props.history.replace('/home')
  }
  render() {
    return (
      <Row className="not-found">
        <div className='left'>        
            <Button type="primary" className='btn' onClick={this.goHome}>
              返回首页
            </Button>
        </div>
      </Row>
    )
  }
}
