<template>
  <section>
    <div><h1>Aquí se encuentra todo el detalle de ingresos por zona</h1></div>
    <div>
      <b-table
        :data="isEmpty ? [] : zoneInformation"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
      >
        <b-table-column
          field="name"
          label="Nombre"
          centered
          sortable
          v-slot="props"
        >
          {{ props.row.name }}
        </b-table-column>

        <b-table-column
          field="mesas"
          label="Mesas cobradas"
          sortable
          numeric
          centered
          v-slot="props"
        >
          {{ props.row.orders }}
        </b-table-column>

        <b-table-column
          field="income"
          numeric
          label="Ingreso Total"
          sortable
          centered
          v-slot="props"
        >
          $ {{ props.row.income }}
        </b-table-column>
        <b-table-column
          field="averageIncome"
          numeric
          label="Ingreso Promedio por Mesa"
          sortable
          centered
          v-slot="props"
        >
          $ {{ props.row.averageIncome }}
        </b-table-column>
        <b-table-column
          field="averageTime"
          numeric
          label="Tiempo promedio estadía (minutos)"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.averageTime }}
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    };
  },
  computed: {
    zoneInformation() {
      return this.$store.getters.zoneInformation;
    }
  }
};
</script>
<style scoped>
section {
  display: inline;
  justify-content: center;
}
section div {
  padding: 20px;
  margin-left: 50px;
  margin-right: 50px;
}
section div h1 {
  font-weight: bolder;
  font-size: 25px;
}
</style>
