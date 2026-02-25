<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function store(Request $request)
    {
        $todo = Todo::create([
            'title' => $request->title,
            'is_completed' => false
        ]);

        return response()->json($todo, 201);
    }

    // 🔥 削除
    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    // 🔥 完了切り替え
    public function toggle($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->is_completed = !$todo->is_completed;
        $todo->save();

        return response()->json($todo);
    }
}