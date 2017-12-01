<template>
  <div>
    <h1>pos-spa</h1>
    <p>pos-spa-multiTab-vue</p>
    <p>邱杰</p>
  </div>
  <el-button @click="visible=true">按钮</el-button>
  <el-dialog :visible.sync="visible" title="Hello world">
    <p>欢迎使用 Element</p>
  </el-dialog>
</template>
<script>
export default {
  name: 'app'
};
</script>