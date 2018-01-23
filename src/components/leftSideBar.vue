<template>
  <el-aside width="200px" class="pull-left">
    <el-menu :default-active="input" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
      <el-menu-item index="one">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="two">
        <i class="el-icon-setting"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import store from '@/store/index.js'
import {
  mapMutations
} from 'vuex'

export default {
  name: 'leftSideBar',
  store,
  data () {
    return {
      input: 'two'
    }
  },
  created () {
    this.SET_IS_INPUT(this.input)
  },
  methods: {
    ...mapMutations([
      'SET_IS_INPUT'
    ]),
    handleOpen (index, indexPath) {
      console.log(index, indexPath)
    },
    handleClose (index, indexPath) {
      console.log(index, indexPath)
    },
    handleSelect (index) {
      this.input = index
      this.SET_IS_INPUT(index)
    }
  }
}
</script>
