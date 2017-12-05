<template>
  <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
import leftSideBar from './leftSideBar.vue';
export default {
  name: 'multiTab',
  components: {
    'leftSideBar': leftSideBar
  },
  data() {
    return {
      activeTab: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<!-- <left-side-bar class="mt1" v-if="$route.path === '/' || $route.path === '/admin'"></left-side-bar> 
<el-main class="mt1"></el-main> -->