// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// mock一组数据
const produceNewsData = function () {
  let articles = {
    code: 1,
    msg: '成功',
    data: '视频的链接'}
  return articles
}
// 拦截ajax请求，配置mock的数据
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/upVideo', 'post', produceNewsData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/subMv', 'post', produceNewsData)
