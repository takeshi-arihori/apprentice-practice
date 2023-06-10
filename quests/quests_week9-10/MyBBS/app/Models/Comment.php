<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'body',
    ];

    // $comments->post
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
