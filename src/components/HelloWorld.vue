<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Berikut daftar kantin yang bisa anda kunjungi,<br /></p>
    <div class="kontainer">
      <div
        v-for="item in items"
        :key="item.id"
        @click="redirect(item.coordinat)"
        class="card"
      >
        <div class="container">
          <h4>
            <b>{{ item.nama_resto }}</b>
          </h4>
          <p>{{ item.alamat }}</p>
        </div>
      </div>
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
      items: [],
    };
  },
  created() {
    axios
      .get("https://mapsresto.herokuapp.com/api/showresto")
      .then((response) => {
        this.items = response.data.data;
      });
  },
  methods: {
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
</style>
