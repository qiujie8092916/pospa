<template>
  <div style="-webkit-box-flex: 1; -ms-flex: 1; flex: 1; padding: 10px 20px; overflow: auto;">
    <div class="template-tabs">
      <el-tabs v-model="activeTab" type="card" @edit="handleTabsEdit" @tab-click="handleClick">
        <el-tab-pane v-for="(tab, index) in tabs" :key="tab.name" :name="tab.route" :closable="index === 0 ? false: true">
          <span slot="label">{{tab.name}}</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-wrap">
      <router-view/>
    </div>
  </div>
</template>
<script>
import leftSideBar from './multiTab.vue';
export default {
  name: 'multiTab',
  components: {
    'leftSideBar': leftSideBar
  },
  data() {
    return {
      tabIndex: 1
    };
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
    if (this.$route.path === '/dashBoard' || this.$route.path === '/') {
      this.$store.commit('addTab', {
        route: '/dashBoard',
        name: '主页',
        content: ''
      });
      this.$router.push({ name: '主页', path: '/dashBoard' });
      this.$store.commit('setActiveTab', '/dashBoard');
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleTabsEdit(targetName, action) {
      /*
      if (action === 'add') {
        let tabName = ++this.tabIndex + '';
        this.$store.commit('addTab', tabName);
      } else */
      if (action === 'remove') {
        this.$store.commit('removeTab', targetName);
      }
    }
  },
  watch: {
    '$route' (to) {
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
  }
};
</script>
<style lang="scss" scoped>
.template-tabs {
  border: 1px solid #d8dce5;
}

.content-wrap {
  border-bottom: 1px solid #d1dbe5;
  padding: 0 20px;
  height: 90%;
}
</style>
<!-- <left-side-bar class="mt1" v-if="$route.path === '/' || $route.path === '/admin'"></left-side-bar> 
<el-main class="mt1"></el-main> -->