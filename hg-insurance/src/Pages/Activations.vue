<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">All Activations</h1>

      <div class="row">
        <va-input
          class="flex mb-2 md3 va-input"
          placeholder="Filter..."
          v-model="filter"
        />

        <va-input
          class="flex mb-2 md1 va-input"
          type="number"
          placeholder="Items..."
          label="Items per page"
          v-model.number="perPage"
        />

        <va-input
          class="flex mb-2 md1 va-input"
          type="number"
          placeholder="Page..."
          label="Current page"
          v-model.number="currentPage"
        />

        <button class="f-btns all" @click="allActivations">All activations</button>
        <button class="f-btns act" @click="activeActivations">
          Active activations
        </button>
        <button class="f-btns exp" @click="expiredActivations">
          Expired activations
        </button>
      </div>
      <va-data-table
        class="dt"
        :items="all_activations"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #bodyAppend>
          <tr>
            <td colspan="8" class="table-example--pagination">
              <va-pagination v-model="currentPage" input :pages="pages" />
            </td>
          </tr>
        </template>
      </va-data-table>
    </div>
  </div>
</template>

<style>
.f-btns {
  padding: 15px 12px;
  margin: 10px 10px 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #ff7e1b;
}
.act{
  background-color: #4285f5;
}
.exp{
  background-color: #2abbac;
}
.dt,
.row {
  margin-left: 20px;
}

.h1 {
  margin: 0 0 10px 20px;
}
.va-input {
  margin: 10px 20px 10px 0;
}
</style>

<script>
import AppNav from "../components/AppNav.vue";
import SideBar from "../components/SideBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const columns = [
      // { key: '#', sortable: true },
      { key: "user_insured", sortable: true },
      { key: "location", sortable: true },
      { key: "insurance_types", sortable: true },
      { key: "amount", sortable: true },
      { key: "expiry_date", sortable: true },
    ];

    return {
      all_activations: [],
      active: [],
      expired: [],
      columns,
      filter: "",
      perPage: 5,
      currentPage: 1,
    };
  },

  async mounted() {
    let active = await axios.get("active-activations", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(active.data);
    this.active = active.data.results;

    let expired = await axios.get("expired-activations", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(expired.data);
    this.expired = expired.data.results;

    this.all_activations = this.expired.concat(this.active);
    console.log(this.all_activations);
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.all_activations.length / this.perPage)
        : this.this.all_activations.length;
    },
  },

  methods: {
    allActivations() {
      this.all_activations = this.expired.concat(this.active);
    },

    activeActivations() {
      this.all_activations = this.active;
    },

    expiredActivations() {
      this.all_activations = this.expired;
    },

    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
    },
  },

  components: {
    AppNav,
    SideBar,
  },
});
</script>
