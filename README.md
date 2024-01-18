# Nekomit
Nekozouneko ServerのMiningサーバーで使用されるSkriptのスクリプト関係を管理する管轄システム。<br>
詳しくは [Hideko-Dev](https://github.com/hideko-dev) のほうへご連絡ください。
---
### スタック:
- Node.js
- OctoKit
- Discord Webhooks
- File Spreader
---
### 流れ:
指定されているリポジトリとブランチに、何か変更を加えたコミット、プッシュを行う。<br>
↓<br>
Nekomitで検知を行う。そこから Discord Webhook を使用して詳細な変更点を送信。
↓<br>
指定されているアウトプットディレクトリにある変更するファイルをとことん変更して煮たり焼いたりぐつぐつ...
---
### 起動方法など
本番環境での起動はこちら
```shell
npm run start
```
---
### 初期設定
`.env` 事前にGithubのアクセストークンが必要になります。また、DiscordサーバーのウェブフックのURLも設定してください。
<br>
`config.js` 以下のような解釈で設定をお願いします。
<br>
```js
module.exports = {
    owner: 'TeamNekozouneko', // リポジトリのオーナー名
    repository: 'Mining', // リポジトリ名
    branch: 'main', // ブランチ名
    output: '/plugins/Skript/scripts', // 重要。出力されるディレクトリ。
    interval: 5000 // ミリセカンド(ms)指定です。検知する合間の時間。
}
```