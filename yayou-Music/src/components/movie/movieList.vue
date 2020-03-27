<template>
  <div class="allmovie" >
    <div class="allmoviepage" ref="allmovie" >
    <el-row class="moviepic" >
      <routerLink  tag="div" :to="{name:'movieListItem', params:{movieid:12}}" class="moviecard" v-for="(index) in 30" :key="index"  >
        <img  src="../../assets/img/homePage/狂徒(dts版).png" alt />
        <p>狂徒(dts版)</p>
        <p>
          <span>贾巴阿叄</span>
        </p>
        <p>
          <i class="el-icon-video-camera">
            <span>102万</span>
          </i>
        </p>
      </routerLink>
    </el-row><!--这里的分页采用后端分页 数据较多 -->
    <el-row>
      <el-pagination :page-size="30" :pager-count="6" layout="prev, pager, next" :total="600"></el-pagination>
    </el-row>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      role: localStorage.getItem('Role')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
