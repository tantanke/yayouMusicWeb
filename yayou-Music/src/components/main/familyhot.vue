<template>
    <el-row class="rankList">
        <el-col :span="6">
            <ul class='rankPic'>
                <li>
                <img src="../../assets/img/homePage/1.png" alt="">
                </li>
                <li>
                <img src="../../assets/img/homePage/2.png" alt="">
                </li>
                <li>
                <img src="../../assets/img/homePage/3.png" alt="">
                </li>
                <li>
                4
                </li>
                <li>
                5
                </li>
            </ul>
        </el-col>
        <el-col :span='18'>
            <ul class="ranking" v-for="(item,i) in family" :key="i">
                <li>
                    <p>
                        <span>{{item.yi_name}}</span>
                        <span>{{item.family_hot}}</span>
                    </p>
                    <div class="y-content"><span>{{item.han_name}}</span></div>
                </li>
            </ul>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      family: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://175.24.83.13:8000/familyRank')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.family = res.data
        console.log(res)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>
<style>
</style>
