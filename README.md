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
- 使用浏览器 Web Speech API 识别语音命令，不需要 API Key

## 快速开始

在线体验：<https://majingmarking-eng.github.io/koubozhushou/>（GitHub Pages）。

直接打开在线版本即可使用：<https://majingmarking-eng.github.io/koubozhushou/>。

也可以使用本地静态服务器打开项目。语音命令依赖浏览器 Web Speech API，不需要配置 API Key 或豆包 ASR。

## 语音命令与浏览器支持

正式口播时点击一次“开始口播”解锁手机音频。提示音播放结束后，浏览器开始监听：`下一句`、`重播`、`上一句`。Chrome/Edge 支持最好，Safari 支持取决于系统版本，Firefox 支持有限。建议使用 HTTPS 或 `localhost`，不要直接依赖 `file://`。

## 存储说明

稿件索引和轻量设置使用 `localStorage`；音频使用 IndexedDB 保存。选择文件夹后，浏览器会通过 File System Access API 将 WebM 文件写入用户主动选择的目录。录音文件默认被 `.gitignore` 排除。

## 技术栈

原生 HTML、CSS、JavaScript、MediaRecorder、IndexedDB 和 Web Speech API。

## 开源协议

本项目使用 MIT License，详见 [LICENSE](LICENSE)。
