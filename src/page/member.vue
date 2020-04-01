<template>
    <div>
        <el-row>
            <member-self/>
        </el-row>
        <el-row>
            <member-vipmoney/>
        </el-row>
    </div>
</template>
<script>
import memberSelf from '@/components/member/memberself.vue'
import memberVipmoney from '@/components/member/membervipmoney.vue'
export default {
  components: {
    memberSelf,
    memberVipmoney
  }
}
</script>
<style>
</style>
