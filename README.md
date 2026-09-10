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

在线体验：<https://majingmarking-eng.github.io/koubozhushou/>（GitHub Pages）。

需要 Node.js 18+。

```bash
cp .env.example .env.local
# 编辑 .env.local，填写 ASR_ENV_PATH
ASR_ENV_PATH="/absolute/path/to/backend/.env" node server.mjs
```

打开 <http://127.0.0.1:4173>。

也可以直接打开 `index.html` 使用稿件编辑和本机录音功能，但正式 ASR 需要启动 `server.mjs` 或在设置页配置一个可访问的 ASR 服务地址。

## 免费部署（Render）

项目提供了 [`render.yaml`](render.yaml)，推荐使用 Render 的 Free Web Service 部署。Render 支持 Node.js Web Service、环境变量和 HTTPS；免费实例会在一段时间无请求后休眠，首次访问可能需要等待冷启动。

1. 将本仓库推送到 GitHub。
2. 登录 [Render](https://render.com)，选择 **New → Blueprint**。
3. 连接 `majingmarking-eng/koubozhushou` 仓库并选择 `render.yaml`。
4. 创建服务时填写 `VOLCENGINE_API_KEY` 和 `VOLCENGINE_RESOURCE_ID`。
5. 部署完成后打开 Render 提供的 `https://你的服务名.onrender.com` 地址。

线上前端和 ASR 代理由同一个 Node 服务提供，默认使用 `/api/asr`，不需要每位用户再次配置。API Key 只填写在 Render 的 Environment Variables 中，不要提交到 GitHub。

如果不使用 Blueprint，也可以手动创建 Render Web Service：Build Command 留空，Start Command 填 `node server.mjs`，并在 Environment Variables 中设置上述两个变量。

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

## 部署限制

Render Free 适合演示、测试和个人项目，不建议直接用于高并发生产环境。免费 Web Service 会休眠，且不提供持久化磁盘；本项目的稿件和录音仍保存在每位用户的浏览器本地，ASR 服务只处理用户当前提交的音频。

## 开源协议

本项目使用 MIT License，详见 [LICENSE](LICENSE)。
