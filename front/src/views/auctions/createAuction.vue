 <template>
  <div class="form-body">
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Crea una subasta</h3>
                        <div class="requires-validation" novalidate >
                            <div class="col-md-12">
                               <input class="form-control" type="text" name="product" v-model="formData.product" placeholder="Nombre producto" required>
                            </div>
                            <div class="col-md-12">
                                <input class="form-control" type="text" name="base_price" v-model="formData.base_price" placeholder="Precio Base" required>
                            </div>
                            <div class="col-md-12" style="margin-top: 20px;">
                                <input
                                type="datetime-local"
                                id="meeting-time"
                                name="meeting-time"
                                v-model="formData.start_date"
                                />
                            </div>
                            <div class="col-md-12" style="margin-top: 20px;">
                                <input
                                type="datetime-local"
                                id="meeting-time"
                                name="meeting-time"
                                v-model="formData.end_date"
                                />
                            </div>
                            <div class="form-button mt-3" style="margin-top: 20px;">
                                <button id="submit" @click="handleSubmit" type="submit" class="btn btn-secondary">Registrar</button>
                            </div>
                        </div>
                    </div>
                    <router-link to="/" class="btn btn-primary">Ver subastas</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap'; 
import 'bootstrap-datepicker';
import 'jquery';
const axios = require('axios');
axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":3000";

import moment from 'moment';


export default {
  data() {
    return {
      formData:{
        product : '',
        base_price: '',
        start_date:'',
        end_date: ''
      },
    };
  },
  mounted() {    
  },
  methods:{
    handleSubmit(){
        let start_date = moment(this.formData.start_date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
        let end_date = moment(this.formData.end_date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')

        axios.post("/api/auctions?", {
            name: this.formData.product,
            base_price: this.formData.base_price,
            start_date: start_date,
            end_date: end_date,
        })
        .then(res => {
            console.log(res);
            window.alert("Subasta creada con exito")
        })
        .catch(error => {
            console.log(error);
            window.alert("Error al crear subasta")
        });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap');

*, body {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
}

html, body {
    height: 100%;
    background-color: #152733;
}


.form-holder {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 100vh;
}

.form-holder .form-content {
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 60px;
}

.form-content .form-items {
    border: 3px solid #fff;
    padding: 40px;
    display: inline-block;
    width: 100%;
    min-width: 540px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: left;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.form-content h3 {
    color: #fff;
    text-align: left;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 5px;
}

.form-content h3.form-title {
    margin-bottom: 30px;
}

.form-content p {
    color: #fff;
    text-align: left;
    font-size: 17px;
    font-weight: 300;
    line-height: 20px;
    margin-bottom: 30px;
}


.form-content label, .was-validated .form-check-input:invalid~.form-check-label, .was-validated .form-check-input:valid~.form-check-label{
    color: #fff;
}

.form-content input[type=text], .form-content input[type=password], .form-content input[type=email], .form-content select {
    width: 100%;
    padding: 9px 20px;
    text-align: left;
    border: 0;
    outline: 0;
    border-radius: 6px;
    background-color: #fff;
    font-size: 15px;
    font-weight: 300;
    color: #8D8D8D;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    margin-top: 16px;
}


.btn-primary{
    background-color: #6C757D;
    outline: none;
    border: 0px;
     box-shadow: none;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active{
    background-color: #495056;
    outline: none !important;
    border: none !important;
     box-shadow: none;
}

.form-content textarea {
    position: static !important;
    width: 100%;
    padding: 8px 20px;
    border-radius: 6px;
    text-align: left;
    background-color: #fff;
    border: 0;
    font-size: 15px;
    font-weight: 300;
    color: #8D8D8D;
    outline: none;
    resize: none;
    height: 120px;
    -webkit-transition: none;
    transition: none;
    margin-bottom: 14px;
}

.form-content textarea:hover, .form-content textarea:focus {
    border: 0;
    background-color: #ebeff8;
    color: #8D8D8D;
}

.mv-up{
    margin-top: -9px !important;
    margin-bottom: 8px !important;
}

.invalid-feedback{
    color: #ff606e;
}

.valid-feedback{
   color: #2acc80;
}
.datepicker {
    width: 100%;
    max-width: 200px; 
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

</style>