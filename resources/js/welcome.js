new Vue({
    mounted(){
        console.log(Array.prototype);
        // console.log(jSQL);
    },
    computed: {
        helloWorld() {
            return 'Success';
        },
    },
}).$mount('#app');
