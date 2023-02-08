<template>
  <div class="card" :id="id">
    <a @click="toVideo(id)">
      <div class="video">
        <img class="cover" :src="require(`@/assets${cover}`)" alt="" />

        <div class="recommendCount">
          <img src="@/assets/images/heart-white.png" alt="" height="16px" />
          <div>{{ numParse(PlaybackVolume) }}</div>
        </div>
        <div class="duration">{{ duration }}</div>
      </div>
      <div class="info">
        <div class="title">{{ titleCheck(title) }}</div>
        <div class="author">@{{ author }}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['id', 'PlaybackVolume', 'duration', 'title', 'author', 'cover'],

  methods: {
    // 检查标题字数
    titleCheck(title) {
      let res = ''
      //   console.log(title.length)
      if (title.length >= 30) {
        res = title.slice(0, 29) + '...'
      } else {
        res = title
      }
      return res
    },
    // 点击视频卡片跳转到新页面
    toVideo(id) {
      let newPage = this.$router.resolve({ name: 'video', params: { id: id } })
      window.open(newPage.href, '_blank')
    },
    numParse(val) {
      if (val / 10000 > 1) {
        return (val / 10000).toFixed(1) + '万'
      } else {
        return val
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 264px;
  height: 306px;
  background-color: #252632;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  .video {
    width: 264px;
    height: 196px;
    position: relative;
    font-size: 14px;
    .cover {
      width: 264px;
      height: 196px;
    }
    .recommendCount {
      color: rgba(255, 255, 255, 0.9);
      position: absolute;
      bottom: 10px;
      left: 10px;
      display: flex;
      align-items: center;
    }
    .duration {
      color: rgba(255, 255, 255, 0.9);
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px 5px;
      border-radius: 5px;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
  .info {
    height: 110px;
    box-sizing: border-box;
    padding: 12px 10px;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      color: rgba(255, 255, 255, 0.9);
    }
    .author {
      color: rgba(255, 255, 255, 0.2);
      margin-top: 20px;
    }
  }
}
.card:hover {
  animation: myfirst 0.2s forwards;
}

@keyframes myfirst {
  from {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
  }
  to {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  }
}
</style>
