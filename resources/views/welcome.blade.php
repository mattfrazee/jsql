@extends('index')

@section('content')
    <div class="px-6 lg:container mx-auto">
        <div class="grid grid-cols-1 gap-6 min-h-screen items-center">
            <section class="text-center xl:w-5/6 mx-auto">
                <h1 class="mb-6 mt-32">jSQL</h1>
                <h2 class="text-3xl mb-6">A SQL inspired javascript library for JSON arrays</h2>
                <p class="text-lg mb-20">This library lets you use familiar functions to preform simple tasks<br class="hidden lg:block"> that extract, sort, filter, or view data from JSON objects.</p>

                <div class="grid grid-cols-4 gap-6">

                    <div class="md:col-span-2">
                        <pre class="rounded-lg shadow-xl language-js h-full"><code class="hero-data"><!----></code></pre>
                    </div>

                    <div class="md:col-span-2">
                        <div class="mb-6">
                            <pre class="rounded-lg shadow-xl language-js"><code><!--console.log(
    people
        .SELECT( ['name', 'gender', 'age'] )
        .WHERE(
            person => (person.gender === 'male')
        )
        .ORDER_BY( 'name', 'DESC' )
);--></code></pre>
                        </div>
                        <div class="">
                            <pre class="rounded-lg shadow-xl language-js"><code id="resultDemo" class="hero-result"><!----></code></pre>
                        </div>
                    </div>

                </div>

            </section>

            <section id="sampleData" class="pt-32">
                <h3>Sample Data</h3>
                <p class="mb-6">For the examples to work, we need some data to work with. This data is only used for the examples in this documentation.</p>
                <pre class="rounded-lg shadow-xl language-js h-102"><code class="sample-data"><!----></code></pre>
            </section>

            <section id="overview" class="pt-32">
                <h3>Overview</h3>
                <p class="mb-6">Setting up the library is super easy. Just include the script on your page and start using it!</p>
            </section>

            <section id="installation" class="pt-32">
                <h3>Installation</h3>
                <p class="mb-6">Setting up the library is super easy. Just include the script on your page and start using it!</p>
                <pre class="rounded-lg shadow-xl language-html"><code><!--<script type="text/javascript" src="./path/to/jsql.min.js"></script>--></code></pre>
            </section>

            <section id="prototypes" class="pt-32 pb-6">
                <h3>Array Prototypes</h3>
                <p class="mb-3">Since most of these array prototypes reflect similar SQL functions, you may already know what those functions do. One thing to remember is that jSQL really shines when you chain your methods.</p>


                <hr class="my-10">
{{--                <p class="mb-7"><code class="rounded-lg shadow-xl p-4 bg-gray-800 text-green-500">SELECT( <em class="text-yellow-600">jsonKeys</em> )</code></p>--}}
                <h4>SELECT(<em class="text-green-600">keys</em>)</h4>
                <p class="mb-3">This will select only the keys you want. The * modifier is allowed.</p>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">keys</em> String | Array</code></p>
                <pre class="mb-5 rounded-lg shadow-xl language-js"><code><!--people.SELECT( 'name' );
people.SELECT( ['name', 'age'] );
people.SELECT( '*' );--></code></pre>


                <hr class="my-10">
                <h4>WHERE(<em class="text-green-600">comparison</em>)</h4>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">comparison</em> Function</code></p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.WHERE(
    person => (person.gender === 'male')
);--></code></pre>


                <hr class="my-10">
                <h4>LIMIT(<em class="text-green-600">offset = 0, rowCount</em>)</h4>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">offset</em> Number <em class="text-green-800">rowCount</em> Number </code></p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.LIMIT( 0, 10 );--></code></pre>


                <hr class="my-10">
                <h4>ORDER_BY(<em class="text-green-600">key, sortDirection = 'ASC'</em>)</h4>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">key</em> String | Function <em class="text-green-800">sortDirection</em> String </code></p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.ORDER_BY( 'name' );
people.ORDER_BY(
    (a, b) => jSQL.COMPARE_BY_NUM(a.age, b.age, 'ASC') || jSQL.COMPARE_BY_STR(a.name, b.name, 'ASC')
);--></code></pre>


                <hr class="my-10">
                <h4>PAGINATE(<em class="text-green-600">resultsPerPage = 1000, page = 1</em>)</h4>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">resultsPerPage</em> Number <em class="text-green-800">page</em> Number </code></p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.PAGINATE( 10, 1 );--></code></pre>


                <hr class="my-10">
                <h4>FIRST()</h4>
                <p class="mb-5">This will select the first item in an array.</p>
{{--                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">offset</em> Number <em class="text-green-800">rowCount</em> Number </code></p>--}}
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.FIRST();--></code></pre>


                <hr class="my-10">
                <h4>LAST()</h4>
                <p class="mb-5">This will select the last item in an array.</p>
{{--                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">offset</em> Number <em class="text-green-800">rowCount</em> Number </code></p>--}}
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.LAST();--></code></pre>


                <hr class="my-10">
                <h4>GET(<em class="text-green-600">id = 0</em>)</h4>
                <p class="mb-3">This will select the a given ID in an array.</p>
                <p class="mb-5 text-sm">Parameters: <code class="rounded-lg py-2 px-4 bg-green-500 text-green-100"><em class="text-green-800">id</em> Number</code></p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.GET( 2 );--></code></pre>

            </section>

            <section id="methods" class="pt-32">
                <h3>jSQL Methods</h3>
                <p class="mb-6">These are simple functions that can help you out while coding in jSQL.</p>
                <hr class="my-10">
            </section>

        </div>
    </div>
@endsection

@section('footer_scripts')
    @parent
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/unescaped-markup/prism-unescaped-markup.min.js"></script>
{{--    <script src="{{ mix('js/welcome.js') }}"></script>--}}
@endsection
