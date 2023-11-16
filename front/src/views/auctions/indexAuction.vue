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
    <div>
      <a href="/auctions/create" class="btn btn-danger">
        Nueva subasta
      </a>
    </div> 
    <div class="auction-card" v-for="auction in filteredAuctions" :key="auction.id">
      <h3 class="card-header text-white d-flex justify-content-between align-items-center">
        <span>Producto: {{auction.name}}</span>
        <div>
          <div class="btn-container">
            <a href="#" class="btn btn-warning btn-sm" @click="auction.showEditBidForm = true; update.id = auction.id">Editar</a>
          </div>
          <button type="button" @click="selectedAuction = auction" class="btn btn-danger btn-sm mt-3" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
            Eliminar
          </button>
        </div>
      </h3>
      <div class="card-body">
        <h5 class="card-title text-white">Precio base: {{'$'+ auction.base_price}}</h5>
        <h5 class="card-title text-white">Precio actual: {{'$'+ auction.current_price}}</h5>
        <p class="card-text text-white"></p>
        <p class="card-text text-white">Fecha inicio: {{ moment(auction.start_date) }}</p>
        <p class="card-text text-white">Fecha fin: {{ moment(auction.end_date)}}</p>
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
                      <input class="form-control" type="number" name="amount" 
                        :min="auction.current_price" v-model="auction.new_price" 
                        placeholder="Monto a pujar" required
                      >
                    </div>
                    <div class="form-button mt-3" style="margin-top: 20px;">
                      <button id="submit" @click="handleSubmit(auction)" type="submit" class="btn btn-primary btn-sm">Enviar</button>
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
                      <input v-model="update.name" class="form-control" type="text" name="product" placeholder="Nombre producto" required>
                    </div>
                    <div class="col-md-12">
                      <input v-model="update.base_price" class= "form-control" type="text" name="base_price" placeholder="Precio Base" required>
                    </div>
                    <div class="col-md-12" style="margin-top: 20px;">
                      <input
                      v-model="update.start_date"
                        type="datetime-local"
                        id="meeting-time"
                        name="meeting-time"
                      />
                    </div>
                    <div class="col-md-12" style="margin-top: 20px;">
                      <input
                      v-model="update.end_date"
                        type="datetime-local"
                        id="meeting-time"
                        name="meeting-time"
                      />
                    </div>
                    <div class="form-button mt-3" style="margin-top: 20px;">
                      <button id="submit" @click="handleUpdate" type="submit" class="btn btn-secondary btn-sm">Guardar</button>
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
              <button type="button" class="btn btn-danger" @click="eliminarAuction(auction.id)">Eliminar</button>
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
import moment from 'moment'; 


import auctionApi from '@/api/auction.js';
const axios = require('axios');
export default {
  data() {
    return {
      auctions: [],
      searchQuery: "",
      filteredAuctions: [],
      selectedAuction: null,
      update: {
        id: 0,
        name: "",
        base_price: "",
        start_date: "",
        end_date: ""
      }
    };
  },
  mounted() {   
    this.getAuctions(); 
  },
  methods: {
    moment(val) {
      return moment(val)
    },
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

      moment(result.data.date).subtract(3, 'hours');
      console.warn(result);
      auction.showBidForm = false;
      this.getAuctions();
    },
    async handleUpdate() {
      let name = this.update.name;
      let base_price = this.update.base_price;
      let start_date = moment(this.update.start_date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
      let end_date = moment(this.update.end_date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')

      await auctionApi.update(this.update.id, {
        name: name,
        base_price: base_price,
        start_date: start_date,
        end_date: end_date
      }).data;
    } ,
    filterAuctions() {
      this.filteredAuctions = this.auctions.filter(auction => {
        return auction.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    async eliminarAuction() {
      const id = this.selectedAuction.id;
      let data = (await auctionApi.delete(id)).data;

      if (data.error != null){
        alert(data.error)
      } else {
        alert("OK")
      }

      // alert(response.data)
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
