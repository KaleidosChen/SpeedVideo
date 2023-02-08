const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
        '/api':{
            target:'http://localhost:3000/',
            pathRewrite:{
                '^/api':''
            }
        }
    }
  }
})




// devServer:{
//     proxy:{
//         '/api':{
//             target:'http://localhost:3000/',
//             pathRewrite:{
//                 '^/api':''
//             }
//         }
//     }
//   }