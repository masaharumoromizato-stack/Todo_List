import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const getRandomColor = () => {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#667eea", "#ff9f1c"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addTodo = () => {
    if (!title.trim()) return;

    fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category_id: categoryId || null
      })
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTitle("");
        setCategoryId("");
      });
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategory,
        color: getRandomColor()
      })
    })
      .then(res => res.json())
      .then(cat => {
        setCategories(prev => [...prev, cat]);
        setNewCategory("");
      });
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() =>
        setTodos(prev => prev.filter(todo => todo.id !== id))
      );
  };

  const toggleTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: "PUT" })
      .then(res => res.json())
      .then(updated => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? updated : todo
          )
        );
      });
  };

  const deleteCategory = (id) => {
    if (!confirm("このカテゴリを削除しますか？")) return;

    fetch(`/api/categories/${id}`, { method: "DELETE" })
      .then(() => {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        setTodos(prev =>
          prev.map(todo =>
            todo.category?.id === id
              ? { ...todo, category: null }
              : todo
          )
        );
      });
  };

  return (
    <div className="app">
      <div className="container">
        <h1>📝 My Todo App</h1>

        {/* ===== Todo追加 ===== */}
        <div className="card">
          <div className="input-row">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="やることを入力..."
            />

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">カテゴリなし</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button onClick={addTodo}>追加</button>
          </div>
        </div>

        {/* ===== カテゴリ管理 ===== */}
        <div className="card">
          <h3>カテゴリ</h3>

          <div className="category-input">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="カテゴリ追加..."
            />
            <button onClick={addCategory}>＋</button>
          </div>

          <div className="category-list">
            {categories.map(cat => (
              <div key={cat.id} className="category-chip">
                <span
                  style={{ backgroundColor: cat.color }}
                  className="color-dot"
                />
                {cat.name}
                <button onClick={() => deleteCategory(cat.id)}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Todo一覧 ===== */}
        <div className="card">
          <h3>Todo一覧</h3>
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <div
                  className={`todo-title ${
                    todo.is_completed ? "done" : ""
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.title}
                </div>

                {todo.category && (
                  <div
                    className="category-badge"
                    style={{
                      backgroundColor: todo.category.color
                    }}
                  >
                    {todo.category.name}
                  </div>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;