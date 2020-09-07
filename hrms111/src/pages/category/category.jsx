import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {PAGE_SIZE} from '../../utils/constants'


/* 商品分类路由 */
export default class Category extends Component {
  state = {
    loading: false,//是否正在获取数据中
    categorys: [],//一级分类列表
    subCategorys: [],//二级分类列表
    parentId: '0', //当前需要显示的分类列表的parentId
    parentName: '',//当前需要显示的分类列表的父分类名称
    showStatus: 0,//0:不显示,1:显示添加,2:显示更新
  }

  /* 初始化table的列数组 */
  initColumns = () => {
    this.columns = [
      {
        title: '部门',
        dataIndex: 'name',//显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( //返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {/* 先定义一个匿名函数,在函数中调用处理的函数并传入数据,就可以向事件回调函数传递参数 */}
            {this.state.parentId === '0' ?
              <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看部门人员</LinkButton>
              : null}
          </span>
        )
      }
    ]
  }

  /* 获取一级/二级分类列表显示(部门信息) */
  getCategorys = async () => {
    //在发请求前显示loading
    this.setState({ loading: true })
    const { parentId } = this.state
    //发异步ajax请求获取数据
    const result = await reqCategorys(parentId)
    //在请求完成后,隐藏loading
    this.setState({ loading: false })

    if (result.status === 0) {//status这个看接口文档中成功的属性是什么
      //取出分类数组(一级/二级)
      const categorys = result.data
      if (parentId === '0') {
        //更新一级分类状态
        this.setState({
          categorys
        })
      } else {
        //更新二级分类状态
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }

  /*  显示指定一级对象的二级分类列表 */
  showSubCategorys = (category) => {
    //更新状态,setState之后不能立即获取更新状态
    this.setState({
      parentId: category._id,//具体定义按接口文档
      parentName: category.name
    }, () => {   //在状态更新且重新render()后执行
      this.getCategorys()
    })
  }

  /*  显示指定一级分类列表 */
  showCategorys = () => {
    this.setState({
      parentId: 0,
      parentName: '',
      subCategorys: []
    })
  }
  /*  点击隐藏模态框 */
  handleCancel = () => {
    //清除输入数据
    /* this.form.resetFields() */
    this.setState({
      showStatus: 0
    })
  }

  /*  显示添加分类的模态框 */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /*  添加分类 */
  addCategory = () => {

  }

  /*  显示更新分类的模态框 */
  showUpdate = (category) => {
    //保存分类对象
    this.category = category
    //更新状态
    this.setState({
      showStatus: 2
    })
  }

  /* 更新分类 */
  updateCategory = async () => {
    //隐藏模态框
    this.setState({
      showStatus: 0
    })

    //准备数据
    const categoryId = this.category._id
    /* //清除数据
    this.form.resetFields() */
    const categoryName=this.values.categoryName

    //发送请求更新分类
    const result = await reqUpdateCategory({ categoryId, categoryName })
    if (result.status === 0) {//status看接口
      //重新显示列表
      this.getCategorys()
    }

  }

  /* 为第一次render准备数据 */
  componentWillMount() {
    this.initColumns()
  }
  /* 执行异步任务:发异步ajax请求 */
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    //读取状态数据
    const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state
    //读取指定的分类(render上来就先渲染一次,这样category一开始是没值的,会报错,所以||{})
    const category = this.category || {}
    //Card的左侧
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    )
    //Card的右侧
    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        <PlusOutlined />添加
      </Button>
    )

    /*      
       //静态的
               const dataSource = [
                 {
                   "parentId": "0",
                   "_id": "5ca9d695b49ef916541160ba",
                   "name": "家用电器",
                   "_v": 0
                 },
                 {
                   "parentId": "0",
                   "_id": "5ca9d695b49ef916541160bb",
                   "name": "电脑",
                   "_v": 0
                 },
                 {
                   "parentId": "0",
                   "_id": "5ca9d695b49ef916541160bc",
                   "name": "服装",
                   "_v": 0
                 },
                 {
                   "parentId": "0",
                   "_id": "5ca9d695b49ef916541160bd",
                   "name": "玩具",
                   "_v": 0
                 },
                 {
                   "parentId": "0",
                   "_id": "5ca9d695b49ef916541160be",
                   "name": "书籍",
                   "_v": 0
                 },      
               ];
            */

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns} />

        <Modal
          title="添加"
          style={{ top: 20 }}
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm 
          categorys={categorys}
          parentId={parentId}
          
          />
        </Modal>
        <Modal
          title="更新"
          style={{ top: 20 }}
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(values) => { this.values = values }}
          />
        </Modal>
      </Card>
    )
  }
}
