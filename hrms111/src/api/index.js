/* 
  包含应用中所有接口请求函数的模块 
  所有接口函数都以reg开头 
  每个接口函数返回值都是promise
  能根据接口文档定义接口请求函数
*/
import ajax from './ajax'
/* 
//普通函数写法
export function regLogin({username,password}){
  return ajax('/login',{username,password},'POST')
} */


/* 登录页 */
//登录
const BASE = ''
export const regLogin = (id, psd) => ajax(BASE + '/login', { id, psd }, 'POST')
//添加用户
export const regAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

/* 商品类别管理页:Category */
//获取商品分类的一级/二级分类列表(即部门分类列表)
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })
//添加分类:当有多个数据的时候可以选择作为多个参数来接收
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类:当有多个数据的时候页可以选择作为一个对象来接收
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

/* 商品管理ye:product */
//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }, 'GET')
//搜索商品分页列表
//searchType:搜索的类型,productName/productDesc
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', { pageNum, pageSize, [searchType]: searchName }, 'GET')
//更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')
//删除指定名称的图片,可以参考这个做删除员工
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')
/* 
//添加商品
export const reqAddProduct=(product)=>ajax(BASE+'/manage/product/add',product,'POST')
//修改商品
export const reqUpdateProduct =(product)=>ajax(BASE+'/manage/product/update',product,'POST')
 */
//添加或修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

/* 角色管理 */
//获取所有角色的列表(无需get)
export const reqRoles=()=>ajax(BASE+'/manage/role/list')
//添加角色
export const reqAddRole=(roleName)=>ajax(BASE+'/manage/role/add',{roleName},'POST')