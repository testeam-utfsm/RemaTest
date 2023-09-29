<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <div class="">
                        <h1>{{ product.name }}</h1>
                        <p>{{ product.description }}</p>
                        <p>{{ product.base_price }}</p>
                        <button class="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import auctionApi from '@/api/auction'

export default {
    data() {
        return {
            product: {}
        }
    },
    async mounted() {
        const { data } = await auctionApi.show(this.$route.params.id)
        this.product = data
    }
}
</script>