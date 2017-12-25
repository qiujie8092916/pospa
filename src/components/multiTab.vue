<template>
  <div style="-webkit-box-flex: 1; -ms-flex: 1; flex: 1;overflow: auto;">
    <div class="template-tabs">
      <el-tabs v-model="activeTab" type="card" @edit="handleTabsEdit" @tab-click="handleClick">
        <el-tab-pane v-for="(tab, index) in tabs" :key="tab.route" :name="tab.route" :closable="index === 0 ? false : true">
          <span slot="label">{{tab.name}}</span>
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
import multiTab from './multiTab';
import mixins from '../globalMixin.js';
export default {
  name: 'multiTab',
  mixins: [mixins],
  components: {
    'leftSideBar': multiTab
  },
  data() {
    return {};
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.activeTab;
      },
      set(val) {
        this.$store.commit('setActiveTab', val);
      }
    },
    tabs: {
      get() {
        return this.$store.state.tabs;
      },
      set(val) {
        this.$store.commit('setTabs', val);
      }
    }
  },
  mounted() {
    this.$store.commit('addTab', {
      route: '/dashBoard',
      name: '主页'
    });
    // 开始非主页
    if (this.$route.path === '/dashBoard') {
      this.$store.commit('setActiveTab', '/dashBoard');
    }
  },
  methods: {
    handleClick(tab) {
      let route = this.$router.options.routes.filter(route => {
        return route.path === tab.name;
      });
      this.$router.push({
        name: route[0].name,
        path: route[0].path
      });
    },
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        this.$store.commit('removeTab', targetName);
      }
    }
  },
  watch: {
    '$route' (to) {
      if (to.path === '/' ||
        to.path === '/dashBoard') {
        this.$store.commit('setActiveTab', '/dashBoard');
      } else {
        let flag = 0;
        this.tabs.forEach(tab => {
          if (tab.name === to.name) {
            flag = !0;
            this.$store.commit('setActiveTab', '/' + to.path.split('/')[1]);
          }
        });
        if (!flag) {
          this.$store.commit('addTab', { route: '/' + to.path.split('/')[1], name: to.name });
          this.$store.commit('setActiveTab', '/' + to.path.split('/')[1]);
        }
      }
    },
    'activeTab' (nv, ov) {
      if (nv !== ov) {
        let activeHeader = this.$store.state.auths.filter(auth => {
          return '/'.concat(auth.authorityHtmlElement).split('.')[0] === nv;
        });
        if (activeHeader.length) {
          this.$router.push({
            name: activeHeader[0].authorityName,
            path: '/'.concat(activeHeader[0].authorityHtmlElement).split('.')[0]
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.template-tabs {
  height: 100%;
}

.content-wrap {
  height: 95%;
  border: 1px solid #d1dbe5;
  border-top: none;
}
</style>