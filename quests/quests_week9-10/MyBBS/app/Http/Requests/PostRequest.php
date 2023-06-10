<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|min:3',
            'body'  => 'required',
        ];
    }

    public function messages(){
        return [
            'title.required' => 'タイトルは必須です',
            'title.min'  => ':min 文字以上入力してください',
            'body.required'  => '本文は必須です',
        ];
    }
}
