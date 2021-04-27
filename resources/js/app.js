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
function el(element) {
    return document.getElementById(element);
};
if(el('resultVar') && el('resultDemo')) {
    el('resultVar').innerHTML = 'const jsonArray = ' + JSON.stringify(jsonArray, null, 4) + ';';
    el('resultDemo').innerHTML = '// result:\n' + JSON.stringify(
        jsonArray.SELECT(['name', 'gender', 'age']).WHERE(person => (person.gender === 'male')).ORDER_BY('name', 'ASC')
    , null, 4);
}
