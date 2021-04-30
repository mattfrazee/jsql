import { heroSample } from "./sample-data";

new Vue({
    comments: true,
    methods:{
        el(querySelector){
            return document.querySelector(querySelector);
        },
        fillCode(element, code){
            this.el(element).innerHTML = code;
            Prism.highlightElement(this.el(element));
        }
    },
    mounted(){
        // console.log(Array.prototype);
        // console.log(jSQL);
        // console.log(Prism);
        // console.log(people);

        this.fillCode(
            '#sampleJsonData',
            'const people = ' + JSON.stringify(people, null, 4) + ';'
        );

        // hero
        this.fillCode(
            '.hero-data',
            'const people = ' + JSON.stringify(heroSample, null, 4) + ';'
        );
        this.fillCode(
            '.hero-result',
            '// result:\n' + JSON.stringify(heroSample.select(['name', 'gender', 'age']).where(person => (person.gender === 'male')).orderBy('name', 'DESC'), null, 4)
        );


        // select examples
        this.fillCode(
            '#selectExample1',
            'people.select( [\'name\', \'age\'] );\n\n// result:\n' + JSON.stringify( people.select(['name', 'age']), null, 4)
        );


        this.fillCode(
            '#whereExample1',
            'people\n\t.select( [\'name\', \'gender\'] )\n\t.where(\n\t\tperson => (person.gender === "male")\n\t);\n\n// result:\n' + JSON.stringify(
                people.select( ['name', 'gender'] ).where(
                    person => (person.gender === 'male')
                )
            , null, 4)
        );


        this.fillCode(
            '#limitExample1',
            'people\n\t.select( \'name\' )\n\t.limit( 3, 1 );\n\n// result:\n' + JSON.stringify( people.select( 'name' ).limit( 3, 1 ), null, 4 )
        );


    },
}).$mount('#app');
