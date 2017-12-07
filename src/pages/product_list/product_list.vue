<template>
  <div class="text-center qiujie">
    <strong>这是{{title}}</strong>
    <div style="width: 150px;margin: 10px auto;">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>
<script>
import App from './product_list';
export default App;
</script>
<style lang='scss' scoped>
@import './product_list';
</style>