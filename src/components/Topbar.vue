<template>
  <div class="topbar">
    <div class="search">
      <input type="text" placeholder="搜索一下" />
      <div class="searchBtn">
        <img :src="searchBtnImg" alt="" height="30px" />
        <span>搜索</span>
      </div>
    </div>
    <div class="topbarBtns">
      <ul class="topbarList">
        <li v-for="item in topbarList" :key="item.id">
          <div class="icon">
            <img :src="item.img" alt="" width="20px" />
          </div>
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <div class="inline" style="width: 8px; height: 30px"></div>
      <div style="margin-right: 30px; cursor: pointer" @mouseenter="isShowAvatarPannel = true" @mouseleave="isShowAvatarPannel = false">
        <img :src="avatar" @click="goMyChannel()" style="width: 32px; height: 32px; border-radius: 50% 50%" />
        <div class="avatarPannel" v-show="isShowAvatarPannel">
          <ul>
            <li @click="goMyChannel()" v-show="!this.isLogin">登录or注册</li>
            <li @click="goMyChannel()">个人中心</li>
            <li @click="exit()" v-show="this.isLogin">退出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchBtnImg: require('@/assets/images/zoom in-white.png'),
      topbarList: [
        {
          id: 1,
          img: require('@/assets/images/laptop.png'),
          label: '客户端'
        },
        {
          id: 2,
          img: require('@/assets/images/star.png'),
          label: '收藏网页'
        },
        {
          id: 3,
          img: require('@/assets/images/team.png'),
          label: '合作'
        },
        {
          id: 4,
          img: require('@/assets/images/notification.png'),
          label: '通知'
        },
        {
          id: 5,
          img: require('@/assets/images/message.png'),
          label: '私信'
        },
        {
          id: 6,
          img: require('@/assets/images/cloud-upload.png'),
          label: '投稿'
        }
      ],
      avatar: require('@/assets/images/custom.png'),
      isShowAvatarPannel: false
    }
  },
  created() {
    // let avatarImg = JSON.parse(window.sessionStorage.getItem('user')).userAvatar || null
    // console.log(avatarImg)
    this.avatar = this.isLogin ? require(`@/assets${JSON.parse(window.sessionStorage.getItem('user')).userAvatar}`) : require('@/assets/images/custom.png')
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.loginStatus.isLogin,
      isShowLoginMenu: (state) => state.loginStatus.isShowLoginMenu
    })
  },
  methods: {
    ...mapMutations({
      changeIsShowLoginMenu: 'loginStatus/changeIsShowLoginMenu'
    }),
    // 去我的频道
    goMyChannel() {
      //   console.log('点击了')

      if (this.isLogin == false) {
        this.changeIsShowLoginMenu(true)
        return
      }
      let user = JSON.parse(window.sessionStorage.getItem('user'))
      console.log(user)
      this.$router.push({ name: 'user', params: { id: user.id } })
    },
    exit() {
      window.sessionStorage.removeItem('user')
      this.$router.push('/home')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.topbar {
  width: 100%;
  height: 60px;
  background-color: #161722;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #4e4e4e;
  .search {
    display: flex;
    align-items: center;
    border: 2px solid #bababd;
    border-radius: 5px 5px;
    margin-left: 30px;
    input {
      text-indent: 0.5em;
      font-size: 14px;
      font-weight: 550;
      line-height: 36px;
      outline: none;
      border: none;
      background-color: #060716;
      color: #dbdbdd;
      width: 320px;
    }
    .searchBtn {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        font-size: 16px;
        font-weight: 500;
        color: #f8f8f8;
        margin: 0 10px 0 5px;
      }
    }
  }
  .search:hover {
    border: 2px solid #f8f8f8;
  }
  .topbarBtns {
    display: flex;
    align-items: center;

    .topbarList {
      display: flex;
      li {
        width: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50% 50%;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
        }
      }
    }

    .avatarPannel {
      border-radius: 5px;
      text-align: center;
      position: fixed;
      right: 0.5vw;
      top: 5vh;
      z-index: 999;
      li {
        padding: 5px 5px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .inline {
    border-right: 1px solid gray;
    margin: auto 10px;
  }
}
</style>
