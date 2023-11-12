<template>
  <div class="auction-card" v-for="auction in auctions" :key="auction.id">
    <h3 class="card-header text-white d-flex justify-content-between align-items-center">
        <span>Producto: {{auction.name}}</span>
        <div>
          <div class="btn-container">
            <a href="#" class="btn btn-warning btn-sm" @click="auction.showEditBidForm = true">Editar</a>
          </div>
          <button type="button" class="btn btn-danger btn-sm mt-3" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" data-backdrop="static">
            Eliminar
          </button>
        </div>
      </h3>
    <div class="card-body">
      <h5 class="card-title text-white">Precio base: {{'$'+ auction.base_price}} </h5>
      <h5 class="card-title text-white">Precio actual: {{'$'+ auction.current_price}} </h5>
      <p class="card-text text-white"></p>
      <p class="card-text text-white">Fecha inicio: {{(auction.start_date.replace('T',' ')).replace('.000Z','')}}</p>
      <p class="card-text text-white">Fecha término: {{(auction.end_date.replace('T',' ')).replace('.000Z','')}}</p>
      <a href="#" class="btn btn-info btn-sm" @click="auction.showBidForm = true">Pujar</a>
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
    <div v-if="auction.showEditBidForm" class="bid-form">
        <div class="form-body">
          <div class="row">
            <div class="form-holder">
              <div class="form-content">
                <div class="form-items">
                  <h3>Editar subasta</h3>
                  <div class="requires-validation" novalidate>
                    <div class="col-md-12">
                      <input class="form-control" type="text" name="product" placeholder="Nombre producto" required>
                    </div>
                    <div class="col-md-12">
                      <input class= "form-control" type="text" name="base_price" placeholder="Precio Base" required>
                    </div>
                    <div class="col-md-12" style="margin-top: 20px;">
                      <input
                        type="datetime-local"
                        id="meeting-time"
                        name="meeting-time"
                      />
                    </div>
                    <div class="col-md-12" style="margin-top: 20px;">
                      <input
                        type="datetime-local"
                        id="meeting-time"
                        name="meeting-time"
                      />
                    </div>
                    <div class="form-button mt-3" style="margin-top: 20px;">
                      <button id="submit" @click="editAuction(auction)" type="submit" class="btn btn-secondary btn-sm">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Eliminación</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>¿Estás seguro de que deseas eliminar esta subasta?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="deleteAuction(auction)">Eliminar</button>
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
    },
    editAuction(){
      
    }
    deleteAuction() {
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

</style>