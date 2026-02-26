<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodoApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function todoを作成できる()
    {
        $response = $this->postJson('/api/todos', [
            'title' => 'テストTodo'
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('todos', [
            'title' => 'テストTodo'
        ]);
    }

    /** @test */
    public function todoを削除できる()
    {
        $todo = Todo::factory()->create();

        $response = $this->deleteJson("/api/todos/{$todo->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('todos', [
            'id' => $todo->id
        ]);
    }

    /** @test */
    public function todoの完了状態を切り替えできる()
    {
        $todo = Todo::factory()->create([
            'is_completed' => false
        ]);

        $response = $this->putJson("/api/todos/{$todo->id}");

        $response->assertStatus(200);

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'is_completed' => true
        ]);
    }
}