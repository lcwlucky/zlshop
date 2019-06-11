/*
使用mockjs提供mock数据接口
不需要向外暴露任何数据, 只需要保存能执行即可
 */

import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/info',{code:0,data:data.info})
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/comments',{code:0,data:data.comments})
