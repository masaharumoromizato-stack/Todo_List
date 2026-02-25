# 📝 Todo App

React + Laravel + MySQL + Dockerで構築したSPA Todoアプリです。

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

## 🔧 セットアップ方法

```bash
git clone https://github.com/masaharumoromizato-stack/Todo_List.git
cd Todo_List
docker compose up -d --build
docker compose exec app php artisan migrate