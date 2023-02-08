<template>
  <div class="toast">
    <span>{{ title }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      title: (state) => state.toast.title
    })
  }
}
</script>

<style lang="less" scoped>
.toast {
  min-width: 100px;
  max-width: 40vw;
  padding: 10px 20px;
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
  span {
    line-height: 20px;
    font-size: 16px;
    color: black;
  }
}
</style>
