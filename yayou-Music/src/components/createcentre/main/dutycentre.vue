<template>
  <div class="task-center">
    <div class="top-area">
      <div class="content">能体会能体会过ID借记卡费离开家国泰航空集费更多覅龙岗街道死及格过ID借记卡费离开家国泰航空能体会过ID借记卡费离开家国泰航空集费更多覅龙岗街道死及格集费更多覅龙岗街道死及格开了房见多识广。割发代首格式</div>
      <div class="time">2019-19-20</div>
      <div class="more">查看更多</div>
      <div class="frame-window">
        <div class="music"><span class="iconfont">&#xe601;</span><div>发布音乐</div></div>
        <div class="mv"><span class="iconfont">&#xe605;</span><div>发布视频/MV</div></div>
      </div>
    </div>
    <div class="bottom-area">
      <div class="header">任务中心 <span class="iconfont">&#xe62c;</span></div>
      <div class="desc">做任务、领任务、享特权</div>
      <div>
        <img src="assets/img/image/发布作品.jpg" alt="">
        <div class="task-area">
          <div class="task-condition">
            <div class="number">13</div>
            <div class="title">
              <h5>本周待完成周任务</h5>
              <p>13待完成</p>
            </div>
            <div class="go-finish">去完成</div>
          </div>
          <ul class="task-list">
            <li>2019初心音乐集</li>
            <li>2019初心音乐集</li>
            <li>2019初心音乐集</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCenterContent'
}
</script>

<style lang="scss" scoped>
.task-center{
  float:left;
  display:block;
  position:relative;
  width:84.375%;
  background:#fafafa;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  .top-area{
    display: -webkit-flex;
    display:flex;
    max-width:1500px;
    height:90px;
    margin:35px auto;
    font-size:14px;
    text-align:left;
    line-height:50px;
    font-weight: normal;
    color: #999;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    background:#ffffff;
    .content{
      float:left;
      width:1270px;
      height:50px;
      padding:20px 10px;
      text-align:left;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .time{
      float:left;
      width:90px;
      cursor:default;
      padding:20px 0;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .more{
      float:left;
      width:70px;
      padding:20px 0;
      cursor:pointer;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .frame-window{
      box-sizing:border-box;
      position:absolute;
      width:250px;
      height:90px;
      top:20px;
      left:5px;
      padding:20px 35px;
      text-align:center;
      color:#fe4857;
      background: #ffffff;
      .music{
        height:50px;
        padding-right:20px;
        div{
          height:20px;
          line-height:20px;
          padding:0;
          margin:0;
        }
        .iconfont{
          display: block;
          height:25px;
          font-size:30px;
          line-height:25px;
          padding-bottom:5px;
        }
      }
      .mv{
        float:left;
        height:50px;
        padding-left:20px;
        div{
          height:20px;
          line-height:20px;
        }
        .iconfont{
          display: block;
          height:25px;
          font-size:30px;
          line-height:25px;
          padding-bottom:5px;
        }
      }
    }
  }
  .bottom-area{
    display: -webkit-flex;
    display:flex;
    flex-direction: column;
    width:1500px;
    height:800px;
    margin:0px auto;
    padding:30px;
    line-height:50px;
    font-weight: normal;
    background:#ffffff;
    overflow: hidden;
    .header{
      width:100%;
      height:25px;
      font-size:18px;
      line-height:25px;
      font-weight:600;
      color:#000;
      .iconfont{
        font-size:16px;
        color: #333;
      }
    }
    .desc{
      height:20px;
      padding:20px 0 30px 0;
      font-size:14px;
      line-height:20px;
      color:#666;
    }
    div{
      img{
        display: -webkit-flex;
        display:flex;
        float:left;
        max-width:720px;
        height:420px;
      }
      .task-area{
        display: -webkit-flex;
        display:flex;
        flex-direction: column;
        float:left;
        max-width:680px;
        padding-left:30px;
        overflow: hidden;
        .task-condition{
          box-sizing:border-box;
          max-width:680px;
          height:140px;
          padding:30px 0;
          padding-left:40px;
          border:1px solid #999;
          .number{
            float:left;
            width:80px;
            height:80px;
            font-size:20px;
            line-height:80px;
            font-weight:600;
            color:#fe4857;
            text-align:center;
            border-radius:40px;
            border:3px solid #fef0ef;
          }
          .title{
            box-sizing:border-box;
            float:left;
            max-width:400px;
            min-width:fit-content;
            margin-right:50px;
            height:80px;
            padding:10px 30px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
            h5{
              box-sizing:border-box;
              height:40px;
              font-size:16px;
              line-height:40px;
            }
            p{
              box-sizing:border-box;
              height:20px;
              font-size:14px;
              line-height:20px;
              color: #999;
            }
          .go-finish{
            float:left;
            width:100px;
            height:50px;
            margin-top:15px;
            margin-right:30px;
            font-size:18px;
            font-weight:600;
            text-align:center;
            line-height:50px;
            border-radius:25px;
            background:#333;
            color: #fff
          }
        }
        .task-list{
          max-width:680px;
          margin-top:30px;
          li{
            height:30px;
            margin-left:20px;
            font-size:14px;
            font-weight:600;
            line-height:30px;
            color: #999;
            list-style:disc;
          }
        }
      }
    }
  }
}
</style>
