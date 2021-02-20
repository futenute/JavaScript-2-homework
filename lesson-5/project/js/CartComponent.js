Vue.component('cart', {
    props: ['productsCart', 'show', 'cartRemove', 'countItems', 'countPrice'],
    template: `
    
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
    `
})

Vue.component('cart-item', {
    props: ['item', 'cartRemove'],
    template: `
            <div class="cart-item">
                <h3>{{item.product_name}}</h3>
                <p>{{item.quantity*item.price}}$ ({{item.price}}$ за шт)</p>
                <p>{{item.quantity}}шт</p>
                <button class="buy-btn" @click="cartRemove(item)">Удалить</button>
            </div>
    `
});