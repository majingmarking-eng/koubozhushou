# 跟着说 · 自媒体人口播录制助手

“跟着说”是一款本地优先的口播录制助手：用户可以逐句录制自己的提示音，检查确认后，在正式口播时通过耳机播放对应句子，并使用语音命令控制下一句和重播。

## 当前能力

- 稿件目录：创建、打开和删除稿件
- 按标点和换行智能分句
- 逐句录制、试听、重录和确认
- 使用 IndexedDB 保存音频 Blob
- 可选择本机文件夹，将 WebM 录音导出保存
- 正式口播时逐句播放提示音
- 语音命令：`下一句`、`重播`、`上一句`
- 可配置 ASR 服务地址
- 本地 ASR 代理从服务端环境变量读取火山引擎凭证

## 快速开始

需要 Node.js 18+。

```bash
cp .env.example .env.local
# 编辑 .env.local，填写 ASR_ENV_PATH
ASR_ENV_PATH="/absolute/path/to/backend/.env" node server.mjs
```

打开 <http://127.0.0.1:4173>。

也可以直接打开 `index.html` 使用稿件编辑和本机录音功能，但正式 ASR 需要启动 `server.mjs` 或在设置页配置一个可访问的 ASR 服务地址。

## ASR 配置

页面右上角的齿轮按钮可以配置 ASR 服务地址。接口约定：

- `POST /api/asr`
- 请求体为音频二进制数据
- 服务端负责保存密钥并调用 ASR 提供商
- 跨域部署时需要允许网站来源的 CORS 请求

不要把 API Key 写进前端、提交到 Git 或放进公开仓库。`.env.example` 只包含路径示例，不包含密钥。

## 存储说明

稿件索引和轻量设置使用 `localStorage`；音频使用 IndexedDB 保存。选择文件夹后，浏览器会通过 File System Access API 将 WebM 文件写入用户主动选择的目录。录音文件默认被 `.gitignore` 排除。

## 技术栈

原生 HTML、CSS、JavaScript、MediaRecorder、IndexedDB、Web Speech API，以及 Node.js 原生 HTTP 服务。

## 开源协议

本项目使用 MIT License，详见 [LICENSE](LICENSE)。
