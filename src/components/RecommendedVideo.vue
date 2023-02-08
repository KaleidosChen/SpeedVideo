<template>
  <div class="recommendedVideo">
    <div class="img">
      <a @click="toVideo(id)">
        <img :src="require(`@/assets${cover}`)" alt="" />
      </a>
    </div>
    <div class="info">
      <a @click="toVideo(id)" style="cursor: pointer">
        <div class="title">{{ computedTitle }}</div>
      </a>
      <div class="authorInfo">
        <div class="likes">
          <img src="../assets/images/heart-white.png" alt="" />
          <span>{{ computedRecommends }}</span>
        </div>
        <div class="author" @click="toAuthor(authorId)">
          {{ author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserByVideoId } from '@/api'
export default {
  data() {
    return {
      //   id: 12345,
      //   img: require('@/assets/video/1.jpg'),
      //   title: '北枫试玩纯a d阿卡丽 纯物理装备都可以瞬间秒杀脆皮 #电竞兔叭哥',
      //   likes: 12000,
      //   author: '游戏观察院',
      authorId: 0
    }
  },
  props: ['cover', 'id', 'title', 'recommends', 'author'],
  created() {
    this.getUserByVideoId(this.id)
  },
  computed: {
    computedRecommends() {
      return this.recommends / 10000 > 1 ? this.recommends / 10000 + '万' : this.recommends
    },
    computedTitle() {
      return this.title.length >= 30 ? this.title.slice(0, 29) + '...' : this.title
    }
  },
  methods: {
    async getUserByVideoId(id) {
      let res = await getUserByVideoId(id)
      this.authorId = res[0].id
    },
    toVideo(id) {
      this.$router.push(`/video/${id}`)
      this.$router.go(0)
    },
    toAuthor(id) {
      this.$router.push(`/user/${id}`)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.recommendedVideo {
  height: 90px;
  margin: 20px 0;
  display: flex;
  .img {
    min-width: 160px;
    height: 90px;
    overflow: hidden;
    border-radius: 5px;
    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
  .info {
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      /* 将对象作为弹性伸缩盒子模型显示 */
      display: -webkit-box;
      /* 设置或检索伸缩盒对象的子元素的排列方式 。 */
      -webkit-box-orient: vertical;
      /*  用来限制在一个块元素显示的文本的行数 */
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .authorInfo {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .likes {
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
        }
        span {
          font-size: 12px;
          font-weight: 500;
        }
      }
      .author {
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }
      .author:hover {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
</style>
