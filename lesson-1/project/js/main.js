const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    // _fetchProducts() {
    //     this.goods = [
    //         { id: 1, title: 'Notebook', price: 2000 },
    //         { id: 2, title: 'Mouse', price: 20 },
    //         { id: 3, title: 'Keyboard', price: 200 },
    //         { id: 4, title: 'Gamepad', price: 50 },
    //     ];
    // }


    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allGoods.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }


}


class ProductItem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
    }

    render() {
        return `<div class="product-item"><h3>${this.title}</h3>
                <p>${this.price}&#8381</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();