@extends('index')

@section('content')
    <div class="px-6 lg:container mx-auto">
        <div class="grid grid-cols-1 gap-6 min-h-screen items-center section-container">
            <section class="text-center">
                <h1 class="mb-6 mt-32">jSQL</h1>
                <h2 class="text-3xl mb-6">A SQL inspired javascript library for JSON arrays</h2>
                <p class="text-lg mb-20">
                    This library lets you use familiar functions to preform simple tasks
                    <br class="hidden lg:block">
                    that extract, sort, filter, or view data from JSON objects.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">

                    <div class="sm:col-span-2">
                        <pre class="rounded-lg shadow-xl language-js h-full"><code class="hero-data"><!----></code></pre>
                    </div>

                    <div class="sm:col-span-2">
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

            <section id="overview" class="pt-32">
                <h3>Overview</h3>
                <p class="mb-3">
                    JSON data formats drive most websites content these days. More than often, that content is
                    saved in a SQL database where the data can be queried and sent directly to the DOM, or sent in
                    an API request. Building a solid website can take time, so the ability to display and manipulate
                    that JSON data is crucial.
                </p>
                <p class="mb-6">jSQL is more than just an array library, it's a solid framework to utilize similar
                    database commands, like MySQL, to manipulate it's data. Single page applications really benefit
                    from jSQL's functionality to display that data, easily. I've taken the guess work out of array
                    manipulations, making this framework a straight-forward and simple solution to learn, in an hour
                    or less.
                </p>
                <p class="mb-6">
                    Note on performance: these methods are best when they are chained. However, sometimes the order in
                    which you chain them will help with speed. For example, if you have 1000 records of data, but you
                    only need 10 at a time, use
                    <code class="bg-gray-100 rounded px-2 py-1">limit(10)</code> or
                    <code class="bg-gray-100 rounded px-2 py-1">paginate(100)</code>
                    first, then the proceeding functions will only use 10 records. Otherwise, jSQL would be iterating
                    through 1000 records before any limiting or filtering happens.
                </p>
            </section>

            <section id="installation" class="pt-32">
                <h3>Installation</h3>
                <p class="mb-6">
                    Can you spare {{ round(filesize('../resources/js/util/jsql.js') / 1024,2) }}kb
                    to import this into your project? Setting up the library is super
                    easy, just include the script on your page or import script and start using it!
                </p>
                <pre class="rounded-lg shadow-xl language-html"><code><!--<script type="text/javascript" src="./path/to/jsql.min.js"></script>--></code></pre>
            </section>

            <section id="sampleData" class="pt-32 relative">
                <h3>Sample Data</h3>
                <p class="mb-6">
                    For the examples to work, we need some data to work with. This data is only used for
                    the examples in this documentation. This contains various types of dummy data that is used to show
                    typical JSON datasets.
                </p>
                <button class="px-5 py-2 text-sm w-32 text-center bg-blue-600 text-white absolute font-bold rounded-lg right-4 mt-4 ring-1 transition-all ease-in duration-300 focus:ring-4 outline-none focus:outline-none" @click="toggleSampleData">
                    <span v-if="!collapseSampleData">Collapse</span>
                    <span v-else>Expand</span>
                </button>
                <pre class="rounded-lg shadow-xl language-js" :class="collapseSampleData ? 'h-96' : 'h-full'"><code id="sampleJsonData"><!----></code></pre>
            </section>

            <section id="prototypes" class="pt-32 pb-6">
                <h3>Array Prototypes</h3>
                <p class="mb-3">
                    Since most of these array prototypes reflect similar SQL functions, you may already
                    know what those functions do. One thing to remember is that jSQL really shines when you chain
                    your methods.
                </p>


                <hr class="my-10">
                <h4>append(<em class="text-green-600">json</em>)</h4>
                <p class="mb-3">
                    This temporarily appends an item at the end of the JSON array.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="appendExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>appendAt(<em class="text-green-600">index, json</em>)</h4>
                <p class="mb-3">
                    This temporarily appends an item to the JSON array by a given index.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="appendAtExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>prepend(<em class="text-green-600">json</em>)</h4>
                <p class="mb-3">
                    This temporarily appends an item at the beginning of the JSON array.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="prependExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>avg()</h4>
                <p class="mb-3">
                    This calculate the average number from a given key.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="avgExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>first()</h4>
                <p class="mb-3">
                    This will select the first item in an array.
                    Kinda like <code class="bg-gray-100 rounded px-2 py-1">people[0]</code>.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Basic Method</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Chained Method</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="firstExample1" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="firstExample2" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>get(<em class="text-green-600">id = 0</em>)</h4>
                <p class="mb-3">
                    This will select the a given ID in an array.
                    Basically, <code class="bg-gray-100 rounded px-2 py-1">people[ id ]</code>.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>id</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Basic Method</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Chained Method</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="getExample1" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="getExample2" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>

                <hr class="my-10">
                <h4>has(<em class="text-green-600">key</em>)</h4>
                <p class="mb-3">
                    This determines if the array's objects contain a given key. This function allows deep
                    object level refinements.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">Parameters:
                        <code><em>key</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Boolean</code>
                    </p>
                </div>
{{--                <pre id="hasExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>--}}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Basic Method</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Deep Iteration Method</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="hasExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="hasExample2" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>last()</h4>
                <p class="mb-3">
                    This will select the last item in an array.
                    Kinda like <code class="bg-gray-100 rounded px-2 py-1">people[ people.length ]</code>.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <pre id="lastExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>like(<em class="text-green-600">searchTerm = '', caseSensitive = true</em>) <span class="text-sm italic">Aliases: searchFor</span></h4>
                <p class="mb-3">
                    A deep search that returns all records containing the search term.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>searchTerm</em> (String | Number)</code>
                        <code><em>caseSensitive </em> Boolean</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                {{--                <pre id="likeExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>--}}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3"><code class="bg-gray-100 rounded px-2 py-1">like</code> Method (search for number, case sesitive)</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3"><code class="bg-gray-100 rounded px-2 py-1">searchFor</code> Method (search for string, case insesitive)</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="likeExample1" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="likeExample2" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>limit(<em class="text-green-600">recordCount = 1000, recordOffset = 0</em>)</h4>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>recordCount</em> Number</code>
                        <code><em>recordOffset</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Method 1 (No second parameter, index starts at 0)</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Method 2 (Index starts at 1)</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="limitExample1" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="limitExample2" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>select(<em class="text-green-600">keys</em>)</h4>
                <p class="mb-3">
                    This will select the JSON keys to extract from the array or arguments and returns all records that
                    contain any of the matching keys.
                </p>
                <div class="md:flex">
                    <p class="mb-5 params mr-6">
                        Parameters:
                        <code><em>keys</em> (String | Array)</code>
                    </p>
                    <p class="mb-5 params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Single Key Method</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Using an Array of Keys</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="selectExample1" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="selectExample2" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>



                <hr class="my-10">
                <h4>where(<em class="text-green-600">comparison</em>) <span class="text-sm italic">Aliases: andWhere</span></h4>
                <p class="mb-3">This will filter out the items using a comparison string or use a function to add more logic. When using the simple comparison method,
                    <code class="bg-gray-100 rounded px-2 py-1">=</code> and <code class="bg-gray-100 rounded px-2 py-1">!=</code>
                    are strict conditionals that are equivalent to
                    <code class="bg-gray-100 rounded px-2 py-1">===</code> and <code class="bg-gray-100 rounded px-2 py-1">!==</code>
                    in Javascript.
                </p>
                <p class="mb-3">
                    Valid conditionals:
                    <code class="bg-gray-100 rounded px-2 py-1"><</code>,
                    <code class="bg-gray-100 rounded px-2 py-1"><=</code>,
                    <code class="bg-gray-100 rounded px-2 py-1">=</code>,
                    <code class="bg-gray-100 rounded px-2 py-1">!=</code>,
                    <code class="bg-gray-100 rounded px-2 py-1">></code>,
                    <code class="bg-gray-100 rounded px-2 py-1">>=</code>
                </p>
                <div class="md:flex">
                    <p class="mb-5 params mr-6">
                        Parameters:
                        <code><em>comparison</em> (String | Function)</code>
                        <code><em>condition</em> String</code>
                        <code><em>value</em> (String | Number)</code>
                    </p>
                    <p class="mb-5 params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Simple Method</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Using a Function</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="whereExample2" class="rounded-lg shadow-xl language-js h-full"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="whereExample1" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>


                <hr class="my-10">
                <h4>orderBy(<em class="text-green-600">key, sortDirection = jSQL.sort.asc</em>) <span class="text-sm italic">Aliases: sortBy</span></h4>
                <p class="mb-3">
                    This will order the array by the JSON key provided. Use a function to sort on multiple keys. The function below will sort by age, then by name.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">Parameters:
                        <code><em>key</em> (String | Function)</code>
                        <code><em>sortDirection</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div class="order-1">
                        <p class="font-bold mb-3">Single Key Sort</p>
                    </div>
                    <div class="order-3 md:order-2 mt-6 md:mt-0">
                        <p class="font-bold mb-3">Multi-Key Sort</p>
                    </div>
                    <div class="order-2 md:order-3">
                        <pre id="orderByExample1" class="h-full rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                    <div class="order-4">
                        <pre id="orderByExample2" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>
                    </div>
                </div>
                <p class="my-5"></p>






                <hr class="my-10">
                <h4>pages(<em class="text-green-600">resultsPerPage = 1000</em>)</h4>
                <p class="mb-3">
                    Returns the total number of array items per page.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>resultsPerPage</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="pagesExample" class="rounded-lg shadow-xl language-js"><code><!--people.pages( 10 );--></code></pre>




                <hr class="my-10">
                <h4>paginate(<em class="text-green-600">resultsPerPage = 1000, page = 1</em>)</h4>
                <p class="mb-3">
                    Returns a limited number of array items per page. This is a great way to paginate any array with or without JSON data.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>resultsPerPage</em> Number</code>
                        <code><em>page</em> Number</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="paginateExample" class="rounded-lg shadow-xl language-js"><code><!--people.paginate( 10, 1 );--></code></pre>



                <hr class="my-10">
                <h4>thatHave(<em class="text-green-600">key</em>)</h4>
                <p class="mb-3">
                    This will select all of the items that have a property from the key defined. This function allows deep
                    object level refinements such as "address.state", which would return all objects that contain those
                    property values.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">Parameters:
                        <code><em>key</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="thatHaveExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>



                <hr class="my-10">
                <h4>parseJSON()</h4>
                <p class="mb-3">
                    This will parse any JSON strings in the array to an object. Should you need to use this function, chain that first.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Array</code>
                    </p>
                </div>
                <pre id="parseJSONExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>







            </section>

            <section id="methods" class="pt-32">
                <h3>jSQL Methods</h3>
                <p class="mb-6">These are simple functions that can help you out while coding in jSQL.</p>
                <hr class="my-10">


                <h4>jSQL.version</h4>
                <p class="mb-3">
                    Outputs the current version of jSQL.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>String</code>
                    </p>
                </div>
                <pre id="versionExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.sort.asc</h4>
                <p class="mb-3">
                    This represents a string to used for sorting in an ascending order.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>String</code>
                    </p>
                </div>
                <pre id="ascExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.sort.desc</h4>
                <p class="mb-3">
                    This represents a string to used for sorting in descending order.
                </p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>String</code>
                    </p>
                </div>
                <pre id="descExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>

                <hr class="my-10">
                <h4>jSQL.sort.compare(<em class="text-green-600">comparison1, comparison2, sortOrder = jSQL.sort.asc</em>)</h4>
                <p class="mb-3">The comparison method will compare 2 strings or 2 numbers for sorting. Both comparisons need to be of the same type, a String or a Number.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>comparison1</em> (Number | String)</code>
                        <code><em>comparison2</em> (Number | String)</code>
                        <code><em>sortOrder</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="compareExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.sort.compareString(<em class="text-green-600">string1, string2, sortOrder = jSQL.sort.asc</em>)</h4>
                <p class="mb-3">The comparison method will compare 2 strings.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>string1</em> String</code>
                        <code><em>string2</em> String</code>
                        <code><em>sortOrder</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="compareStringExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.sort.compareNumber(<em class="text-green-600">number1, number2, sortOrder = jSQL.sort.asc</em>)</h4>
                <p class="mb-3">The comparison method will compare 2 numbers for sorting.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>number1</em> Number</code>
                        <code><em>number2</em> Number</code>
                        <code><em>sortOrder</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="compareNumberExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.sort.compareDate(<em class="text-green-600">date1, date2, sortOrder = jSQL.sort.asc</em>)</h4>
                <p class="mb-3">The comparison method will compare 2 date strings.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>date1</em> String</code>
                        <code><em>date2</em> String</code>
                        <code><em>sortOrder</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Number</code>
                    </p>
                </div>
                <pre id="compareDateExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>



                <hr class="my-10">
                <h4>jSQL.date.now()</h4>
                <p class="mb-3">This will return the current date in the SQL format (YYYY-MM-DD HH:MM:SS)</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>String</code>
                    </p>
                </div>
                <pre id="dateNowExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>


                <hr class="my-10">
                <h4>jSQL.date.format(<em class="text-green-600">date</em>)</h4>
                <p class="mb-3">This will return the given date in the SQL format (YYYY-MM-DD HH:MM:SS). If no parameter is specified, this returns the current date.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>date</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>String</code>
                    </p>
                </div>
                <pre id="dateGetExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>



                <hr class="my-10">
                <h4>jSQL.date.countdown(<em class="text-green-600">futureDate</em>, <em class="text-green-600">startDate</em>)</h4>
                <p class="mb-3">This will return the time between two dates. If no parameter is specified, the current date is used.</p>
                <div class="md:flex">
                    <p class="mb-5 text-sm params mr-6">
                        Parameters:
                        <code><em>futureDate</em> String</code>
                        <code><em>startDate</em> String</code>
                    </p>
                    <p class="mb-5 text-sm params">
                        Returns:
                        <code>Object</code>
                    </p>
                </div>
                <pre id="dateCountdownExample" class="rounded-lg shadow-xl language-js"><code><!----></code></pre>



            </section>

        </div>
    </div>
@endsection

@section('footer_scripts')
    @parent
    <script src="{{ mix('js/welcome.js') }}"></script>
@endsection
