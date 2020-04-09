<template>
  <div class="singer"><!--改一下图片就可以了-->
    <ul class="singer-ul">
      <li v-for="(item,i) in editionData" :key="i">
        <div class="u-cover u-cover-5">
          <router-link class="nm f-thide s-fc0" tag='a' :to="{ name: 'movieListItem', params: {moveid: item.videoId, isvip:item.isvip}}">
            <img src="item.videoUrl">
            <span title="item.artist" class="msk">
            </span>
          </router-link>
        </div>
        <p>
          <router-link class="nm f-thide s-fc0" tag='a' :to="{ name: 'movieListItem', params: {moveid: item.videoId, isvip:item.isvip}}">
            <span class="s-fc7">{{item.artist}}</span>
          </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      editionData: []
    }
  },
  methods: {
    getHomeInfo () {
      axios({
        url: 'http://175.24.83.13:8000/hotMv',
        method: 'get',
        params: {
          'type': 2
        }
      })
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      console.log(res)
      this.editionData = res.data
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
  .singer{
    margin-top: 50px;
    color: #333;
  }
  .singer-ul{
    margin: 0 0 0 -4px;
  }
  .singer-ul li{
    width: 154px;
    height: 154px;
    list-style: none;
    float: left;
    overflow: hidden;
    padding: 0 0 30px 38px;
    line-height: 1.4;
  }
  .u-cover{
    position: relative;
    display: block;
  }
  .u-cover img{
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .msk{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .m-cvrlst li p{
    margin-top: 8px;
    width: 100%;
  }
  .nm {
    display: inline-block;
    max-width: 85%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    text-decoration: none;
  }
  .s-fc7{
     color: #0c73c2;
     cursor: pointer;
  }
</style>
