Vue.component('products', {
    props: ['userSearch', 'products', 'filtered', 'imgCatalog', 'addProduct'],
    template: `
    <div class="products" >
        <div class="products" v-if="!userSearch" >
            <product :products="products" :img-catalog="imgCatalog" :add-product="addProduct"></product>
        </div>
        <div class="products" v-else="userSearch">
            <div v-if="filtered.length > 0">
                <filtered-product :filtered="filtered" :img-catalog="imgCatalog" :add-product="addProduct"></filtered-product>
            </div>
            <div class="product-item" v-else>Ничего не найдено</div>
        </div>
    </div>
    `
});

Vue.component('product', {
    props: ['products', 'imgCatalog', 'addProduct', 'filtered'],
    template: `
    <div class="products">
        <div class="product-item" v-for="product of products">
            <div class="prod-left">
                <h3>{{product.product_name}}</h3>
                <img :src="imgCatalog" alt="Some img">
            </div>
            <div class="prod-right">
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="addProduct(product)">Купить</button>
            </div>
        </div>
    </div>
    `
});

Vue.component('filtered-product', {
    props: ['filtered', 'imgCatalog', 'addProduct'],
    template: `
    <div class="products">
        <div class="product-item" v-for="product of filtered">
            <div class="prod-left">
                <h3>{{product.product_name}}</h3>
                <img :src="imgCatalog" alt="Some img">
            </div>
            <div class="prod-right">
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="addProduct(product)">Купить</button>
            </div>
        </div>
    </div>
    `
})