# jSQL

A SQL inspired javascript library for JSON arrays. This library lets you use familiar functions to preform simple tasks
that extract, sort, filter, or view data from JSON objects.

## Overview

JSON data formats drive most websites content these days. More than often, that content is saved in a SQL database where
the data can be queried and sent directly to the DOM, or sent in an API request. Building a solid website can take time,
so the ability to display and manipulate that JSON data is crucial.

jSQL is more than just an array library, it's a solid framework to utilize similar database commands, like MySQL, to
manipulate it's data. Single page applications really benefit from jSQL's functionality to display that data, easily.
I've taken the guess work out of array manipulations, making this framework a straight-forward and simple solution to
learn, in an hour or less.

#### Note on Performance:

These methods are best when they are chained. However, sometimes the order in which you chain them will help with speed.

For example, if you have 1000 records of data, but you only need 10 at a time, use `limit(10)` or
`paginate(100)` first, then the proceeding functions will only use 10 records. Otherwise, jSQL would be iterating
through 1000 records before any limiting or filtering happens.

## Installation

Can you spare < 8kb to import this into your project? Setting up the library is super easy, just include the script on
your page or import script and start using it!

```html
<script type="text/javascript" src="./path/to/jsql.min.js"></script>
```

## Sample Data

For the examples to work, we need some data to work with. This data sample contains various types of dummy data that is
used to show typical JSON datasets.

```javascript
const people = [
    {
        "name": "John",
        "gender": "male",
        "age": "21",
        "address": {
            "line1": "123 Main St",
            "line2": "",
            "city": "Sunnyville",
            "state": "NY",
            "zipcode": "12345",
            "country": {
                "name": "US"
            }
        }
    },
    {
        "name": "Chad",
        "gender": "male",
        "age": "18"
    },
    {
        "name": "Jamie",
        "age": "25",
        "birthday": "9/8/1992",
        "address": {
            "country": {
                "name": "US"
            }
        }
    },
    {
        "name": "Heather",
        "gender": "female",
        "age": "38",
        "birthday": "6/15/2001",
        "address": {
            "line1": "123 Washington Ave",
            "line2": "Suite 300",
            "city": "Somewhere",
            "state": "TX",
            "zipcode": "23345",
            "country": {
                "name": "US"
            }
        }
    },
    {
        "name": "Sally",
        "gender": "female",
        "age": "15"
    },
    {
        "name": "Joe",
        "gender": "male",
        "age": "64",
        "birthday": "12/25/1984"
    },
    {
        "name": "Danny",
        "age": "20",
        "birthday": "12/17/1983",
        "address": {},
        "interests": [
            "football",
            "hockey",
            "rugby",
            "soccer"
        ]
    },
    {
        "name": "Matthew",
        "age": 37,
        "birthday": "05/25/1984",
        "gender": "male"
    }
];
```

## jSQL Methods

These are simple functions that can help you out while coding in jSQL.

---

### jSQL.createProperty( objectString )

Parameters: `String` | `Number` Returns: `String`

Creates nested objects from a string.

**Example:**

```javascript
jSQL.createProperty('employment.profression.title', 'Web Developer');
```

---

### jSQL.getProperty( propertyName, object )

Parameters: `String` Returns: `Mixed`

Returns the value of an object from a string.

**Example:**

```javascript
jSQL.getProperty('employment.profression.title', 'Web Developer');
```

---

### jSQL.date.format(date)

Parameters: `String` | `Number` Returns: `String`

Outputs the parsed date in a SQL format: `YYYY-MM-DD HH:MM:SS`

**Example:**

```javascript
jSQL.date.format('5/25/1984');
```

---

### jSQL.date.now()

Returns: `String`

Outputs the current date in a SQL format: `YYYY-MM-DD HH:MM:SS`

**Example:**

```javascript
jSQL.date.now();
```

---

## Array Prototypes

Since some of these array prototypes reflect similar SQL functions, you may already know what those functions do. One
thing to remember is that jSQL really shines when you chain your methods.

---

### andWhere( key, comparison, value )

_An alias of `where`._

---

### append( json )

Parameters: `Object` Returns: `Array`

Temporarily appends an item to the JSON array.

**Example:**

```javascript
people.append({'name': 'Matthew'});
```

---

### appendAt( index, json )

Parameters: (`Number`, `Object`) Returns: `Array`

Temporarily appends an item to a specified index in the JSON array.

**Example:**

```javascript
people.appendAt(3, {'name': 'Matthew'});
```

---

### average( key )

Parameters: `String` Returns: `Number`

This calculates the average number from a given key.

**Example:**

```javascript
people.average('age');
```

---

### avg( key )

_An alias of `average`._

---

### each( callback )

Parameters: (`Function`) Returns: `Array`

This provides the same function as forEach, except, it returns the chained array after the traversal is complete.

**Example:**

```javascript
people.each(item => {
    console.log(item);
});
```

---

### extract( key, callback )

Parameters: (`String`, `Function`) Returns: `Array`

Extracts a single value into an array. Use the callback function to control any data transformation.

**Example:**

```javascript
people.extract('address.city');
```

```javascript
people.extract('address.line1', (item, key) => {
    return jSQL.getPropertyValue(key, item).toUpperCase();
});
```

---

### first()

Returns: `Object`

This will select the first item in an array. Kinda like `people[0]`.

**Example:**

```javascript
people.first();
```

---

### get( index )

Parameters: `Number` Returns: `Object`

This will select a given ID in an array. Basically, `people[index]`.

**Example:**

```javascript
people.get(3);
```

---

### has( value )

