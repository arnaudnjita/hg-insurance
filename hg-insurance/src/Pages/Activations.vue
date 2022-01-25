<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <div class="box3">
      <h1 class="h1">All Activations</h1>
      <div class="row">
        <va-input
          class="flex mb-2 md2 va-input"
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

        <va-button gradient :rounded="false" :color='"#4285f5"' class="f-btns all" @click="allActivations">All activations</va-button>
        <va-button gradient :rounded="false" :color='"#ff7e1b"' class="f-btns act" @click="activeActivations">
          Active activations
        </va-button>
        <va-button gradient :rounded="false" :color='"#15b0a0"' class="f-btns exp" @click="expiredActivations">
          Expired activations
        </va-button>
      </div>
      <div class="box4">
        <va-data-table
        id="dt"
        :items="all_activations"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
        :per-page="perPage"
        :current-page="currentPage"
        striped
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
    </div>
  </div>
</template>

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
      perPage: 6,
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

<style scoped>
.box3 {
  background-color: white;
  margin: 0px 15px 0px 15px;
  height: 71vh;
  border-radius: 5px;
  box-shadow: 2px 2px 12px #8e8e8e;
  padding: 30px 10px;
  width: 100%;
  overflow-y: hidden;
}
.box4 {
  overflow-y: auto; 
  height:47vh; 
  margin-bottom:10px;
  margin-left:20px;
  margin-right: 20px;
}
.f-btns {
  padding: 12px 0px;
  margin: 10px 10px 10px 20px;
  border-radius: 5px;
  color: white;
}
.all:hover {
  box-shadow: 2px 2px 5px grey;
}
.act:hover {
  box-shadow: 2px 2px 5px grey;
}
.exp:hover {
  box-shadow: 2px 2px 5px grey;
}
.all:active {
  transform: scale(0.98);
  box-shadow: 2px 2px 5px grey;
}
.act:active {
  transform: scale(0.98);
  box-shadow: 2px 2px 5px grey;
}
.exp:active {
  transform: scale(0.98);
  box-shadow: 2px 2px 5px #2abbac;
}

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