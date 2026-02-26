<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::with('category')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
        ]);

        $todo = Todo::create([
            'title' => $validated['title'],
            'category_id' => $validated['category_id'] ?? null,
            'is_completed' => false,
        ]);

        return response()->json($todo->load('category'), 201);
    }

    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    public function toggle($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->is_completed = !$todo->is_completed;
        $todo->save();

        return response()->json($todo->load('category'));
    }
}