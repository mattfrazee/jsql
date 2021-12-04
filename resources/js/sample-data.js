export const people = [
    {
        "id": 1,
        "name": "John",
        "gender": "male",
        "age": "21",
        "email": null,
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
    }, {
        "id": 2,
        "name": "Chad",
        "gender": "male",
        "age": "18",
        "active": false
    }, {
        "id": 3,
        "name": "Jamie",
        "age": "25",
        "birthday": "9/8/1992",
        "address": {
            "country": {
                "name": "US"
            }
        }
    }, {
        "id": 4,
        "name": "Heather",
        "gender": "female",
        "age": "38",
        "birthday": "6/15/2001",
        "active": true,
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
    }, {
        "id": 5,
        "name": "Sally",
        "gender": "female",
        "age": "15",
        "friends": [8]
    }, {
        "id": 6,
        "name": "Joe",
        "gender": "male",
        "age": "64",
        "birthday": "12/25/1984",
        "friends": [7, 2, 8]
    }, {
        "id": 7,
        "name": "Danny",
        "age": "20",
        "birthday": "12/17/1983",
        "address": {},
        "interests": ["football", "hockey", "rugby", "soccer"],
        "friends": [3, 8, 6]
    }, {
        "id": 8,
        "name": "Matthew",
        "age": 37,
        "birthday": "05/25/1984",
        "gender": "male",
        "friends": [4, 5, 6, 7]
    }
];

export const heroSample = [
    people[1],
    people[4],
    people[5],
    {
        "name": "Jessica",
        "gender": "female",
        "age": "41"
    },
];

export const states = [
    {
        "name": "Texas",
        "abbreviation": "TX",
        "region": "US"
    },
    {
        "name": "Florida",
        "abbreviation": "FL",
        "region": "US"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD",
        "region": "US"
    },
    {
        "name": "New York",
        "abbreviation": "NY",
        "region": "US"
    }
];
