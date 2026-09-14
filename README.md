# 跟着说 · 自媒体人口播录制助手

“跟着说”是一款本地优先的口播录制助手：用户可以逐句录制自己的提示音，检查确认后，在正式口播时通过耳机播放对应句子，并使用语音命令控制下一句和重播。

## 当前能力

- 稿件目录：创建、打开和删除稿件
- 按标点和换行智能分句
- 逐句录制、试听、重录和确认
- 同时使用 IndexedDB 与浏览器本地私有文件系统（OPFS）保存音频
- 可选择本机文件夹，将 WebM 录音导出保存
- 正式口播时逐句播放提示音
- 电脑快捷键和手机滑动控制句子播放

## 快速开始

在线体验：<https://majingmarking-eng.github.io/koubozhushou/>（GitHub Pages）。

直接打开在线版本即可使用：<https://majingmarking-eng.github.io/koubozhushou/>。

也可以使用本地静态服务器打开项目。语音命令依赖浏览器 Web Speech API，不需要配置 API Key 或豆包 ASR。

## 播放控制

正式口播时点击一次“开始口播”解锁手机音频。电脑端按 `←` / `→` 切换上一句和下一句，按空格键或 `R` 重播当前句；手机端左右滑动或点击页面按钮控制播放。不再启动浏览器 Web Speech API，不需要 API Key，也不会额外申请浏览器语音识别权限。

## 存储说明

稿件索引和轻量设置使用 `localStorage`；音频同时写入 IndexedDB 与浏览器本地私有文件系统（OPFS），其中一份不可用时会尝试从另一份自动恢复。应用会请求持久化存储权限。选择文件夹后，支持的桌面浏览器还会通过 File System Access API 将录音写入用户主动选择的目录。

手机浏览器中的 OPFS 是网站专属的本地文件，普通刷新不会删除；清除该网站的数据、卸载浏览器或系统清理存储后仍可能消失。重要录音建议另行导出备份。

## 技术栈

原生 HTML、CSS、JavaScript、MediaRecorder、IndexedDB 和 Web Speech API。

## 开源协议

本项目使用 MIT License，详见 [LICENSE](LICENSE)。
