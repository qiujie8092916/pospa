<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeHeader" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="admin">
          <router-link to="/admin">主页</router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="home">
            <router-link to="/home">选项1</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/home2">选项2</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link to="/home3">选项3</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="time-entries">
          <router-link to="/time-entries">订单管理</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-container>
  </el-container>
</template>
<script>
// import $ from 'jquery';
import multiTab from '../../components/multiTab.vue';
export default {
  name: 'admin',
  components: {
    'multiTab': multiTab
  },
  data() {
    return {
      activeHeader: 'admin',
      activeTab: 'first'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu-item {
  padding: 0 !important;
  &>a {
    display: block;
    padding: 0 20px;
  }
}
</style>