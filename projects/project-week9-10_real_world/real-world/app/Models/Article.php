<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'title', 'description', 'body', 'tagList'];
    protected $casts = [
        'tagList' => 'array',
    ];

}
