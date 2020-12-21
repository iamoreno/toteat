<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="dato in waiterInformation" :key="dato">
        <p>
          El mesero {{ dato[0] }} ha atendido {{ dato[1] }} pedidos y ha cobrado
          total de $ {{ dato[2] }}
        </p>
      </li>
    </ul>
    <ul>
      <li v-for="payment in paymentsInformation" :key="payment">
        <p>El metodo {{ payment[0] }} ha generado {{ payment[1] }}</p>
      </li>
    </ul>
    <ul>
      <li v-for="dato in cashierInformation" :key="dato">
        <p>
          El cajero {{ dato[0] }} ha cobrado {{ dato[1] }} mesas y ha registrado
          un total de $ {{ dato[2] }}
        </p>
      </li>
    </ul>
    <ul>
      <li v-for="dato in zoneInformation" :key="dato">
        <p>
          La zona {{ dato[0] }} ha recibido {{ dato[1] }} mesas y ha registrado
          un total de $ {{ dato[2] }}
        </p>
      </li>
    </ul>
    <ul>
      <li v-for="ingreso in dailyIncomeInformation" :key="ingreso">
        <p>El día {{ ingreso[0] }} se ha recaudado {{ ingreso[1] }}</p>
      </li>
    </ul>
    <ul>
      <li v-for="ingreso in monthlyIncomeInformation" :key="ingreso">
        <p>El día {{ ingreso[0] }} se ha recaudado {{ ingreso[1] }}</p>
      </li>
    </ul>
    <ul>
      <li v-for="product in productsInformation" :key="product">
        <p>
          El producto {{ product[0] }} tiene un precio {{ product[2] }} y ha
          sido pedido un total de {{ product[3] }} generando unos ingresos de
          {{ product[4] }}
        </p>
      </li>
    </ul>
    <ul>
      <li v-for="product in averageStay" :key="product">
        <p>
          El pedido de id {{ product[0] }} se quedó {{ product[4] }} minutos
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      sells: null
    };
  },
  computed: {
    waiterInformation() {
      return this.$store.getters.waiterInformation;
    },
    cashierInformation() {
      return this.$store.getters.cashierInformation;
    },
    paymentsInformation() {
      return this.$store.getters.paymentsInformation;
    },
    zoneInformation() {
      return this.$store.getters.zoneInformation;
    },
    productsInformation() {
      return this.$store.getters.productsInformation;
    },
    dailyIncomeInformation() {
      return this.$store.getters.dailyIncomeInformation;
    },
    monthlyIncomeInformation() {
      return this.$store.getters.monthlyIncomeInformation;
    },
    averageStay() {
      return this.$store.getters.averageStay;
    }
  }
};
</script>
