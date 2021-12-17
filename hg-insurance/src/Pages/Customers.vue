<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">All Customers</h1>
      <div class="row">
        <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Items..."
      label="Items per page"
      v-model.number="perPage"
    />

    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Page..."
      label="Current page"
      v-model.number="currentPage"
    />

    <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
    />
      </div>
      <va-data-table
        class="dt"
        :items="customers"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
        :per-page="perPage"
        :current-page="currentPage"
      >

      <template #bodyAppend>
      <tr><td colspan="8" class="table-example--pagination">
        <va-pagination
          v-model="currentPage"
          input
          :pages="pages"
        />
      </td></tr>
    </template>
      </va-data-table>
    </div>
  </div>
</template>

<style>
  .dt, .row, .h1{
    margin-left: 20px;
  }
  .h1{
    margin: 10px 0;
  }
</style>

<script>
import AppNav from "../components/AppNav.vue";
import SideBar from "../components/SideBar.vue";
import axios from "axios";
import { defineComponent } from 'vue'

export default defineComponent (
  {
  data() {
    const customers = []

    const columns = [
      { key: 'id', sortable: true },
      { key: 'username', sortable: true },
      { key: 'phone', sortable: true },
      { key: 'id_card', sortable: true },
      { key: 'email', sortable: true },
      { key: 'marital_status', sortable: true },
    ]

    return {
      customers: customers,
      columns,
      filter: '',
      filtered: customers,
      useCustomFilteringFn: false,
      filteredCount: customers.length,
      perPage: 3,
      currentPage: 1,
    };
  },

  computed: {
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length
    },
    customFilteringFn () {
      return this.useCustomFilteringFn ? this.filterExact : undefined
    },
  },

  methods:{
    filterExact (source) {
      if (this.filter === '') {
        return true
      }

      return source?.toString?.() === this.filter
    },
  },

  async mounted() {
    let result = await axios.get("customers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result.data);
    this.customers = result.data.results;
  },

  components: {
    AppNav,
    SideBar,
  },
}
);
</script>
