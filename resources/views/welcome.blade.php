@extends('index')

@section('content')
    <div class="px-6 lg:container mx-auto">
        <div class="grid grid-cols-1 gap-6 min-h-screen items-center">
            <section class="text-center xl:w-5/6 mx-auto">

                <h1 class="text-9xl mb-6 mt-20 tracking-tight font-bold">jSQL</h1>
                <h2 class="text-3xl mb-6">A SQL inspired javascript library for JSON arrays</h2>
                <p class="text-lg mb-20">This library lets you use familiar functions to preform simple tasks<br class="hidden lg:block"> that extract, sort, filter, or view data from JSON objects.</p>

                <div class="grid grid-cols-4 gap-6">

                    <div class="md:col-span-2">
                        <pre class="rounded-lg shadow-xl language-js h-full"><code id="resultVar"><!----></code></pre>
                    </div>

                    <div class="md:col-span-2">
                        <div class="mb-6">
                            <pre class="rounded-lg shadow-xl language-js"><code><!--console.log(
    jsonArray
        .SELECT( ['name', 'gender', 'age'] )
        .WHERE(
            person => (person.gender === 'male')
        )
        .ORDER_BY( 'name', 'ASC' )
);--></code></pre>
                        </div>
                        <div class="">
                            <pre class="rounded-lg shadow-xl language-js"><code id="resultDemo"><!----></code></pre>
                        </div>
                    </div>

                </div>

            </section>

            <section class="my-12">
                <h3>Installation</h3>
                <p class="mb-6">Setting up the library is super easy. Just include the script on your page and start using it!</p>
                <pre class="rounded-lg shadow-xl language-html"><code><!--<script type="text/javascript" src="./path/to/jsql.min.js"></script>--></code></pre>
            </section>

        </div>
    </div>
@endsection

@section('footer_scripts')
    @parent
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/unescaped-markup/prism-unescaped-markup.min.js"></script>
    <script src="{{ mix('js/welcome.js') }}"></script>
@endsection
