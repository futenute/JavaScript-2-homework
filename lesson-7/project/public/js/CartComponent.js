Vue.component('cart', {
    data() {
        return{
            cartUrl: '/getBasket.json',
            productsCart: [],
            show: false
        }
    },

    computed: {
        countItems() {
            return this.productsCart.reduce((totalQuantity, {quantity}) => totalQuantity + quantity, 0);
        },
        countPrice() {
            return this.productsCart.reduce((sum, {price, quantity}) => sum + price * quantity, 0);
        },
    },

    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.productsCart.push(item);
                }
            });
    },

    methods: {
        addProduct(product) {
            let find = this.productsCart.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.productsCart.push(prod);
                        }
                    })
            }
        },

        cartRemove(id) {
            let remove = this.$parent.deleteJson;
            let cart = this.productsCart;
            // let find = cart.find(el => el.id_product === id);
            remove(`/api/cart/${id}`)
                .then(result => {
                    result.json()
                    this.$parent.getJson(`/api/cart`)
                        .then(data => {
                            this.$data.productsCart = [];
                            for (let item of data.contents){
                                this.$data.productsCart.push(item);
                            }
                        });
                });
        },
    },

    props: [],
    template: `
    <div>
        <button @click="show = !show;" class="btn-cart" type="button">Корзина ({{ countItems }})</button>
        <div v-if="show" class="cart-container " id="cart">
            <h2>Корзина</h2>
                <div v-if="countItems" class="cart-items">
                    <div class="cart-items">
                        <cart-item v-for="item of productsCart" :key="item.id_product" :item="item" :cart-remove="cartRemove">
                        </cart-item>
                    </div>
                    <div>Товаров в корзине: {{ countItems }} на сумму {{ countPrice }}$</div>
                    <button class="cart-buy-btn">Оформить заказ</button>
                </div>
                <div v-else="countItems" class="cart-items">
                    <div class="cart-item cart-empty"> 
                        Корзина пуста 
                    </div>
                </div>
            </div>
        <div v-else="show" class="invisible"></div>
    </div>

    `
})

Vue.component('cart-item', {
    props: ['item', 'cartRemove'],
    template: `
            <div class="cart-item">
                <h3>{{item.product_name}}</h3>
                <p>{{item.quantity*item.price}}$ ({{item.price}}$ за шт)</p>
                <p>{{item.quantity}}шт</p>
                <button class="buy-btn" @click="cartRemove(item.id_product)">Удалить</button>
            </div>
    `
});