const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// module.exports = {
//   webpack: {
//     configure: {
//       experiments: {
//         topLevelAwait: true,
//       },
//     },
//   },
// };