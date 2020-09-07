const {override,fixBabelImports,addLessLoader} =require('customize-cra');

module.exports=override(
  //antd按需打包
  fixBabelImports('import',{
    libraryName:'antd',
    libraryDirectory:'es',
    style:true,
  }),
  //使用less-loader对源码中的less变量进行重新指定
  addLessLoader({
    lessOptions: {
      modifyVars:{'primary-color':'#A3D1D1'},
      javascriptEnabled:true,
    }
  }),
);