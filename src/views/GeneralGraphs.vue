<template>
  <div class="home">
    <div><h1>Gráficos de Estadísticas Generales</h1></div>
    <div class="Chart">
      <h2>Ingresos Mensuales</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="monthlyChartConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Mesas atendidas por mes</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="monthlyOrderConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Ingreso promedio por mesa en cada mes</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="monthlyAverageConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Ingresos Totales Diarios</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="dailyChartConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Mesas atendidas por día</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="dailyOrderConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Ingreso promedio por mesa en cada día</h2>
      <BarChart
        v-if="isLoaded"
        :chartData="dailyAverageConfig"
        :options="options"
      ></BarChart>
    </div>
    <div class="Chart">
      <h2>Metodos de Pago</h2>
      <DoughnutChart
        v-if="isLoaded"
        :chartData="doughnutPaymentConfig"
        :options="doughnutOptions"
      ></DoughnutChart>
    </div>
    <div class="Chart">
      <h2>Cantidad de Mesas atendidas por Zona</h2>
      <DoughnutChart
        v-if="isLoaded"
        :chartData="doughnutZoneConfig"
        :options="doughnutOptions"
      ></DoughnutChart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarChart from "@/components/BarChart.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";

export default {
  name: "Home",
  components: {
    BarChart,
    DoughnutChart
  },
  data() {
    return {
      isLoaded: false,
      monthlyChartConfig: {},
      monthlyOrderConfig: {},
      monthlyAverageConfig: {},
      dailyChartConfig: {},
      dailyOrderConfig: {},
      dailyAverageConfig: {},
      doughnutPaymentConfig: {},
      doughnutZoneConfig: {},
      options: {},
      doughnutOptions: {},
      zoneInfo: []
    };
  },
  computed: {
    paymentsInformation() {
      return this.$store.getters.paymentsInformation;
    },
    averageStay() {
      return this.$store.getters.averageStay;
    }
  },
  async mounted() {
    let monthlyInfo = this.$store.getters.monthlyIncomeInformation;
    let dailyInfo = this.$store.getters.dailyIncomeInformation;
    let paymentInfo = this.$store.getters.paymentsInformation;
    let zoneInfo = this.$store.getters.zoneInformation;
    let zones = [];
    let orders = [];
    zoneInfo.forEach(element => {
      zones.push(element.name);
      orders.push(element.orders);
    });
    this.monthlyChartConfig = {
      labels: monthlyInfo[0],
      datasets: [
        {
          label: "Ingresos $",
          backgroundColor: "#42b983",
          data: monthlyInfo[1]
        }
      ]
    };
    this.monthlyOrderConfig = {
      labels: monthlyInfo[0],
      datasets: [
        {
          label: "Mesas",
          backgroundColor: "#42b983",
          data: monthlyInfo[2]
        }
      ]
    };
    this.monthlyAverageConfig = {
      labels: monthlyInfo[0],
      datasets: [
        {
          label: "Ingreso",
          backgroundColor: "#42b983",
          data: monthlyInfo[3]
        }
      ]
    };
    this.dailyChartConfig = {
      labels: dailyInfo[0],
      datasets: [
        {
          label: "Ingresos $",
          backgroundColor: "#42b983",
          data: dailyInfo[1]
        }
      ]
    };
    this.dailyOrderConfig = {
      labels: dailyInfo[0],
      datasets: [
        {
          label: "Mesas",
          backgroundColor: "#42b983",
          data: dailyInfo[2]
        }
      ]
    };
    this.dailyAverageConfig = {
      labels: dailyInfo[0],
      datasets: [
        {
          label: "Ingreso",
          backgroundColor: "#42b983",
          data: dailyInfo[3]
        }
      ]
    };
    this.doughnutPaymentConfig = {
      labels: paymentInfo[0],
      datasets: [
        {
          label: "Ingreso",
          backgroundColor: ["#42b983", "#248559", "#0b5232"],
          data: paymentInfo[1]
        }
      ]
    };
    this.doughnutZoneConfig = {
      labels: zones,
      datasets: [
        {
          label: "Mesas",
          backgroundColor: ["#42b983", "#248559", "#0b5232"],
          data: orders
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
    this.doughnutOptions = {
      responsive: true
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
