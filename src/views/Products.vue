<template>
  <section>
    <div><h1>Aquí se encuentra todo el detalle de los productos</h1></div>
    <div>
      <b-table
        :data="isEmpty ? [] : productsInformation"
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
          field="category"
          label="Categoría"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.category }}
        </b-table-column>

        <b-table-column
          field="price"
          numeric
          label="Precio Unitario"
          sortable
          centered
          v-slot="props"
        >
          $ {{ props.row.price }}
        </b-table-column>

        <b-table-column
          field="quantity"
          label="Cantidad Vendida"
          sortable
          centered
          numeric
          v-slot="props"
        >
          <span>
            {{ props.row.quantity }}
          </span>
        </b-table-column>

        <b-table-column
          field="income"
          label="Ingreso Total"
          numeric
          centered
          sortable
          v-slot="props"
        >
          <span> $ {{ props.row.income }} </span>
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
    productsInformation() {
      return this.$store.getters.productsInformation;
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
  font-size: 30px;
  padding: 2.5%;
}
</style>
