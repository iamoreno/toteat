<template>
  <div class="home">
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
export default {
  name: "Home",
  components: {},
  data() {
    return {};
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
