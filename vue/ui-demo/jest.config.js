module.exports = {
    transform: {
      // .vue文件用 vue-jest 处理
      '^.+\\.vue$': 'vue-jest',
      // .js或者.jsx用 babel-jest处理
      '^.+\\.jsx?$': 'babel-jest', 
      //.ts文件用ts-jest处理
      '^.+\\.ts$': 'ts-jest'
    },
    testMatch: ['**/?(*.)+(spec).[jt]s?(x)']
}
  