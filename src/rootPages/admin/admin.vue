<template>
  <el-container>
    <el-header style="height:61px;">
      <router-link to="/home" class="navbar-brand pull-left pln">
        <img alt="icepointcloud-logo" src="https://storage.icepointcloud.com//8cce867937cba010627a503748e6aa2b/20171012/659aa202-9edb-43fd-8c9e-b83e1aaf22858996416171504304110.png-jpg" width="90" />
      </router-link>
      <el-menu :default-active="activeHeader" class="el-menu pull-left" mode="horizontal" @select="handleNavClick">
        <el-menu-item index="dashBoard">
          <router-link to="/dashBoard">主页</router-link>
        </el-menu-item>
        <el-menu-item index="productList">
          <router-link to="/product_list">基础资料维护</router-link>
        </el-menu-item>
        <el-submenu index="orderRoot">
          <template slot="title" style="height: calc(100% - 1px);">销售</template>
          <el-menu-item index="orderNew">
            <router-link to="/order_detail_connection">新建零售单</router-link>
          </el-menu-item>
          <el-menu-item index="salesInventoryOutDetail">
            <router-link to="/selling_out_details">新建销售出库单</router-link>
          </el-menu-item>
          <el-menu-item index="orderList">
            <router-link to="/order_list">零售单</router-link>
          </el-menu-item>
          <el-menu-item index="retreatList">
            <router-link to="/retreat_order_list">零售退货单</router-link>
          </el-menu-item>
          <el-menu-item index="salesInventoryOutList">
            <router-link to="/inventory_out_order_list">销售出库单</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container class="p10">
      <multi-tab></multi-tab>
    </el-container>
  </el-container>
</template>
<script>
import multiTab from '../../components/multiTab.vue';
export default {
  name: 'admin',
  components: {
    'multiTab': multiTab
  },
  data() {
    return {
      activeHeader: 'dashBoard'
    };
  },
  methods: {
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