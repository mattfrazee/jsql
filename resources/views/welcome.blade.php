@extends('index')

@section('content')
    <h2 class="text-2xl">@{{ helloWorld }}</h2>
    <h3 class="text-lg">This is my welcome content! @{{ helloWorld }}</h3>
@endsection

@section('footer_scripts')
    @parent
    <script src="{{ mix('js/welcome.js') }}"></script>
@endsection
