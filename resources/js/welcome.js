new Vue({
    mounted(){
        console.log('test')
    },
    computed: {
        helloWorld() {
            return 'Success';
        },
    },
}).$mount('#app');
