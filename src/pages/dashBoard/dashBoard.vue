<template>
  <div class="text-center">
    <left-side-bar class="mt1"></left-side-bar>
    <el-main v-if="isInput==='one'" class="mt1 qiujie">
      <strong>这是{{title}}</strong>
      <div style="width: 150px;margin: 10px auto;">
        <format-input v-model="input" :type="'number'" :v-class="'form-control'" :options="{maxLength: 10}" :v-style="{'borderColor': 'red'}" :attr="{'placeholder': '只能输数字', 'data-type': 'qiujie'}"></format-input>
      </div>
    </el-main>
    <el-main v-else-if="isInput==='two'" class="mt1 qiujie">
      <strong>这是{{title}}</strong>
      <div style="width: 150px;margin: 10px auto;">
        <el-input v-model='ela'></el-input>
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