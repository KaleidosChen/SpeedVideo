export default {
    namespaced:true,
    state: {
      isLogin:window.sessionStorage.getItem('user')?true:false,
      isShowLoginMenu:false
    },
    mutations: {
      changeIsShowLogin(state){
          state.isShowLogin=!state.isShowLogin
      },
      changeIsShowLoginMenu(state,payload){
        state.isShowLoginMenu=payload
        }
  
    },

  }
  