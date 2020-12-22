<template>
  <section>
    <div>
      <h1>Aquí se encuentra todo el detalle de los Meseros</h1>
    </div>
    <div>
      <b-table
        :data="isEmpty ? [] : waitersInformation"
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
          field="orders"
          label="Mesas atendidas"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.orders }}
        </b-table-column>

        <b-table-column
          field="income"
          numeric
          label="Ingreso total"
          sortable
          centered
          v-slot="props"
        >
          $ {{ props.row.income }}
        </b-table-column>

        <b-table-column
          field="averageIncome"
          label="Ingreso promedio por mesa"
          sortable
          centered
          numeric
          v-slot="props"
        >
          <span> $ {{ props.row.averageIncome }} </span>
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
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    };
  },
  computed: {
    waitersInformation() {
      return this.$store.getters.waitersInformation;
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
