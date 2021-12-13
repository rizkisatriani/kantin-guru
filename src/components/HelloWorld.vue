<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="FailedUser"> {{Pesan }}</div>
    <div v-if="openFrom" class="kontainer">
    <p>Anda Berhasil Subscribe isi data anda untuk dikirimkan hadiah,<br /></p>
     <input class="field" v-model="user_delivery_address" placeholder="alamat">
     <input class="field" v-model="contact_number" placeholder="No. Telp">
     <input class="field" v-model="contact_person_name" placeholder="Nama Panggilan">
     <button @click="kirim()">Kirim</button>
    </div>
    
    <div v-if="!openFrom&Pesan.length<=0" class="kontainer">
    <p>Data Anda berhasil terkirim, silahkan menunggu proses selanjutnya...<br /></p>
    </div>
  </div>
</template>

<script>
import axios from "axios"; 
 
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      openFrom:false,
      items: [],
      dataUser: [],
      Pesan: '',
      user_delivery_address: '',
      contact_number: '',
      contact_person_name: '', 
    };
  },
  mounted(){ 
   setTimeout(()=>{  
    axios
      .get(`https://us-central1-silicon-airlock-153323.cloudfunctions.net/rg-package-dummy?userId=${this.$route.query.userId}`)
      .then((response) => {
        this.dataUser = response.data.data;
        this.openFrom=true;
        
      }).catch(()=>{
          this.Pesan="Kamu belum subscribe..."
      });
    }, 500); 
  }, 
  methods: {
    kirim(){
      const params = new URLSearchParams();
                params.append('user_id', this.$route.query.userId);
                params.append('user_delivery_address', this.user_delivery_address);
                params.append('contact_number', this.contact_number);
                params.append('contact_person_name', this.contact_person_name); 
                axios({
                    method: 'post',
                    url: 'http://mapsresto.herokuapp.com//api/add-sub',
                    data: params
                }).then(()=>{

                  this.openFrom=false;
                }).catch(()=>{
          this.Pesan="Data yang kamu isi salah, silahkan coba lagi..."
      });
    },
    redirect(kordinat) {
      window.open(
        "http://www.google.com/maps/place/" +
          kordinat +
          "/@" +
          kordinat +
          ",17z"
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.kontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {    
  opacity: .9;
  display: flex;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  margin: 15px;
  height: 100px;
  background-image: url("./../assets/background.jpg");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  font-weight:500 ;
}
b {
  font-size: 20px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

.field{
  margin:10px;
  width: 30%;
}

.FailedUser{
  color:red;
}
</style>
