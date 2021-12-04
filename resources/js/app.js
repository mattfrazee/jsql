require('./bootstrap');


// import jSQL
import { jSQL } from "./util/jsql";
window.jSQL = jSQL;


// import sample data
import { people } from "./sample-data";
window.people = people;
import { states } from "./sample-data";
window.states = states;


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
