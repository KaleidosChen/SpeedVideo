<template>
  <a @click="toVideo(id)" style="cursor: pointer">
    <div class="userVideo" :id="id">
      <div class="cover_box">
        <img class="cover" :src="cover" alt="" />
        <div class="cover_info">
          <img src="@/assets/images/fire-selected.png" alt="" />
          <span>{{ playbackVal }}</span>
        </div>
      </div>
      <div class="title">{{ title }}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['id', 'title', 'playbackVal', 'cover', 'url'],
  methods: {
    toVideo(id) {
      this.$router.push(`/video/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.userVideo {
  width: 12vw;
  height: 20vw;
  margin-top: 10px;
  margin-bottom: 20px;
  .cover_box {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    .cover {
      height: 18vw;
      display: block;
    }
    .cover_info {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      left: 5px;

      img {
        width: 16px;
        height: 16px;
      }
      span {
        color: #fff;
      }
    }
  }
  .cover_box:hover .cover {
    transform: scale(1.1);
  }

  .title {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>
