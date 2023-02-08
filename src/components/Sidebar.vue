<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/logo.webp" alt="" />
      <span>快闪</span>
    </div>
    <div class="iconBox">
      <ul>
        <li v-for="item in MyList" :key="item.id" class="icon" @click="switchTab(item.name)" @mouseenter="focusTab(item.id)" @mouseleave="blurTab(item.id)">
          <img :src="path == item.name ? item.imgSelected : item.img" alt="" width="15%" />
          <span :style="path == item.name ? 'color: rgba(255, 255, 255, 1)' : 'color: rgba(255, 255, 255, 0.2)'">{{ item.label }}</span>
        </li>
      </ul>
      <div class="inline" style="width: 80px; height: 8px"></div>
      <ul class="typeList">
        <li v-for="item in TypeList" :key="item.id" class="icon" @click="switchTab(item.name)" @mouseenter="focusTabb(item.id)" @mouseleave="blurTabb(item.id)">
          <img :src="$route.path == item.name ? item.imgSelected : item.img" alt="" width="15%" />
          <span :style="path == item.name ? 'color: rgba(255, 255, 255, 1)' : 'color: rgba(255, 255, 255, 0.2)'">{{ item.label }}</span>
        </li>
      </ul>
      <div class="inline" style="width: 80px; height: 8px"></div>
      <div class="title">这里是徐悦纳的网站，关于类似抖音的视频网页端。</div>
      <div class="title">如果有什么问题可以向kaleidoschen@qq.com邮箱发送邮件给我。</div>
      <div class="title">祝你越努力月幸运。</div>
      <div class="inline" style="width: 120px; height: 8px"></div>
      <ul class="linkList">
        <li>广告投放</li>
        <li>用户服务协议</li>
        <li>隐私政策</li>
        <li>账号找回</li>
        <li>联系我们</li>
        <li>加入我们</li>
        <li>营业执照</li>
        <li>友情链接</li>
        <li>站点地图</li>
        <li>下载快闪</li>
        <li>快闪电商</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.name,
      MyList: [
        {
          id: 1,
          img: require('@/assets/images/home.png'),
          imgSelected: require('@/assets/images/home-selected.png'),
          label: '首页',
          name: 'home'
        },
        {
          id: 2,
          img: require('@/assets/images/like.png'),
          imgSelected: require('@/assets/images/like-selected.png'),
          label: '推荐',
          name: 'recommend'
        },
        {
          id: 3,
          img: require('@/assets/images/adduser.png'),
          imgSelected: require('@/assets/images/adduser-selected.png'),
          label: '关注',
          name: 'follow'
        },
        {
          id: 4,
          img: require('@/assets/images/team.png'),
          imgSelected: require('@/assets/images/team-selected.png'),
          label: '朋友',
          name: 'friend'
        },
        {
          id: 5,
          img: require('@/assets/images/user.png'),
          imgSelected: require('@/assets/images/user-selected.png'),
          label: '我的',
          name: 'user'
        }
      ],
      TypeList: [
        {
          id: 1,
          img: require('@/assets/images/fire.png'),
          imgSelected: require('@/assets/images/fire-selected.png'),
          label: '热点',
          name: '/hot'
        },
        {
          id: 2,
          img: require('@/assets/images/instagram.png'),
          imgSelected: require('@/assets/images/instagram-selected.png'),
          label: '直播',
          name: '/live'
        },
        {
          id: 3,
          img: require('@/assets/images/flag.png'),
          imgSelected: require('@/assets/images/flag-selected.png'),
          label: '游戏',
          name: '/game'
        },
        {
          id: 4,
          img: require('@/assets/images/laptop.png'),
          imgSelected: require('@/assets/images/laptop-selected.png'),
          label: '数码',
          name: '/digital'
        },
        {
          id: 5,
          img: require('@/assets/images/rest.png'),
          imgSelected: require('@/assets/images/rest-selected.png'),
          label: '美食',
          name: '/foods'
        },
        {
          id: 6,
          img: require('@/assets/images/customerservice.png'),
          imgSelected: require('@/assets/images/customerservice-selected.png'),
          label: '音乐',
          name: '/music'
        },
        {
          id: 7,
          img: require('@/assets/images/experiment.png'),
          imgSelected: require('@/assets/images/experiment-selected.png'),
          label: '知识',
          name: '/knows'
        }
      ]
    }
  },
  watch: {
    '$route.name': {
      handler(newVal, oldVal) {
        // console.log(oldVal)

        if (oldVal != newVal) {
          //   console.log('路由地址发生了变化,准备更新sideBar')
          this.path = newVal
        }
        // console.log('this.path' + this.path)
        // console.log('---' + newVal)
        // console.log(this.$route)
      }
    }
  },
  created() {
    // console.log(this.path)
    // console.log(this.$route.path)
  },
  methods: {
    switchTab(path) {
      //判断是否点击的是同一个路由
      //   if (this.$route.path == path) return
      //对应跳转页面
      if (path != 'user') {
        this.$router.push({ name: path })
      } else {
        let token = JSON.parse(window.sessionStorage.getItem('user'))
        let id = 0
        if (token) {
          id = token.id
        }
        this.$router.push({ name: 'user', params: { id: id } })
      }
      //   this.$router.push({ name: path })
    },
    focusTab(id) {
      let li = document.getElementsByTagName('li')[id - 1]
      li.childNodes[0].src = this.MyList[id - 1].imgSelected
      li.childNodes[1].style.color = 'rgba(255, 255, 255, 1)'
    },
    blurTab(id) {
      if (this.path === this.MyList[id - 1].name) return false
      let li = document.getElementsByTagName('li')[id - 1]
      li.childNodes[0].src = this.MyList[id - 1].img
      li.childNodes[1].style.color = 'rgba(255, 255, 255, 0.2)'
    },
    focusTabb(id) {
      let li = document.getElementsByClassName('typeList')[0].getElementsByTagName('li')[id - 1]
      li.childNodes[0].src = this.TypeList[id - 1].imgSelected
      li.childNodes[1].style.color = 'rgba(255, 255, 255, 1)'
    },
    blurTabb(id) {
      let li = document.getElementsByClassName('typeList')[0].getElementsByTagName('li')[id - 1]
      li.childNodes[0].src = this.TypeList[id - 1].img
      li.childNodes[1].style.color = 'rgba(255, 255, 255, 0.2)'
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  width: 172px;
  background-color: #060716;
  color: #fff;
  overflow-y: scroll;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 35%;
    }
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .iconBox {
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      cursor: pointer;
      span {
        font-size: 16px;
        margin-left: 10px;
        font-weight: 550;
      }
    }
    .inline {
      border-bottom: 1px solid gray;
      margin: 30px auto;
    }
    .title {
      padding: 10px 10px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.2);
    }
    .linkList {
      margin: 30px 20px;
      font-size: 10px;
      display: flex;
      flex-wrap: wrap;
      li {
        color: rgba(255, 255, 255, 0.3);
        margin-top: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
      li:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>
