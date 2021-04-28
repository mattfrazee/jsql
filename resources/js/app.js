// require('./bootstrap');


// import jSQL
import { jSQL } from "./util/jsql";
window.jSQL = jSQL;


// import sample data
import { people } from "./sample-data";
import { heroSample } from "./sample-data";
document.querySelectorAll('.sample-data').forEach(function (el) {
    el.innerHTML = 'const people = ' + JSON.stringify(people, null, 4) + ';';
})


// hero
document.querySelector('.hero-data').innerHTML = 'const people = ' + JSON.stringify(heroSample, null, 4) + ';';
document.querySelector('.hero-result').innerHTML = '// result:\n' + JSON.stringify(
    heroSample.SELECT(['name', 'gender', 'age']).WHERE(person => (person.gender === 'male')).ORDER_BY('name', 'DESC')
, null, 4);


// sticky navigation
function checkNavScroll(){
    let el = document.querySelector('header');
    if(window.pageYOffset >= 200 && el.style.top != '0px')
        el.style.top = '0px';
    else if(window.pageYOffset <= 200 && el.style.top != '-'+(el.scrollHeight + 10)+'px')
        el.style.top = '-'+(el.scrollHeight + 10)+'px';
}
window.addEventListener('scroll', checkNavScroll);
checkNavScroll();
