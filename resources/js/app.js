// require('./bootstrap');

import { jSQL } from "./util/jsql";
window.jSQL = jSQL;

import { people } from "./sample-data";


document.getElementById('resultVar').innerHTML = 'const people = ' + JSON.stringify(people, null, 4) + ';';
document.getElementById('resultDemo').innerHTML = '// result:\n' + JSON.stringify(
    people.SELECT(['name', 'gender', 'age']).WHERE(person => (person.gender === 'male')).ORDER_BY('name', 'ASC')
, null, 4);

window.addEventListener('scroll',function (e) {
    if(window.pageYOffset >= 200){
        document.querySelector('header').style.top = '0px';
    } else {
        document.querySelector('header').style.top = '-'+document.querySelector('header').scrollHeight+'px';
    }
})
