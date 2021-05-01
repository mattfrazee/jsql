@extends('index')

@section('content')
    <div class="px-6 lg:container mx-auto">
        <div class="grid grid-cols-1 gap-6 min-h-screen items-center section-container">
            <section class="text-center">
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
        .select( ['name', 'gender', 'age'] )
        .where(
            person => (person.gender === 'male')
        )
        .orderBy( 'name', 'DESC' )
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
                <pre class="rounded-lg shadow-xl language-js h-102"><code id="sampleJsonData"><!----></code></pre>
            </section>

            <section id="overview" class="pt-32">
                <h3>Overview</h3>
                <p class="mb-6">Setting up the library is super easy. Just include the script on your page and start using it!</p>
            </section>

            <section id="installation" class="pt-32">
                <h3>Installation</h3>
                <p class="mb-6">Can you spare < 2kb to import this into your project? Setting up the library is super easy, just include the script on your page and start using it!</p>
                <pre class="rounded-lg shadow-xl language-html"><code><!--<script type="text/javascript" src="./path/to/jsql.min.js"></script>--></code></pre>
            </section>

            <section id="prototypes" class="pt-32 pb-6">
                <h3>Array Prototypes</h3>
                <p class="mb-3">Since most of these array prototypes reflect similar SQL functions, you may already know what those functions do. One thing to remember is that jSQL really shines when you chain your methods.</p>


                <hr class="my-10">
                <h4>select(<em class="text-green-600">keys</em>)</h4>
                <p class="mb-3">This will select only the keys you want. The * wildcard is supported, however, it is unnecessary since the <code class="bg-gray-100 rounded px-2 py-1">select</code> function returns the array if no keys are selected. Simply put, don't use this function if you're just going to select everything.</p>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Parameters:
                        <code><em>keys</em> (String | Array)</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>

                <pre id="selectExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>where(<em class="text-green-600">comparison</em>)</h4>
                <p class="mb-3">This will filter out the items from a comparison function.</p>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Parameters:
                        <code><em>comparison</em> (Function)</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="whereExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                <p class="my-5"></p>


                <hr class="my-10">
                <h4>limit(<em class="text-green-600">recordCount = 1000, recordOffset = 0</em>)</h4>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Parameters:
                        <code><em>offset</em> Number</code>
                        <code><em>rowCount</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="limitExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                <p class="my-5"></p>


                <hr class="my-10">
                <h4>orderBy(<em class="text-green-600">key, sortDirection = 'ASC'</em>)</h4>
                <div class="flex">
                    <p class="mb-5 text-sm params">Parameters:
                        <code><em>key</em> String | Function</code>
                        <code><em>sortDirection</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.orderBy( 'name' );
people.orderBy(
    (a, b) => jSQL.COMPARE_BY_NUM(a.age, b.age, 'ASC') || jSQL.COMPARE_BY_STR(a.name, b.name, 'ASC')
);--></code></pre>


                <hr class="my-10">
                <h4>paginate(<em class="text-green-600">resultsPerPage = 1000, page = 1</em>)</h4>
                <p class="mb-3">
                    Returns a limited number of array items per page. This is a great way to paginate any array with or without JSON data.
                </p>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Parameters:
                        <code><em>resultsPerPage</em> Number</code>
                        <code><em>page</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.paginate( 10, 1 );--></code></pre>


                <hr class="my-10">
                <h4>first()</h4>
                <p class="mb-3">
                    This will select the first item in an array.
                    Kinda like <code class="bg-gray-100 rounded px-2 py-1">people[0]</code>.
                </p>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.first();--></code></pre>


                <hr class="my-10">
                <h4>last()</h4>
                <p class="mb-3">
                    This will select the last item in an array.
                    Kinda like <code class="bg-gray-100 rounded px-2 py-1">people[ people.length ]</code>.
                </p>
                <div class="flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.last();--></code></pre>


                <hr class="my-10">
                <h4>get(<em class="text-green-600">id = 0</em>)</h4>
                <p class="mb-3">
                    This will select the a given ID in an array.
                    Kinda like <code class="bg-gray-100 rounded px-2 py-1">people[ id ]</code>.
                </p>
                <p class="mb-5 text-sm params">
                    Parameters:
                    <code><em>id</em> Number</code>
                </p>
                <pre class="rounded-lg shadow-xl language-js"><code><!--people.get( 2 );--></code></pre>


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
    <script src="{{ mix('js/welcome.js') }}"></script>
@endsection
