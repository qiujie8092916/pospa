<template>
  <div class="route-template">
    <strong>{{$route.name}}</strong>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.route-template {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
</style>