<template>
  <div>  
  	<el-button @click="dialogVisible=true">按钮</el-button>
  	<el-dialog :visible.sync="dialogVisible" title="Hello world">
			<p>欢迎使用 Element</p>
			<a href="/sp/login/login.html">login</a>
		</el-dialog>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>