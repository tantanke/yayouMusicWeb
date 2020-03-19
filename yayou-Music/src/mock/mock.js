// 引入mockjs
// const Mock = require('mockjs')
// 获取 mock.Random 对象
// mock一组数据
/** const produceNewsData = function () {
  let articles = {
    code: 1,
    msg: '成功',
    data: {
      id: 123
    }}
  return articles
}
const ablumData = function () {
  let articles = {
    code: 1,
    msg: '成功',
    data: {
      ablumId: 123
    }}
  return articles
}
const upMusicData = function () {
  let articles = {
    code: 1,
    msg: '成功',
    data: '上传音乐成功'}
  return articles
}
const coverUrl = function () {
  let articles = {
    code: 1,
    msg: '成功',
    data: '图片的链接'}
  return articles
}
const getAllAblumsData = function () {
  let articles = {
    code: 1,
    msg: '请求成功',
    list: [
      {
        ablumId: 1,
        ablumName: '测试一'
      },
      {
        ablumId: 1,
        ablumName: '测试二'
      },
      {
        ablumId: 1,
        ablumName: '测试三'
      }
    ]}
  return articles
}
// 拦截ajax请求，配置mock的数据
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/upVideo', 'post', produceNewsData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/subMv', 'post', produceNewsData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/newAlbum', 'post', ablumData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/upSong', 'post', upMusicData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/getSingerAlbum', 'get', getAllAblumsData)
Mock.mock('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/setCover', 'post', coverUrl) */
