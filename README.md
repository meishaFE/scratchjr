# scratch 运行器组件

## scratchjr 项目

[https://github.com/LLK/scratchjr](https://github.com/LLK/scratchjr)

## 改动的点

作品保存会将项目用到的资源和配置文件打包到一个 zip 文件中，文件后缀为 sjr

scratchjr 自带的素材打包的时候只会存一个地址，不会打包进作品文件中。所以运行器需要带上这些自带的素材

## 素材文件

项目打包在 dist 目录下，目录下的 static 目录为 scratchjr 的素材。提交时不会提交到 github

实际项目使用时需要将 static 手动复制到项目的静态文件目录下

## props

- `width` {number} 宽度
- `stageColor` {string} 运行器背景颜色
- `staticUrl` {string} 素材地址
- `getProject` {function} 获取作品内容，返回 base64
