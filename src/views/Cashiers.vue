<template>
  <section>
    <div><h1>Aquí se encuentra todo el detalle de los cajeros</h1></div>
    <div>
      <b-table
        :data="isEmpty ? [] : cashiersInformation"
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
    cashiersInformation() {
      return this.$store.getters.cashiersInformation;
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
