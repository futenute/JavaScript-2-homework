class Cart {
    constructor(container = ".cart") {
        this.container = container;
        this.cartGoods = [];
        this._fetchCartGoods();
    }

    _fetchCartGoods() {
        this.cartGoods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 1, title: 'Notebook', price: 2000 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let item of this.cartGoods) {
            const cartObj = new CartItem(item);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
        this.count();
    }

    count() {
        const block = document.querySelector(this.container);
        let totalCount = 0;
        let totalPrice = 0;
        for (let item of this.cartGoods) {
            const cartObj = new CartItem(item);
            totalCount += 1;
            totalPrice += cartObj.price;
        }
        let countHtml = `<div class='cart-count'>
                            Товаров в корзине: ${totalCount} на сумму: ${totalPrice}&#8381
                        </div>`
        block.insertAdjacentHTML('beforeend', countHtml);
    }
}

class CartItem {
    constructor(item) {
        this.title = item.title;
        this.price = item.price;
        this.id = item.id;
    }

    render() {
        return `<div class="cart-item"><h3>${this.title}</h3>
                <p>${this.price}&#8381</p>
                <button class="delete-btn">Удалить</button>
            </div>`
    }
}

let cart = new Cart();
cart.render();