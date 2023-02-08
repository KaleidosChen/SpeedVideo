<template>
  <div class="home" ref="home">
    <videoCard v-for="item in videoList" :key="item.id" :cover="item.cover" :id="item.id" :PlaybackVolume="item.playbackVal" :duration="item.duration" :title="item.title" :author="item.author"></videoCard>
  </div>
</template>

<script>
import { getVideoList } from '@/api'
import videoCard from '@/components/videoCard.vue'
export default {
  name: 'home',
  data() {
    return {
      screenWidth: document.body.clientWidth,
      numeral: 0,
      timer: false,
      videoList: []
    }
  },

  mounted() {
    const that = this
    window.onresize = () =>
      (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    this.sjcount(this.screenWidth)
    // 获取视频列表
    this.getVideoList(8)
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function () {
          that.sjcount(that.screenWidth) //窗口大小变化后执行的方法
          that.reload() //窗口大小变化后执行的方法
          that.cardMargin(that.numeral)
          that.timer = false
        }, 10)
      }
    }
  },
  methods: {
    reload() {
      this.isAlive = false
      this.$nextTick(function () {
        this.isAlive = true
      })
    },
    sjcount(screewidth) {
      if (screewidth >= 1704 + 172) {
        this.numeral = 6
      } else if (screewidth >= 1420 + 172) {
        this.numeral = 5
      } else if (screewidth >= 1136 + 172) {
        this.numeral = 4
      } else if (screewidth >= 852 + 172) {
        this.numeral = 3
      } else if (screewidth >= 568 + 172) {
        this.numeral = 2
      }
    },
    cardMargin(num) {
      let div = document.getElementsByClassName('card')
      //   console.log(div)
      for (var i = 0; i < div.length; i++) {
        // console.log(div[i])
        let px = ((this.screenWidth - 172) / num - 264) / 2
        // div[i].style.margin = `10px calc((${this.screenWidth}-172px-${num}*264px)/${num})`
        div[i].style.margin = `10px ${px}px`
        // console.log(num)
        // console.log(px + 'px')
      }
    },

    // 获取视频列表
    async getVideoList(num) {
      let list = await getVideoList()
      //   console.log(this.videoList)

      while (this.videoList.length < num) {
        var random = Math.floor(Math.random() * list.length)
        this.videoList.push(list[random])
        list.splice(random, 1)
      }
      //   return new_videoList
      //   console.log(this.videoList)
    }

    // // 通过视频列表，随机返回n个视频的视频列表
    // getRandomVideo(num) {
    //   let length = videoList.length
    //   let new_videoList = []
    //   while (new_videoList.length < length) {
    //     var random = Math.round(Math.random() * num)
    //     if (new_videoList.indexOf(random) == -1) {
    //       new_videoList.push(random)
    //     }
    //   }
    //   //   return new_videoList
    //   console.log(new_videoList)
    // }
  },
  components: {
    videoCard
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  .card {
    margin: 10px 10px;
  }
}
</style>
