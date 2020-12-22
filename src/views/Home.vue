<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="payment in paymentsInformation" :key="payment">
        <p>El metodo {{ payment[0] }} ha generado {{ payment[1] }}</p>
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
    paymentsInformation() {
      return this.$store.getters.paymentsInformation;
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
