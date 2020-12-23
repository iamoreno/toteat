<template>
  <div class="home">
    <h1>La Pikada de la Esquina</h1>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Restaurant_N%C3%A4sinneula.jpg"
      alt=""
    />
    <h2>
      En el apartado superior encontrará información detallada mediante gráficos
      y tablas. Todas las tablas son ordenables por cada columna.
    </h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {}
};
</script>
<style scoped>
.home h1 {
  font-size: 50px;
  font-weight: bolder;
  padding: 0.5%;
}
img {
  width: 45%;
  height: 45%;
  border-radius: 16px;
  border: 2px solid #ddd;
  padding: 4px;
}
h2 {
  font-size: 35px;
  font-weight: bold;
  margin-left: 18%;
  margin-right: 18%;
  margin-top: 2%;
}
</style>
