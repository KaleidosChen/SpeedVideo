<template>
  <div class="userBox">
    <div class="userInfo">
      <div class="left">
        <img class="avatar" :src="user.avatar" alt="" />
        <div class="user">
          <div class="user_name">{{ user.name }}</div>
          <div class="user_number">抖音号：{{ user.number }}</div>
          <div class="user_details">{{ user.details }}</div>
          <div class="user_data">
            <div class="dataBox">
              <span>关注</span>
              <span class="data">{{ user.follows }}</span>
            </div>
            <div class="dataBox">
              <span>粉丝</span>
              <span class="data">{{ user.fans }}</span>
            </div>
            <div class="dataBox">
              <span>获赞</span>
              <span class="data">{{ user.recommends }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="this.$route.params.id != user.id">
          <span>下载电脑客户端，桌面快捷访问</span>
          <span class="download">下载</span>
        </div>
        <div class="right red" v-else>关注</div>
      </div>
    </div>
    <div class="btnBox">
      <div style="color: #fff">
        <span>作品</span>
        <span>{{ videoList.length }}</span>
      </div>
      <div>喜欢</div>
      <div>收藏</div>
      <div>观看历史</div>
    </div>
    <div class="videoBox">
      <div v-for="item in videoList" :key="item.id">
        <userVideo :id="item.id" :title="item.title" :playbackVal="item.playbackVal" :cover="item.cover" :url="item.url"></userVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { queryId, getVideoListByAuthorId } from '@/api'
import userVideo from '@/components/userVideo.vue'
export default {
  data() {
    return {
      user: {
        id: this.$route.params.id,
        avatar: '',
        name: '',
        number: '',
        details: '',
        follows: 0,
        fans: 0,
        recommends: 0
      },
      //   videoList: [
      //     { id: 10001, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' },
      //     { id: 10002, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' },
      //     { id: 10003, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' },
      //     { id: 10004, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' },
      //     { id: 10005, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' },
      //     { id: 10006, title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥', playbackVolume: 11000, cover: require('@/assets/video/1.jpg'), url: '/video/10001' }
      //   ]
      videoList: []
    }
  },
  created() {
    this.queryId(this.user.id)
    this.getVideoListByAuthorId(this.user.id)
  },
  methods: {
    async queryId(id) {
      let res = await queryId(id)
      this.user.avatar = require(`@/assets${res[0].userAvatar}`)
      this.user.name = res[0].userName
      this.user.number = res[0].userNumber
      this.user.details = res[0].details
      this.user.follows = res[0].follows
      this.user.fans = res[0].fans
      this.user.recommends = res[0].recommends
    },
    async getVideoListByAuthorId(name) {
      this.videoList = await getVideoListByAuthorId(name)
      console.log(this.videoList)
      this.videoList.forEach((item) => {
        item.cover = require(`@/assets${item.cover}`)
      })
      //   for (var item in this.videoList) {
      //     console.log(item)
      //     item.cover = require(`@/assets${item.cover}`)
      //   }
    }
  },
  components: {
    userVideo
  }
}
</script>

<style lang="less" scoped>
.userBox {
  margin: 0 6vw;
  .userInfo {
    display: flex;
    justify-content: space-between;
    margin: 32px 0px 24px;
    .left {
      display: flex;

      .avatar {
        border-radius: 50% 50%;
        overflow: hidden;
        width: 112px;
        height: 112px;
      }
      .user {
        margin-left: 32px;
        &_name {
          color: #fff;
          font-size: 20px;
          font-weight: 500;
        }
        &_number {
          margin-top: 10px;
          font-size: 12px;
        }
        &_details {
          margin-top: 10px;
          font-size: 12px;
        }
        &_data {
          display: flex;
          .dataBox {
            margin-top: 10px;
            font-size: 14px;
            .data {
              margin-left: 10px;
              margin-right: 30px;
              line-height: 24px;
              font-size: 16px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: flex-end;
      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(255, 255, 255, 0.2);
        padding: 5px 10px;
        &.download {
          cursor: pointer;
        }
      }
    }
    .red {
      font-size: 18px;
      font-weight: 500;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 5px 10px;
      color: black;
      cursor: pointer;
    }
  }
  .btnBox {
    display: flex;
    line-height: 64px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    div {
      cursor: pointer;
      margin-right: 40px;
      font-size: 20px;
      span {
        margin-right: 10px;
      }
    }
  }
  .videoBox {
    display: flex;
    flex-wrap: wrap;
    div {
      margin: 0px 10px;
    }
  }
}
</style>
