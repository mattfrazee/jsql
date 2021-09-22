import { heroSample } from "./sample-data";

new Vue({
    comments: true,
    data(){
        return {
            collapseSampleData:true
        };
    },
    methods:{
        el(querySelector){
            return document.querySelector(querySelector);
        },
        fillCode(element, code){
            if(document.querySelectorAll(element).length) {
                this.el(element).innerHTML = code;
                Prism.highlightElement(this.el(element));
            }
        },
        toggleSampleData(){
            this.collapseSampleData = !this.collapseSampleData;
        },
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
            '// result:\n' + JSON.stringify(heroSample.select(['name', 'gender', 'age']).where(person => (person.gender === 'male')).orderBy('name', 'sort.desc'), null, 4)
        );


        // select examples
        this.fillCode(
            '#selectExample1',
            'people.select( "name", "age" );\n\n// result:\n' + JSON.stringify( people.select('name', 'age'), null, 4)
        );
        this.fillCode(
            '#selectExample2',
            'people.select( ["name", "age"] );\n\n// result:\n' + JSON.stringify( people.select(['name', 'age']), null, 4)
        );


        //where examples
        this.fillCode(
            '#whereExample1',
            'people\n\t.select( ["name", "gender"] )\n\t.where(\n\t\tperson => (person.gender === "female")\n\t);\n\n// result:\n' + JSON.stringify(
                people.select( ['name', 'gender'] ).where(
                    person => (person.gender === 'female')
                )
            , null, 4)
        );
        this.fillCode(
            '#whereExample2',
            'people\n\t.select( ["name", "gender"] )\n\t.where( "gender", "=", "female" );\n\n// result:\n' + JSON.stringify(
                people.select( ['name', 'gender'] ).where('gender','=','female')
            , null, 4)
        );

        // orderby
        this.fillCode(
            '#orderByExample1',
            'people\n\t.select( "name" )\n\t.orderBy( "name" );\n\n// result:\n' + JSON.stringify( people.select( 'name' ).orderBy( 'name' ), null, 4 )
        );
        this.fillCode(
            '#orderByExample2',
            'people\n\t.select( ["name", "age"] )\n\t.orderBy(\n\t\t(a, b) => jSQL.sort.compare(a.age, b.age, jSQL.sort.asc) || jSQL.sort.compare(a.name, b.name, jSQL.sort.desc)\n\t);\n\n// result:\n' + JSON.stringify( people.select( ['name','age'] ).orderBy( (a, b) => jSQL.sort.compare(a.age, b.age, jSQL.sort.asc) || jSQL.sort.compare(a.name, b.name, jSQL.sort.desc) ), null, 4 )
        );

        //first examples
        this.fillCode(
            '#firstExample1',
            'people.first();\n\n// result:\n' + JSON.stringify( people.first(), null, 4 )
        );
        this.fillCode(
            '#firstExample2',
            'people\n\t.where( "gender", "=", "male" )\n\t.sortBy( "name" )\n\t.first();\n\n// result:\n' + JSON.stringify( people.where( "gender", "=", "male" ).sortBy("name").first(), null, 4 )
        );

        //get examples
        this.fillCode(
            '#getExample1',
            'people.get(2);\n\n// result:\n' + JSON.stringify( people.get(2), null, 4 )
        );
        this.fillCode(
            '#getExample2',
            'people\n\t.where( "gender", "=", "female" )\n\t.sortBy( "name" )\n\t.get(1);\n\n// result:\n' + JSON.stringify( people.where( "gender", "=", "female" ).sortBy("name").get(1), null, 4 )
        );

        //last examples
        this.fillCode(
            '#lastExample1',
            'people.last();\n\n// result:\n' + JSON.stringify( people.last(), null, 4 )
        );

        //like examples
        this.fillCode(
            '#likeExample1',
            'people.like( 123 );\n\n// result:\n' + JSON.stringify( people.like( 123 ), null, 4 )
        );
        this.fillCode(
            '#likeExample2',
            'people.searchFor( "FOOTBALL", false );\n\n// result:\n' + JSON.stringify( people.searchFor( "FOOTBALL", false ), null, 4 )
        );

        //limit examples
        this.fillCode(
            '#limitExample1',
            'people\n\t.select( "name" )\n\t.limit( 3 );\n\n// result:\n' + JSON.stringify( people.select( 'name' ).limit( 3 ), null, 4 )
        );
        this.fillCode(
            '#limitExample2',
            'people\n\t.select( "name" )\n\t.limit( 3, 1 );\n\n// result:\n' + JSON.stringify( people.select( 'name' ).limit( 3, 1 ), null, 4 )
        );

        //that have examples
        this.fillCode(
            '#thatHaveExample',
            'people\n\t.thatHave( "address" )\n\t.select( ["name", "address"] );\n\n// result:\n' + JSON.stringify( people.thatHave( 'address' ).select( ["name", "address"] ), null, 4 )
        );

        //has examples
        this.fillCode(
            '#hasExample1',
            'people.has( "name" );\n\n// result: ' + people.has( "name" ) +
            '\n\npeople.has( "email" );\n\n// result: ' + people.has( "email" )
        );
        this.fillCode(
            '#hasExample2',
            'people.has( "address.country.name" );\n\n// result: ' + people.has( "address.country.name" ) +
            '\n\npeople.has( "address.name" );\n\n// result: ' + people.has( "address.name" )
        );

        //people.push('{"result":true, "count":42}')
        this.fillCode(
            '#parseJSONExample',
            'people.push(\'{"name":"Kenny", "age":"56"}\');\n\npeople\n\t.parseJSON()\n\t.where( "age", ">", "30" )\n\t.select( ["name", "age"] )\n\t.sortBy( "name" );\n\n// result:\n' + JSON.stringify( people.concat('{"name":"Kenny", "age":"56"}').parseJSON().where( "age",">","30" ).select( ["name", "age"] ).sortBy( "name" ), null, 4 )
        );

        //add items
        this.fillCode(
            '#appendExample',
            'people\n\t.append({\n\t\t"name":"Kenny",\n\t\t"age":"56"\n\t})\n\t.select( "name", "age" );\n\n// result:\n' + JSON.stringify( people.append({"name":"Kenny", "age":"56"}).select( "name", "age" ), null, 4 )
        );
        this.fillCode(
            '#appendAtExample',
            'people\n\t.appendAt(2, {\n\t\t"name":"Kenny",\n\t\t"age":"56"\n\t})\n\t.select( "name", "age" );\n\n// result:\n' + JSON.stringify( people.appendAt(2, {"name":"Kenny", "age":"56"}).select( "name", "age" ), null, 4 )
        );
        this.fillCode(
            '#prependExample',
            'people\n\t.prepend({\n\t\t"name":"Kenny",\n\t\t"age":"56"\n\t})\n\t.select( "name", "age" );\n\n// result:\n' + JSON.stringify( people.prepend({"name":"Kenny", "age":"56"}).select( "name", "age" ), null, 4 )
        );


        // ascending/descending
        this.fillCode(
            '#ascExample',
            'jSQL.sort.asc;\n\n// result: ' + jSQL.sort.asc
        );
        this.fillCode(
            '#descExample',
            'jSQL.sort.desc;\n\n// result: ' + jSQL.sort.desc
        );

        // compare
        this.fillCode(
            '#compareExample',
            'jSQL.sort.compare("abc", "xyz", jSQL.sort.asc);\n// result: ' + jSQL.sort.compare("abc","xyz",jSQL.sort.asc) +
            '\n\njSQL.sort.compare("abc", "xyz", jSQL.sort.desc);\n// result: ' + jSQL.sort.compare("abc","xyz",jSQL.sort.desc) +
            '\n\njSQL.sort.compare(123, 456, jSQL.sort.asc);\n// result: ' + jSQL.sort.compare(123,456,jSQL.sort.asc) +
            '\n\njSQL.sort.compare(123, 456, jSQL.sort.desc);\n// result: ' + jSQL.sort.compare(123,456,jSQL.sort.desc)
        );
        this.fillCode(
            '#compareStringExample',
            'jSQL.sort.compareString("abc", "xyz", jSQL.sort.asc);\n// result: ' + jSQL.sort.compareString("abc","xyz",jSQL.sort.asc) +
            '\n\njSQL.sort.compareString("abc", "xyz", jSQL.sort.desc);\n// result: ' + jSQL.sort.compare("abc","xyz",jSQL.sort.desc) +
            '\n\njSQL.sort.compareString("abc", "abc");\n// result: ' + jSQL.sort.compare("abc","abc")
        );
        this.fillCode(
            '#compareNumberExample',
            'jSQL.sort.compareNumber(123, 456, jSQL.sort.asc);\n// result: ' + jSQL.sort.compareNumber(123,456,jSQL.sort.asc) +
            '\n\njSQL.sort.compareNumber(123, 456, jSQL.sort.desc);\n// result: ' + jSQL.sort.compareNumber(123,456,jSQL.sort.desc) +
            '\n\njSQL.sort.compareNumber(123, 123);\n// result: ' + jSQL.sort.compareNumber(123,123)
        );
        this.fillCode(
            '#compareDateExample',
            'jSQL.sort.compareDate(jSQL.date.now(), jSQL.date.format("4-29-1992"), jSQL.sort.asc);\n// result: ' + jSQL.sort.compareDate(jSQL.date.now(), jSQL.date.format("4-29-1992"), jSQL.sort.asc) +
            '\n\njSQL.sort.compareDate(jSQL.date.now(), jSQL.date.format("4-29-1992"), jSQL.sort.desc);\n// result: ' + jSQL.sort.compareDate(jSQL.date.now(), jSQL.date.format("4-29-1992"), jSQL.sort.desc) +
            '\n\njSQL.sort.compareDate(jSQL.date.now(), jSQL.date.now(), jSQL.sort.asc);\n// result: ' + jSQL.sort.compareDate(jSQL.date.now(), jSQL.date.now(), jSQL.sort.asc)
        );

        //version
        this.fillCode(
            '#versionExample',
            'jSQL.version;\n\n// result: ' + jSQL.version
        );

        //date
        this.fillCode(
            '#dateNowExample',
            'jSQL.date.now();\n\n// result: ' + jSQL.date.now()
        );

        this.fillCode(
            '#dateGetExample',
            'jSQL.date.format("5/25/1984");\n\n// result: ' + jSQL.date.format("5/25/1984")
        );

        this.fillCode(
            '#dateCountdownExample',
            'jSQL.date.countdown(jSQL.date.now(), "5/25/1984 20:20:00");\n\n// result:\n' + JSON.stringify(jSQL.date.countdown(jSQL.date.now(), '5/25/1984 20:20:00'), null, 4)
        );

        this.fillCode(
            '#avgExample',
            'people.avg("age");\n\n// result: ' + people.avg("age")
        );


    },
}).$mount('#app');
