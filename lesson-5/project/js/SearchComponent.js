Vue.component('search', {
    props: ['search', 'filtered', 'userSearch'],
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field">
        <button class="btn-search" type="submit" @click="search()"></button>
    </form>
    `
})