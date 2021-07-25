
# jSQL
A SQL inspired javascript library for JSON arrays.
This library lets you use familiar functions to preform simple tasks that
extract, sort, filter, or view data from JSON objects.

## Overview
JSON data formats drive most websites content these days. More than often, that content is
saved in a SQL database where the data can be queried and sent directly to the DOM, or sent in
an API request. Building a solid website can take time, so the ability to display and manipulate
that JSON data is crucial.

jSQL is more than just an array library, it's a solid framework to utilize similar
database commands, like MySQL, to manipulate it's data. Single page applications really benefit
from jSQL's functionality to display that data, easily. I've taken the guess work out of array
manipulations, making this framework a straight-forward and simple solution to learn, in an hour
or less.

### Note on Performance
These methods are best when they are chained. However, sometimes the order in which you chain them will help with speed.

For example, if you have 1000 records of data, but you 
only need 10 at a time, use `limit(10)` or
`paginate(100)` first, then the proceeding functions will only use 10 records. Otherwise, jSQL would be iterating
through 1000 records before any limiting or filtering happens.

## Installation
Can you spare < 3kb to import this into your project? Setting up the library is super
easy, just include the script on your page or import script and start using it!

```html
<script type="text/javascript" src="./path/to/jsql.min.js"></script>
```

## Sample Data
For the examples to work, we need some data to work with. This data is only used for the examples in this documentation. This contains various types of dummy data that is used to show typical JSON datasets.

```json
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

##Array Prototypes

Since most of these array prototypes reflect similar SQL functions, you may already know what those functions do. One thing to remember is that jSQL really shines when you chain your methods.
<br><br>
### append(json) `Returns: Array`
#### Parameters: `json (Object)`
Temporarily appends an item at the end of the JSON array.
```
people.append({'name': 'Matthew'})
```

<br><br>
### appendAt(index, json) `Returns: Array`
#### Parameters: `index (Number)`, `json (Object)`
Temporarily appends an item at the end of the JSON array.
```
people.appendAt(3, {'name': 'Matthew'})
```

<br><br>
### prepend(json) `Returns: Array`
#### Parameters: `json (Object)`
Temporarily appends an item at the beginning of the JSON array.
```
people.prepend({'name': 'Matthew'})
```

<br><br>
### insertBefore(json) `Returns: Array`
#### Parameters: `json (Object)`
Permanently appends an item at the end of the JSON array.
```
people.insertBefore({'name': 'Matthew'})
```

<br><br>
### insertAt(index, json) `Returns: Array`
#### Parameters: `index (Number)`, `json (Object)`
Permanently appends an item to the JSON array by a given index.
```
people.insertAt(3, {'name': 'Matthew'})
```

<br><br>
### insertAfter(json) `Returns: Array`
#### Parameters: `json (Object)`
Permanently adds an item at the beginning of the JSON array.
```
people.insertAfter({'name': 'Matthew'})
```

<br><br>
### avg(key) `Returns: Number`
_An alias of `average`._

<br><br>
### average(key) `Returns: Number`
#### Parameters: `key (String)`
This calculates the average number from a given key.
```
people.average('age')
```


<br><br>
### sum(key) `Returns: Number`
#### Parameters: `key (String)`
This calculates the sum from a given key.
```
people.sum('age')
```

<br><br>
### max(key) `Returns: Number`
#### Parameters: `key (String)`

```
people.max('age')
```

<br><br>
### min(key) `Returns: Number`
#### Parameters: `key (String)`

```
people.min('age')
```

<br><br>
### first() `Returns: Object`
This will select the first item in an array. Kinda like `people[0]`.
```
people.first()
```

<br><br>
### last() `Returns: Object`
This will select the first item in an array. Kinda like `people[people.length]`.
```
people.last()
```

<br><br>
### get(index) `Returns: Object`
#### Parameters: `index (Number)`
This will select the a given ID in an array. Basically, `people[index]`.
```
people.get(3)
```

<br><br>
### has(key) `Returns: Boolean`
#### Parameters: `key (String)`
This determines if the array's objects contain a given key.
This function allows for deep object level refinements.
```
people.has('address.line2')
```

<br><br>
### pluck(keys) `Returns: Array`
#### Parameters: `key (String | Array)`
This will select the JSON keys to extract from the array or arguments and returns all records that
contain any of the matching keys.
```
people.select('name', 'address')
```

<br><br>
### select(keys) `Returns: Array`
_An alias of `select`._


<br><br>
### pages(resultsPerPage = 1000) `Returns: Number`
#### Parameters: `resultsPerPage (Number)`
Returns the total number of array items per page.
```
people.pages(7)
```

<br><br>
### paginate(resultsPerPage = 1000, page = 1) `Returns: Number`
#### Parameters: `resultsPerPage (Number)`, `page (Number)`
Returns a limited number of array items per page. This is a great way to paginate any array with or without JSON data.
```
people.paginate(7,2)
```

<br><br>
### limit(recordCount = 1000, recordOffset = 0) `Returns: Array`
#### Parameters: `recordCount (Number)`, `recordOffset (Number)`
Returns 
```
people.limit(2)
```

<br><br>
### thatHave(key) `Returns: Array`
#### Parameters: `key (String)`
This will select all the items that have a property from the key defined. This function allows deep
object level refinements such as "address.state", which would return all objects that contain those
property values.
```
people.thatHave('gender')
```

<br><br>
### parseJSON() `Returns: Array`
This will parse any JSON strings in the array to an object. Should you need to use this function, chain that first.
```
people.insertAfter('{"name":"Kenny", "age":"56"}').parseJSON().select(['name', 'age'])
```

<br><br>
`searchFor(searchTerm = '', caseSensitive = true)` `Returns: Array`
#### Parameters: `searchTerm (String)`, `caseSensitive (Boolean)`
A deep search that returns all records containing the search term.
```
people.searchFor('FOOTBALL', false)
```

<br><br>
### like(searchTerm = '', caseSensitive = true) `Returns: Array`
_An alias of `searchFor`._
