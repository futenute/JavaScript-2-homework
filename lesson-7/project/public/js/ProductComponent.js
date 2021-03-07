Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },

    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },

    methods: {


        filter(value) {
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },

        search() {
            this.$parent.userSearch = document.querySelector('.search-field').value;
            this.filter(this.$parent.userSearch);

        },
    },

    props: ['userSearch', 'addProduct'],
    template: `
    <div class="products" >
        <div class="products" v-if="!userSearch" >
            <product :products="products" :add-product="addProduct"></product>
        </div>
        <div class="products" v-else="userSearch">
            <div v-if="filtered.length > 0">
                <filtered-product :filtered="filtered" :add-product="addProduct"></filtered-product>
            </div>
            <div class="product-item" v-else>Ничего не найдено</div>
        </div>
    </div>
    `
});

Vue.component('product', {
    props: ['products', 'addProduct', 'filtered'],
    template: `
    <div class="products">
        <div class="product-item" v-for="product of products">
            <div class="prod-left">
                <h3>{{product.product_name}}</h3>
                <img :src="'img/' + product.id_product + '.jpg'" alt="Some img" width="200">
            </div>
            <div class="prod-right">
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
    </div>
    `
});

Vue.component('filtered-product', {
    props: ['filtered', 'addProduct'],
    template: `
    <div class="products">
        <div class="product-item" v-for="product of filtered">
            <div class="prod-left">
                <h3>{{product.product_name}}</h3>
                <img :src="'img/' + product.id_product + '.jpg'" alt="Some img" width="200">
            </div>
            <div class="prod-right">
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
    </div>
    `
})