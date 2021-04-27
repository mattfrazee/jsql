// require('./bootstrap');

import { jSQL } from "./jsql";
window.jSQL = jSQL;

const jsonArray = [
    {
        name: 'John',
        gender: 'male',
        age: 45
    },
    {
        name: 'Karen',
        gender: 'female',
        age: 32
    },
    {
        name: 'Chad',
        gender: 'male',
        age: 16
    },
    {
        name: 'Jane',
        gender: 'female',
        age: 24
    }
];

if(document.getElementById('resultVar') && document.getElementById('resultDemo')) {
    document.getElementById('resultVar').innerHTML = 'const jsonArray = ' + JSON.stringify(jsonArray, null, 4) + ';';
    document.getElementById('resultDemo').innerHTML = '// result:\n' + JSON.stringify(
        jsonArray.SELECT(['name', 'gender', 'age']).WHERE(person => (person.gender === 'male')).ORDER_BY('name', 'ASC')
    , null, 4);
}
