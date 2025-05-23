# ms-web

このリポジトリは、MSプロジェクトにおける **フロントエンドアプリケーション（SPA）** を管理します。  
Next.js をベースに Connect を用いたRPC通信を実装し、CloudFront + S3で静的ホスティングしています。

---

## 📦 主な責務

- **ユーザー操作に応じたAPI呼び出しと結果表示**  
  Connect RPC を介して `api-front` と通信し、アプリケーション機能を提供

- **静的サイトホスティング**  
  `npm run build` により `out/` にエクスポートされた静的ファイルを S3 にデプロイし、CloudFront から配信

- **柔軟な環境切り替え**  
  `NEXT_PUBLIC_API_URL` を環境変数として使用し、接続先APIを柔軟に構成可能

---

## 📁 ディレクトリ構成（抜粋）

```
.
├── ms/
│ ├── public/ # 静的アセット
│ ├── src/app/ # ページ構成とグローバル設定
│ │ └── page.tsx # API呼び出し用のSPAページ
│ ├── .env.production # 本番用APIエンドポイントを定義
│ ├── next.config.ts # Next.jsの設定（静的書き出しなど）
│ └── package.json etc. # 依存とスクリプト管理
├── .github/workflows/ # S3へのデプロイCI
└── README.md
```

---

## 🚀 CI/CD

- GitHub Actions により以下を自動化：
  - `npm ci` → `npm run build`
  - `out/` ディレクトリの成果物を S3 に `sync` デプロイ
  - CloudFront 経由でSPAを提供

---

## 🌐 環境変数

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_API_URL` | `api-front` のエンドポイントURL（CloudFrontまたはローカル） |

---

## ✅ 備考

- Connect RPC を採用し、gRPC風の効率的な通信を実現
- `output: 'export'` により、Next.js を完全な静的サイトとしてビルド
