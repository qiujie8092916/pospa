<template>
  <el-container style="height:100%">
    <el-header style="height:61px;">
      <router-link to="/home" class="navbar-brand pull-left pln">
        <img alt="icepointcloud-logo" src="https://storage.icepointcloud.com//8cce867937cba010627a503748e6aa2b/20171012/659aa202-9edb-43fd-8c9e-b83e1aaf22858996416171504304110.png-jpg" width="90" />
      </router-link>
      <el-menu :default-active="activeHeader" class="el-menu pull-left" mode="horizontal" @select="handleNavClick">
        <el-menu-item index="dashBoard">
          <router-link to="/dashBoard">主页</router-link>
        </el-menu-item>
        <template v-for="x in auths">
          <template v-if="!x.hasChild">
            <el-menu-item :key="x.id" :index="x.authorityCode">
              <router-link :to="'/' + x.authorityHtmlElement.substring(0, x.authorityHtmlElement.indexOf('.'))">{{x.authorityName}}</router-link>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu v-if="!x.parentOrderNum && !contains(noNeedNav, x.orderNum)" :key="x.id" :index="x.authorityCode">
              <template slot="title" style="height: calc(100% - 1px);">{{x.authorityName}}</template>
              <el-menu-item v-for="y in auths" v-if="y.authorityHtmlElement && x.orderNum === y.parentOrderNum" :key="y.id" :index="y.authorityCode">
                <router-link :to="'/' + y.authorityHtmlElement.substring(0, y.authorityHtmlElement.indexOf('.'))">{{y.authorityName}}</router-link>
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-header>
    <el-container class="p10">
      <multi-tab></multi-tab>
    </el-container>
  </el-container>
</template>
<script>
import multiTab from '@/components/multiTab';
export default {
  name: 'admin',
  components: {
    'multiTab': multiTab
  },
  data() {
    return {
      activeHeader: 'dashBoard',
      noNeedNav: [
        801, // 订货配置
        901, // 商城设置
        1001, // 卡券管理
        1201, // 积分商城
        1401, // 线上采购
        550, // 员工
        301 // 库存
      ]
    };
  },
  computed: {
    auths() {
      return this.$store.state.auths;
    }
  },
  methods: {
    contains(arr, obj) {
      let i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      };
      return false;
    },
    handleNavClick(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  border-bottom: solid 1px #e6e6e6;
  .el-menu .el-menu-item {
    padding: 0 !important;
    &>a {
      display: block;
      padding: 0 20px;
    }
  }
}
</style>