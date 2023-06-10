<x-layout>
    <x-slot name="title">
        Add New Post - My BBS
    </x-slot>

    <div class="container">
        <div class="back-link">
            &laquo; <a href="{{route('posts.index')}}">Back</a>
        </div>

        <h1>Add New Post</h1>

        <form method="post" action="{{route('posts.store')}}">
            @csrf
            <div class="form-group">
                <label>
                    <input type="text" name="title" value="{{old('title')}}">
                </label>
                @error('title')
                <div class="error">{{$message}}</div>
                @enderror
            </div>

            <div class="form-group">
                <label>
                    Body
                    <textarea name="body">
                        {{old('body')}}
                    </textarea>
                </label>
                @error('body')
                <div class="error">{{$message}}</div>
                @enderror
            </div>

            <div class="form-button">
                <button>Add</button>
            </div>
        </form>
    </div>
</x-layout>
