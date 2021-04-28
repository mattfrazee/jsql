<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>jSQL</title>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    </head>

    <body>

        <div id="app">
            <header>
                <div class="logo">
{{--                    {;} jSQL--}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-green-500 inline h-8 transform rotate-90 mr-2  " viewBox="0 0 24 24">
                        <path d="M16 0h-8v6h8v-6zm-10 18h-6v6h6v-6zm18 0h-6v6h6v-6zm-9 0h-6v6h6v-6zm6-2h-2c0-3.75-4.967-1.207-6.942-4.753-1.965 3.526-7.135 1.016-7.142 4.753h-1.916c.003-6.521 7.384-1.532 8-8h2c.616 6.473 8 1.469 8 8z"/>
                    </svg>jSQL
                </div>
                <a href="#overview">Overview</a>
                <a href="#installation">Installation</a>
                <a href="#prototypes">Array Prototypes</a>
                <a href="#methods">jSQL Methods</a>
            </header>
            @yield('content')
            <footer>
                <p>© {{ date('Y') }} Matt Frazee</p>
            </footer>
        </div>

@section('footer_scripts')
    <script src="{{ mix('js/app.js') }}"></script>
@show
    </body>
</html>