Parameters: `String` | `Object` Returns: `Boolean`

This determines if the array's objects contain a given key or if the array has an exact JSON object.

**Example:**

```javascript
people.has('address.line2');
```

```javascript
people.has({
    'name': 'Chad',
    'gender': 'male',
    'age': '18'
});
```

---

### insertAfter( json )

Parameters: `Object` Returns: `Array`

Permanently adds an item at the beginning of the JSON array.

**Example:**

```javascript
people.insertAfter({'name': 'Matthew'});
```

---

### insertAt( index, json )

Parameters: (`Number`, `Object`) Returns: `Array`

Permanently appends an item to the JSON array by a given index.

**Example:**

```javascript
people.insertAt(3, {'name': 'Matthew'});
```

---

### insertBefore( json )

Parameters: `Object` Returns: `Array`

Permanently appends an item at the end of the JSON array.

**Example:**

```javascript
people.insertBefore({'name': 'Matthew'});
```

---

### last()

Returns: `Object`

This will select the first item in an array. Kinda like `people[people.length]`.

**Example:**

```javascript
people.last();
```

---

### like( searchTerm = '', caseSensitive = true )

_An alias of `searchFor`._

---

### limit( recordCount = 1000, recordOffset = 0 )

Parameters: `Number`, `Number` Returns: `Array`

Returns a specified amount of array items from a given index.

**Example:**

```javascript
people.select('name').limit(2);
```

---

### lowerCase( key )

Parameters: `String` Returns: `Array`

Transforms the string to lowercase from the key defined. This function allows deep object level
refinements.

**Example:**

```javascript
people.lowerCase('address.city');
```

---

### max( key )

Parameters: `String` Returns: `Number`

This returns the maximum value from a given key.

**Example:**

```javascript
people.max('age');
```

---

### min( key )

Parameters: `String` Returns: `Number`

**Example:**

```javascript
people.min('age');
```

---

### occurrences( key, value )

Parameters: (`String`, `String` | `Number`) Returns: `Number`

Returns the number of occurrences of a value in a JSON array.

**Example:**

```javascript
people.occurrences('address.country.name', 'US');
```

---

### orderBy( key, sortDirection = jSQL.sort.asc )

Parameters: (`String`, `Boolean`) Returns: `Array`

Returns a sorted array by a JSON key.

**Example:**

```javascript
people.orderBy('name', jSQL.sort.desc);
```

---

### orderByDate( key, sortDirection = jSQL.sort.asc )

Parameters: (`String`, `Boolean`) Returns: `Array`

Returns a sorted array by a date string.

**Example:**

```javascript
people.orderByDate('birthday', jSQL.sort.desc);
```

---

### pages( resultsPerPage = 1000 )

Parameters: `Number` Returns: `Number`

Returns the total number of array items per page.

**Example:**

```javascript
people.pages(7);
```

---

### paginate( resultsPerPage = 1000, page = 1 )

Parameters: (`Number`, `Number`) Returns: `Array`

Returns a limited number of array items per page. This is a great way to paginate any array with or without JSON data.

**Example:**

```javascript
people.paginate(7, 2);
```

---

### parseJSON()

Returns: `Array`

This will parse any JSON strings in the array to an object. Should you need to use this function, chain that first.

**Example:**

```javascript
people
    .insertAfter('{"name":"Kenny", "age":"56"}')
    .parseJSON()
    .pluck('name', 'age');
```

---

### pluck( keys )

Parameters: (`String` | `Array`) Returns: `Array`

This will select the JSON keys to extract from the array or arguments and returns all records that contain any of the
matching keys.

**Example:**

```javascript
people.pluck('name', 'address');
```

---

### prepend( json )

Parameters: `Object` Returns: `Array`

Temporarily appends an item at the beginning of the JSON array until the chain ends.

**Example:**

```javascript
people.prepend({'name': 'Matthew'});
```

---

### searchFor(searchTerm = '', caseSensitive = true)

Parameters: (`String`, `Boolean`) Returns: `Array`

A deep object and array search that returns all records containing the search term.

**Example:**

```javascript
people.searchFor('FOOTBALL', false);
```

---

### select( keys )

_An alias of `pluck`._

---

### sum( key )

Parameters: `String` Returns: `Number`

This calculates the sum from a given key.

**Example:**

```javascript
people.sum('age');
```

---

### thatHave( key )

Parameters: `String` Returns: `Array`

This will select all the items that have a property from the key defined. This function allows deep object level
refinements such as "address.state", which would return all objects that contain those property values.

**Example:**

```javascript
people.thatHave('gender');
```

```javascript
people.thatHave('address.city');
```

---

### total( key )

_An alias of `sum`._

---

### upperCase( key )

Parameters: `String` Returns: `Array`

Transforms the string to uppercase from the key defined. This function allows deep object level
refinements.

**Example:**

```javascript
people.upperCase('address.city');
```

---

### where( key, comparison, value )

Parameters: (`String` | `Function`), `String`, (`String` | `Number`) Returns: `Array`

This will filter out the items using a comparison string or use a function to add more logic. When using the simple
comparison method,
`=` and `!=` are strict conditionals that are equivalent to `===` and `!==`. This function allows for deep object level
refinements.

Valid conditionals: `<` `<=` `=` `!=` `>` `>=`

**Examples:**

```javascript
people
    .select(['name', 'gender'])
    .where(
        person => (person.gender === 'female')
    );
```

```javascript
people
    .where('gender', '=', 'female')
    .pluck('name', 'gender');
```

```javascript
people
    .where('address.country.name', '=', 'US')
    .pluck('name', 'gender');
```
