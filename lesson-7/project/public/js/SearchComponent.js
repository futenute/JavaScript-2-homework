Vue.component('search', {
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field">
        <button class="btn-search" type="submit" @click="$parent.$refs.products.search()"></button>
    </form>
    `
})