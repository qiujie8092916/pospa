<template>
  <el-container style="height:100%">
    <el-header style="height:26px;">
      <!-- <router-link to="/home" class="navbar-brand pull-left pln">
        <img alt="icepointcloud-logo" src="https://storage.icepointcloud.com//8cce867937cba010627a503748e6aa2b/20171012/659aa202-9edb-43fd-8c9e-b83e1aaf22858996416171504304110.png-jpg" width="85" />
      </router-link> -->
      <el-menu menu-trigger="click" :default-active="activeHeader" class="el-menu pull-left" mode="horizontal" @select="handleNavClick">
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
            <el-submenu v-if="!x.parentOrderNum && !noNeedNav.contains(x.orderNum)" :key="x.id" :index="x.authorityCode">
              <template slot="title" style="height: calc(100% - 1px);">{{x.authorityName}}</template>
              <el-menu-item v-for="y in auths" v-if="y.authorityHtmlElement && x.orderNum === y.parentOrderNum" :key="y.id" :index="y.authorityCode">
                <router-link :to="'/' + y.authorityHtmlElement.substring(0, y.authorityHtmlElement.indexOf('.'))">{{y.authorityName}}</router-link>
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-header>
    <el-container>
      <multi-tab></multi-tab>
    </el-container>
  </el-container>
</template>
<script>
import multiTab from '@/components/multiTab';
import mixins from '@/globalMixin';
export default {
  name: 'admin',
  mixins: [mixins],
  components: {
    'multiTab': multiTab
  },
  data() {
    return {
      noNeedNav: [
        801, // 订货配置
        901, // 商城设置
        1001, // 卡券管理
        1201, // 积分商城
        1401, // 线上采购
        550, // 员工
        301 // 库存
      ],
      activeAuth: []
    };
  },
  computed: {
    auths() {
      return this.$store.state.auths;
    },
    activeHeader() {
      if (this.$route.path === '/' ||
        this.$route.path === '/dashBoard') {
        this.activeAuth[0] = {
          authorityName: '主页',
          authorityCode: 'dashBoard',
          authorityHtmlElement: 'dashBoard.jsp'
        };
      } else {
        this.activeAuth = this.auths.filter(auth => {
          return (auth.authorityHtmlElement && (this.fakeUrl(auth.authorityHtmlElement) === this.$route.path.split('/')[1]));
        });
      }
      return this.activeAuth[0].authorityCode;
    }
  },
  created() {
    let r = this.$router.options.routes.filter(route => {
      return route.path === '/' + location.href.split('/').pop();
    });
    this.$router.push({
      name: (r && r.length) ? r[0].name : this.$router.options.routes[0].name,
      path: (r && r.length) ? r[0].path : this.$router.options.routes[0].path
    });
  },
  methods: {
    handleNavClick(key) {
      let auth = this.auths.filter(auth => {
        return auth.authorityCode === key;
      });
      this.$router.push({
        name: (auth && auth.length) ? auth[0].authorityName : '主页',
        path: (auth && auth.length) ? this.fakeUrl(auth[0].authorityHtmlElement) : 'dashBoard'
      });
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