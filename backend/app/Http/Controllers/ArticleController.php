<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // List all articles
    public function index()
    {
        return response()->json(['success' => true, 'data' => Article::all()])->header('Access-Control-Allow-Origin', '*');
    }

    // Create new article
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'source_url' => 'nullable|url',
        ]);

        $article = Article::create($request->all());

        return response()->json(['success' => true, 'data' => $article], 201)->header('Access-Control-Allow-Origin', '*');
    }

    // Show single article
    public function show($id)
    {
        return response()->json(['success' => true, 'data' => Article::findOrFail($id)])->header('Access-Control-Allow-Origin', '*');
    }

    // Update article
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());

        return response()->json(['success' => true, 'data' => $article])->header('Access-Control-Allow-Origin', '*');
    }

    // Delete article
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(['success' => true, 'message' => 'Article deleted'])->header('Access-Control-Allow-Origin', '*');
    }
}
