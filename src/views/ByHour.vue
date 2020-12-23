<template>
  <div class="home">
    <div><h1>Gráficos de Ingresos y demanda por hora</h1></div>
    <div class="Chart">
      <h2>Ingresos por hora</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="hourlyIncomeConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Mesas atendidas por mes</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="hourlyOrderConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Ingreso promedio por mesa por hora</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="hourlyAverageConfig"
        :options="options"
      ></BarChart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Home",
  components: {
    BarChart
  },
  data() {
    return {
      isLoaded: false,
      hourlyIncomeConfig: {},
      hourlyOrderConfig: {},
      hourlyAverageConfig: {},
      options: {}
    };
  },
  computed: {},
  async mounted() {
    let hourlyInfo = this.$store.getters.hourlyIncomeInformation;
    this.hourlyIncomeConfig = {
      labels: hourlyInfo[0],
      datasets: [
        {
          label: "Ingresos $",
          backgroundColor: "#42b983",
          data: hourlyInfo[1]
        }
      ]
    };
    this.hourlyOrderConfig = {
      labels: hourlyInfo[0],
      datasets: [
        {
          label: "Mesas",
          backgroundColor: "#42b983",
          data: hourlyInfo[2]
        }
      ]
    };
    this.hourlyAverageConfig = {
      labels: hourlyInfo[0],
      datasets: [
        {
          label: "Ingreso $",
          backgroundColor: "#42b983",
          data: hourlyInfo[3]
        }
      ]
    };
    this.options = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    this.isLoaded = true;
  }
};
</script>
<style scoped>
.home h1 {
  font-weight: bold;
  font-size: 30px;
  padding: 3%;
}
.Chart {
  display: inline-block;
  padding: 3%;
}
</style>
