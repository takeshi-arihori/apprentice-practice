<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Str;


class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->get('article');

        $request->validate([
            'article.title' => 'required',
            'article.description' => 'required',
            'article.body' => 'required',
        ]);

        $article = new Article([
            'slug' => Str::slug($data['title']),
            'title' => $data['title'],
            'description' => $data['description'],
            'body' => $data['body'],
            'tagList' => $data['tagList'],
        ]);

        $article->save();

        return response()->json([
            'message' => 'Article created successfully!',
            'article' => $article
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        return response()->json([
            'article' => $article
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        $article->update($request->all());

        return response()->json([
            'message' => 'Article updated successfully!',
            'article' => $article
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        $article->delete();

        return response()->json([
            'message' => 'Article deleted successfully!'
        ], 200);
    }

}
