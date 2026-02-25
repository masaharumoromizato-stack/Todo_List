import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Todo取得
  useEffect(() => {
    fetch("http://localhost:8000/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Category取得
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Todo追加
  const addTodo = () => {
    if (!title.trim()) return;

    fetch("http://localhost:8000/api/todos", {
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

  // カテゴリ追加
  const addCategory = () => {
    if (!newCategory.trim()) return;

    fetch("http://localhost:8000/api/categories", {
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
    fetch(`http://localhost:8000/api/todos/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    });
  };

  const toggleTodo = (id) => {
    fetch(`http://localhost:8000/api/todos/${id}`, {
      method: "PUT"
    }).then(() => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, is_completed: !todo.is_completed }
            : todo
        )
      );
    });
  };

  // ランダム色生成
  const getRandomColor = () => {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#667eea", "#ff9f1c"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="app">
      <div className="card">
        <h1>✨ My Todo</h1>

        {/* Todo入力エリア */}
        <div className="input-area">
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

        {/* カテゴリ追加エリア */}
        <div className="category-area">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="カテゴリ追加..."
          />
          <button onClick={addCategory}>＋</button>
        </div>

        {/* Todo表示 */}
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              className="todo-item"
              style={{
                borderLeft: `6px solid ${
                  todo.category ? todo.category.color : "#ccc"
                }`
              }}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={todo.is_completed ? "done" : ""}
              >
                {todo.title}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;