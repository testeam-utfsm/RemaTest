<template>
  <div class="auction-card" v-for="auction in auctions" :key="auction.id">
    <h3 class="card-header text-white">Producto: {{auction.name}} </h3>
    <div class="card-body">
      <h5 class="card-title text-white">Precio base: {{'$'+ auction.base_price}} </h5>
      <h5 class="card-title text-white">Precio actual: {{'$'+ auction.current_price}} </h5>
      <p class="card-text text-white"></p>
      <p class="card-text text-white">Fecha inicio: {{(auction.start_date.replace('T',' ')).replace('.000Z','')}}</p>
      <p class="card-text text-white">Fecha término: {{(auction.end_date.replace('T',' ')).replace('.000Z','')}}</p>
      <a 
        href="#" 
        class="btn btn-primary" 
        @click="auction.showBidForm = true"
      >Pujar</a>
    </div>

    <div v-if="auction.showBidForm" class="bid-form">
      <div class="form-body">
          <div class="row">
              <div class="form-holder">
                  <div class="form-content">
                      <div class="form-items">
                          <h3>Pujar</h3>
                          <div class="requires-validation" novalidate>
                              <div class="col-md-12">
                                <input class="form-control" type="number" name="amount" min="auction.current_price" v-model="auction.new_price" placeholder="Monto a pujar" required>
                              </div>
                              <div class="form-button mt-3" style="margin-top: 20px;">
                                  <button id="submit" @click="handleSubmit(auction)" type="submit" class="btn btn-primary">Enviar</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
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
      showingBidForm: false,
    };
  },
  
  mounted() {   
    this.getAuctions(); 
  },
  methods:{
    async getAuctions(){
      try{
        const response = await axios.get('http://localhost:3000/api/auctions')
        this.auctions = response.data.map(auction => ({
          ...auction,
          new_price: auction.current_price,
        }));
        console.log(this.auctions);
      }catch (error){
        console.error('Error',error)
      }
    },
    async handleSubmit(auction){
        //window.alert('aqui');
        let currentDate = new Date().toISOString();

        currentDate = currentDate.replace('T',' ');
        currentDate = currentDate.split('.')[0];
          

        let result = await api.post('http://localhost:3000/api/bids',
        {
            auction_id: auction.id,
            user_id: 1,
            amount: auction.new_price,
            date: currentDate
        });
        console.warn(result);
        // auction.formData.amount = '';
        auction.showBidForm = false;

        this.getAuctions();
    }

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

</style>