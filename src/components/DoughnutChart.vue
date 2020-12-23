<script>
// CommitChart.js
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
};
</script>
