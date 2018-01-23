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
import mixins from '../globalMixin.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'multiTab',
  mixins: [mixins],
  data () {
    return {}
  },
  computed: {
    ...mapState({
      'tabs': state => state.multiTab.tabs,
      'auths': state => state.authNav.auths
    }),
    activeTab: {
      get () {
        return this.$store.state.multiTab.activeTab
      },
      set (tab) {
        this.SET_ACTIVE_TAB(tab)
      }
    }
  },
  created () {
    this.ADD_TAB({
      route: '/dashBoard',
      name: '主页'
    })
    this.SET_ACTIVE_TAB(this.$route.path)
  },
  methods: {
    ...mapMutations([
      'ADD_TAB',
      'REMOVE_TAB',
      'SET_ACTIVE_TAB'
    ]),
    handleClick (tab) {
      let route = this.$router.options.routes.filter(route => {
        return route.path === tab.name
      })
      this.$router.push({
        name: route[0].name,
        path: route[0].path
      })
    },
    handleTabsEdit (targetName, action) {
      if (action === 'remove') {
        this.REMOVE_TAB(targetName)
      }
    }
  },
  watch: {
    '$route' (to) {
      let flag = 0
      this.tabs.forEach(tab => {
        if (tab.name === to.name) {
          flag = !0
          this.SET_ACTIVE_TAB(to.path)
        }
      })
      if (!flag) {
        this.ADD_TAB({
          route: to.path,
          name: to.name
        })
        this.SET_ACTIVE_TAB(to.path)
      }
    },
    'activeTab' (nv, ov) {
      if (nv !== ov) {
        let activeHeader = this.$store.state.authNav.auths.filter(auth => {
          return '/'.concat(auth.authorityHtmlElement).split('.')[0] === nv
        })
        if (activeHeader.length) {
          this.$router.push({
            name: activeHeader[0].authorityName,
            path: '/'.concat(activeHeader[0].authorityHtmlElement).split('.')[0]
          })
        } else if (nv === '/dashBoard') {
          this.$router.push({
            name: '主页',
            path: '/dashBoard'
          })
        }
      }
    }
  }
}
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
