<template>
  <div id="app">
    <div class="side" v-if="$route.name != 'video'">
      <Sidebar></Sidebar>
    </div>
    <div class="main">
      <Topbar></Topbar>
      <router-view />
    </div>

    <login v-show="isShowLoginMenu"></login>

    <transition name="fade">
      <Toast v-show="isShowToast"></Toast>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from './components/Login.vue'
import Topbar from '@/components/Topbar.vue'
import Toast from './components/Toast.vue'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isShowLoginMenu: (state) => state.loginStatus.isShowLoginMenu,
      isShowToast: (state) => state.toast.isShowToast
    })
  },
  components: {
    Topbar,
    Sidebar: () => import('@/components/Sidebar.vue'),
    Login,
    Toast
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  .main {
    min-height: 936px;
    flex: 1;
    background-color: #161722;
  }
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
/* 进场的开始状态 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 指定过度的属性和时间 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
/* 进场的结束状态 */
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
[v-show] {
  display: none;
}
</style>
