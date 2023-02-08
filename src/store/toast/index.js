export default {
    namespaced:true,
    state: {
      isShowToast:false,
      title:''
    },
    mutations: {
        changeIsShowToast(state, payload) {
            state.isShowToast = payload.isShowToast,
            state.title=payload.title
          }
    },
    actions:{
        showToast(state,payload){
             state.commit('changeIsShowToast',{
                isShowToast:true,
                title: payload.title
                })
                setTimeout(() => {
                    state.commit('changeIsShowToast',{
                        isShowToast:false,
                        title: payload.title
                    })
                }, 1500);
        }
    }
  }
  