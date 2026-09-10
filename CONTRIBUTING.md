# 贡献指南

欢迎提交 Issue 和 Pull Request。

提交前请确认：

- 不要提交 `.env`、API Key、录音文件或其他个人数据
- 修改后运行 `node --check app.js` 和 `node --check server.mjs`
- 保持本地优先存储原则，不把音频编码成 Base64 放进 localStorage
- 新增 ASR 提供商时，将密钥处理放在服务端
