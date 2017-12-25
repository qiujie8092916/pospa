<template>
  <div class="text-center">
    <left-side-bar class="mt1"></left-side-bar>
    <el-main class="mt1 qiujie"> <strong>这是{{title}}</strong>
      <div style="width: 150px;margin: 10px auto;">
        <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
        <format-input v-model="input" :v-class="'form-control'" :options="{maxLength: 10}" placeholder="请输入内容"></format-input>
      </div>
    </el-main>
  </div>
</template>
<script>
import App from './dashBoard';
export default App;
</script>
<style lang='scss' scoped>
@import './dashBoard';
</style>