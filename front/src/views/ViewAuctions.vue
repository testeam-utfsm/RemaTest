<template>
  <div>
    <div class="search-bar">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        @input="filterAuctions"
        placeholder="Buscar productos"
      />
    </div>
    <div class="auction-card" v-for="auction in filteredAuctions" :key="auction.id">
      <h3 class="card-header text-white d-flex justify-content-between align-items-center">
        <span>Producto: {{auction.name}}</span>
      </h3>
      <div class="card-body">
        <h5 class="card-title text-white">Precio base: {{'$'+ auction.base_price}}</h5>
        <h5 class="card-title text-white">Precio actual: {{'$'+ auction.current_price}}</h5>
        <p class="card-text text-white"></p>
        <p class="card-text text-white">Fecha inicio: {{(auction.start_date.replace('T',' ')).replace('.000Z','')}}</p>
        <p class="card-text text-white">Fecha término: {{(auction.end_date.replace('T',' ')).replace('.000Z','')}}</p>
        <a href="#" class="btn btn-info btn-sm" @click="auction.showBidForm = true">Pujar</a>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap'; 
import 'bootstrap-datepicker';
import api from '@/api/index.js';
const axios = require('axios');
export default {
  data() {
    return {
      auctions: [],
      searchQuery: "",
      filteredAuctions: [],
    };
  },
  mounted() {   
    this.getAuctions(); 
  },
  methods: {
    async getAuctions() {
      try {
        const response = await axios.get('http://localhost:3000/api/auctions');
        this.auctions = response.data.map(auction => ({
          ...auction,
          new_price: auction.current_price,
        }));
        this.filteredAuctions = [...this.auctions];
      } catch (error) {
        console.error('Error', error);
      }
    },
    async handleSubmit(auction) {
      let currentDate = new Date().toISOString();
      currentDate = currentDate.replace('T', ' ');
      currentDate = currentDate.split('.')[0];
      let result = await api.post('http://localhost:3000/api/bids', {
        auction_id: auction.id,
        user_id: 1,
        amount: auction.new_price,
        date: currentDate
      });
      console.warn(result);
      auction.showBidForm = false;
      this.getAuctions();
    },
    filterAuctions() {
      this.filteredAuctions = this.auctions.filter(auction => {
        return auction.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  }
};
</script>

<style>
.h2 {
    color: #fff;
    text-align: left;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 5px;
}

.text-white {
  color: #fff; 
}

.auction-card {
  margin: 100px; 
  padding: 10px;
  border: 1px solid #ccc; 
  border-radius: 5px; }
 
.search-bar {
    padding: 30px;
    margin-bottom: 10px;
  }
</style>