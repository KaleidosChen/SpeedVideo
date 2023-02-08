<template>
  <div class="video">
    <div class="left">
      <div class="videoBox">
        <video :src="video.url" controls></video>
      </div>
      <div class="videoTitle">{{ video.title }}</div>
      <div class="iconGroup">
        <div class="like icon">
          <img src="@/assets/images/heart-white.png" alt="" />
          <span>{{ numParse(video.recommends) }}</span>
        </div>
        <div class="content icon">
          <img src="@/assets/images/message_white.png" alt="" />
          <span>{{ numParse(video.comments) }}</span>
        </div>
        <div class="collect icon">
          <img src="@/assets/images/star_white.png" alt="" />
          <span>{{ numParse(video.collects) }}</span>
        </div>
        <div class="share icon">
          <img src="@/assets/images/logout_white.png" alt="" />
          <span>{{ numParse(video.shares) }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="info">
        <div class="left">
          <div class="avatar" @click="toAuthor(author.id)" style="cursor: pointer">
            <img :src="author.avatar" alt="" />
          </div>
          <div class="authorInfo">
            <div class="author" @click="toAuthor(author.id)" style="cursor: pointer">{{ author.name }}</div>
            <div class="fans">
              <div>
                <span>粉丝</span>
                <span class="data">{{ numParse(author.fans) }}</span>
              </div>
              <div>
                <span>获赞</span>
                <span class="data">{{ numParse(author.recommends) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="followBtn">关注</div>
      </div>
      <div class="more">
        <div class="recommend">推荐视频</div>
        <div>
          <RecommendedVideo v-for="item in recommendedVideo" :key="item.id" :id="item.id" :cover="item.cover" :title="item.title" :recommends="item.recommends" :author="item.author"></RecommendedVideo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoById, getUserByVideoId, getVideoList } from '@/api'
import RecommendedVideo from '@/components/RecommendedVideo.vue'

export default {
  data() {
    return {
      video: {
        id: this.$route.params.id,
        title: '',
        url: '',
        recommends: 0,
        comments: 0,
        collects: 0,
        shares: 0
      },
      author: {
        avatar: '',
        name: '',
        fans: 0,
        recommends: 0,
        id: 0
      },
      recommendedVideo: []
    }
  },
  props: [],
  created() {
    this.getVideoById(this.video.id)
    this.getUserByVideoId(this.video.id)
    this.getVideoList(4)
  },
  methods: {
    // 通过视频id获取视频信息
    async getVideoById(id) {
      let res = await getVideoById(id)
      this.video.title = res[0].title
      this.video.url = require(`@/assets${res[0].url}`)
      this.video.recommends = res[0].recommends
      this.video.comments = res[0].comments
      this.video.collects = res[0].collects
      this.video.shares = res[0].shares

      //   console.log(this.video)
      //   console.log(res)
    },
    // 通过视频id获取作者user信息
    async getUserByVideoId(id) {
      let res = await getUserByVideoId(id)
      //   console.log(res)
      this.author.avatar = require(`@/assets${res[0].userAvatar}`)
      this.author.name = res[0].userName
      this.author.fans = res[0].fans
      this.author.recommends = res[0].recommends
      this.author.id = res[0].id
    },
    numParse(val) {
      if (val / 10000 > 1) {
        return (val / 10000).toFixed(1) + '万'
      } else {
        return val
      }
    },

    // 获取视频列表
    async getVideoList(num) {
      let list = await getVideoList()
      //   console.log(this.videoList)
      while (this.recommendedVideo.length < num) {
        var random = Math.floor(Math.random() * list.length)
        if (this.video.id !== list[random].id) {
          this.recommendedVideo.push(list[random])
          list.splice(random, 1)
        }
      }
      // return this.recommendedVideo
      //   console.log(this.recommendedVideo)
    },
    toAuthor(id) {
      this.$router.push(`/user/${id}`)
      //   this.$router.go(0)
    }
  },
  components: {
    RecommendedVideo
  }
}
</script>

<style lang="less" scoped>
.video {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  .left {
    margin-right: 20px;
    .videoBox {
      width: 60vw;
      height: calc(60vw / 16 * 9);
      video {
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }
    .videoTitle {
      margin: 10px 0;
      font-size: 20px;
      color: #fff;
      max-width: 60vw;
    }
    .iconGroup {
      display: flex;
      .icon {
        margin-right: 30px;
        img {
          width: 30px;
          vertical-align: middle;
        }
        span {
          padding-left: 10px;
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
  .right {
    width: 25vw;
    .info {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 10px;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        .avatar {
          width: 60px;
          height: 60px;
          min-width: 60px;
          min-height: 60px;
          background-color: #fff;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .avatar:hover {
          transform: scale(1.1);
        }
        .authorInfo {
          padding-left: 10px;
          .author {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 30px;
            cursor: pointer;
          }
          .author:hover {
            color: rgba(255, 255, 255, 1);
          }
        }

        .fans {
          display: flex;
          font-size: 12px;
          .data {
            padding: 0 10px 0 5px;
            font-size: 14px;
            color: #fff;
          }
        }
      }

      .followBtn {
        color: #000;
        font-size: 16px;
        padding: 5px 15px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .more {
      .recommend {
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
