class Cart {
    constructor(container = ".cart") {
        this.container = container;
        this.cartGoods = [];
        this.allCartGoods = [];
        this._getCartGoods()
            .then(data => { //data - объект js
                this.cartGoods = [...data.contents];
                this.render()
            });
        this.totalCount = 0;
    }

    _getCartGoods() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }



    render() {
        const block = document.querySelector(this.container);
        for (let item of this.cartGoods) {
            const cartObj = new CartItem(item);
            this.allCartGoods.push(cartObj);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
        this.count();
    }

    count() {
        const block = document.querySelector(this.container);
        let totalPrice = 0;
        for (let item of this.cartGoods) {
            const cartObj = new CartItem(item);
            this.totalCount += 1;
            totalPrice += cartObj.price;
        }
        let countHtml = `<div class='cart-count'>
                            Товаров в корзине: ${this.totalCount} <br> Сумма: ${totalPrice}&#8381
                        </div>`
        block.insertAdjacentHTML('beforeend', countHtml);

        let cartBtn = document.getElementsByClassName('btn-cart');
        cartBtn[0].insertAdjacentHTML('beforeend', ` (${this.totalCount})`);

    }

    openCart() {
        document.getElementById("cart").style.display = "flex";
    }

    closeCart() {
        document.getElementById("cart").style.display = "none";
    }
}

class CartItem {
    constructor(item) {
        this.title = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
    }

    render() {
        return `<div class="cart-item"><h3>${this.title}</h3>
                <p>${this.price}&#8381</p>
                <button class="delete-btn">Удалить</button>
            </div>`
    }
}



let cart = new Cart();
// cart.render();