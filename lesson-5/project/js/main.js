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
        show: false,
        // countItems: 0,
        // countPrice: 0,
    },
    computed: {
        countItems() {
            return this.productsCart.reduce((totalQuantity, { quantity }) => totalQuantity + quantity, 0);
        },
        countPrice() {
            return this.productsCart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
        },
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
            let find = this.productsCart.find(el => el.id_product === product.id_product);
            if (find) {
                find.quantity++;
            } else {
                const prod = Object.assign({ quantity: 1 }, product);
                this.productsCart.push(prod)
            }
        },

        cartRemove(product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.productsCart.splice(this.productsCart.indexOf(product), 1);
            }
        },

        // cartCount() {
        //     this.countItems = 0;
        //     this.countPrice = 0;
        //     for (item of this.productsCart) {
        //         this.countItems += item.quantity;
        //         this.countPrice += item.price * item.quantity;
        //     }
        //     console.log(this.productsCart);
        //     console.log(this.countItems);
        // },

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
});

