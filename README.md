# 📝 Todo App

React + Laravel + MySQL + Docker で構築したSPA Todoアプリです。

---

## 🚀 使用技術

- React (Vite)
- Laravel 12
- MySQL 8
- Docker
- Git / GitHub

---

## 📦 主な機能

- Todo追加 / 削除
- 完了ステータス切替
- Todo編集
- カテゴリ追加
- カテゴリ色分け表示
- フィルタリング（検索 / ステータス / カテゴリ）

---

## 🏗 アーキテクチャ

React (5173)  
↓  
Laravel API (8000)  
↓  
MySQL (Docker)

---

## 📁 ディレクトリ構成

```
Todo_List/
├── frontend/           # Reactアプリ
├── src/                # Laravelアプリ
├── docker-compose.yml
└── README.md
```

---

# 🔧 セットアップ方法（クリーン環境検証済み）

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

## 🌐 アクセス

フロントエンド  
http://localhost:5173

バックエンドAPI  
http://localhost:8000/api/todos