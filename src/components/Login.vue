<template>
  <div>
    <div class="bg" @click.stop="cancelLoginMenu()"></div>
    <div class="menu">
      <div class="menuBtnBox">
        <span class="menuBtn" @click="isLoginMenu = true" :style="isLoginMenu == true ? 'color:#000' : ''">登录</span>
        <span>丨</span>
        <span class="menuBtn" @click="isLoginMenu = false" :style="isLoginMenu == false ? 'color:#000' : ''">注册</span>
      </div>
      <div>
        <div v-if="isLoginMenu" class="loginMenu">
          <form>
            <div class="inputBox">
              <label for="">电话号</label>
              <input type="text" v-model="loginPhoneNumber" @mouseenter="$event.target.style.border = '1px solid rgba(0,0,0,1)'" @mouseleave="$event.target.style.border = '1px solid rgba(0,0,0,0.4)'" />
            </div>
            <div>
              <span class="check" v-if="validPhone">请输入11位手机号，如:13111111111</span>
              <span class="check red" v-else>*手机号码格式错误</span>
            </div>

            <div class="inputBox">
              <label for="">密码</label>
              <input type="password" v-model="loginPassword" autocomplete @mouseenter="$event.target.style.border = '1px solid rgba(0,0,0,1)'" @mouseleave="$event.target.style.border = '1px solid rgba(0,0,0,0.4)'" />
            </div>
            <div>
              <span class="check" v-if="validPassword">请输入密码</span>
              <span class="check red" v-else>*手机号或密码错误</span>
            </div>

            <div>
              <button @click.prevent="LoginSubmit()">确定</button>
            </div>
          </form>
        </div>
        <div v-else class="loginMenu">
          <form>
            <div class="inputBox">
              <label for="">电话号</label>
              <input type="text" v-model="phoneNumber" @mouseenter="$event.target.style.border = '1px solid rgba(0,0,0,1)'" @mouseleave="$event.target.style.border = '1px solid rgba(0,0,0,0.4)'" />
            </div>
            <div>
              <span class="check" v-if="validPhone">请输入11位手机号，如:13111111111</span>
              <span class="check red" v-else>*手机号码格式错误</span>
            </div>

            <div class="inputBox">
              <label for="">密码</label>
              <input type="password" v-model="password" autocomplete @mouseenter="$event.target.style.border = '1px solid rgba(0,0,0,1)'" @mouseleave="$event.target.style.border = '1px solid rgba(0,0,0,0.4)'" />
            </div>
            <div>
              <span class="check" v-if="validPassword">请输入6到20位密码，包括：._/!?</span>
              <span class="check red" v-else>*密码格式错误</span>
            </div>

            <div class="inputBox">
              <label for="">确认密码</label>
              <input type="password" v-model="rePassword" autocomplete @mouseenter="$event.target.style.border = '1px solid rgba(0,0,0,1)'" @mouseleave="$event.target.style.border = '1px solid rgba(0,0,0,0.4)'" />
            </div>
            <div>
              <span class="check" v-if="validRepassword">请重复输入一致的密码</span>
              <span class="check red" v-else>*密码输入不一致</span>
            </div>

            <div>
              <button @click.prevent="registerSubmit()">确定</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAPI, loginAPI, queryPhone } from '@/api/index.js'
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoginMenu: true,

      //   登录信息和验证
      loginPhoneNumber: '',
      loginPassword: '',

      validLoginPhone: true,
      validLoginPassword: true,
      //   注册信息和验证
      phoneNumber: '',
      password: '',
      rePassword: '',

      validPhone: true,
      validPassword: true,
      validRepassword: true
    }
  },
  methods: {
    ...mapMutations({
      changeIsShowLoginMenu: 'loginStatus/changeIsShowLoginMenu'
    }),
    ...mapActions({
      showToast: 'toast/showToast'
    }),
    cancelLoginMenu() {
      //   console.log('点击了')
      this.changeIsShowLoginMenu(false)
    },

    // 登录
    async LoginSubmit() {
      //   let api = await loginAPI({})
      //   this.validLoginPhone = /^[\d]{11}$/.test(this.loginPhoneNumber) ? true : false

      // 信息验证
      if (/^[\d]{11}$/.test(this.loginPhoneNumber)) {
        this.validPhone = true
      } else {
        this.validPhone = false
        return
      }

      if (/^[\w]{6,20}$/.test(this.loginPassword)) {
        this.validPassword = true
      } else {
        this.validPassword = false
        return
      }

      //   api请求
      let res = await loginAPI({
        phone: this.loginPhoneNumber,
        password: this.loginPassword
      })

      if (res.query == true) {
        let user = await queryPhone(res.phone)
        console.log(user[0])
        window.sessionStorage.setItem('user', JSON.stringify(user[0]))
        console.log('注入token成功')

        //   消息窗
        this.showToast({ title: '登录成功' })
        //   刷新页面
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      } else {
        this.showToast({ title: '该手机号或密码错误' })
        return
      }
    },
    // 注册
    async registerSubmit() {
      // 信息验证
      if (/^[\d]{11}$/.test(this.phoneNumber)) {
        this.validPhone = true
      } else {
        this.validPhone = false
        return
      }

      if (/^[\w]{6,20}$/.test(this.password)) {
        this.validPassword = true
      } else {
        this.validPassword = false
        return
      }

      if (this.password == this.rePassword) {
        this.validRepassword = true
      } else {
        this.validRepassword = false
        return
      }

      let isRegistered = await queryPhone(this.phoneNumber)
      if (isRegistered.length == 0) {
        //   api请求
        let register = await registerAPI({
          phone: this.phoneNumber,
          password: this.password
        })
        //   console.log(register)

        //   注入token
        let user = await queryPhone(this.phoneNumber)
        console.log(user)
        window.sessionStorage.setItem('user', JSON.stringify(user))
        console.log('注入token成功')

        //   消息窗
        this.showToast({ title: '注册成功' })
        //   刷新页面
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      } else {
        this.showToast({ title: '该手机号已经注册' })
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
}
.menu {
  width: 400px;
  //   height: 300px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
  .menuBtnBox {
    margin: 10px 0px 30px;
    span {
      color: rgba(0, 0, 0, 0.4);
      font-size: 20px;
    }
    .menuBtn {
      cursor: pointer;
    }
  }
  .loginMenu {
    color: #000;
    font-size: 20px;
    text-align: center;
    .inputBox {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    label {
      margin-right: 10px;
    }
    input {
      height: 28px;
      font-size: 20px;
      text-indent: 1em;
    }
    button {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 20px;
      padding: 5px 10px;
    }
    .check {
      font-size: 12px;
    }
    .red {
      color: orangered;
    }
  }
}
</style>
