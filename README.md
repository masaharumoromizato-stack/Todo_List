# 📝 Todo App

React + Laravel + MySQL + Docker で構築したSPA（Single Page Application）型のTodoアプリです。

---

# 🚀 技術スタック

## Frontend
- React (Vite)
- JavaScript (ES6)
- Fetch API

## Backend
- Laravel 12
- Eloquent ORM
- REST API

## Database
- MySQL 8

## Infrastructure
- Docker / Docker Compose
- Git / GitHub

---

# 📦 主な機能

- Todo追加 / 削除 / 編集
- 完了ステータス切替
- カテゴリ追加
- カテゴリ別色分け表示
- フィルタリング（検索 / ステータス / カテゴリ）

---

# 🏗 システム構成

```
React (localhost:5173)
        ↓
Laravel API (localhost:8000)
        ↓
MySQL (Docker)
```
---

#  ディレクトリ構成

```
Todo_List/
├── frontend/           # Reactアプリ
├── src/                # Laravelアプリ
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

#  セットアップ手順（クリーン環境検証済み）

## ① リポジトリ取得

```bash
git clone https://github.com/masaharumoromizato-stack/Todo_List.git
cd Todo_List
```

---

## ② Docker起動

```bash
docker compose up -d --build
```

---

## ③ Laravel初期設定

```bash
docker compose exec app bash
cd src
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
exit
```

---

## ④ フロントエンド起動

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 アクセス

Frontend  
http://localhost:5173

Backend API  
http://localhost:8000/api/todos

---

# 🧪 API一覧

## Todo

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | /api/todos | 一覧取得 |
| POST | /api/todos | 作成 |
| PUT | /api/todos/{id} | 更新 |
| DELETE | /api/todos/{id} | 削除 |

## Category

| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | /api/categories | 一覧取得 |
| POST | /api/categories | 作成 |

---

#  開発フロー

- main：安定版
- develop：開発統合ブランチ
- feature/*：機能単位ブランチ
- Pull Requestベースでマージ

---

#  今後の改善予定

- backendではなくsrcでLaravelを作成したことが統一性なくなってしまった（反省点）
- バリデーション強化
- テストコード追加
- CI導入

---
