const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        productsCart: [],
        imgCatalog: 'https://placehold.it/200x200',
        userSearch: '',
        filtered: [],
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },

        search() {
            this.userSearch = document.querySelector('.search-field').value;
            this.filter(this.userSearch);
        },

        filter(value) {
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }

    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.productsCart.push(el);
                }
            });


    },




})
// app.filter('мыш');
app.search();
console.log(app.userSearch);