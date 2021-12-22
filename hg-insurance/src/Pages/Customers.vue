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
          class="flex mb-2 md4 va-input"
          placeholder="Filter..."
          v-model="filter"
        />

        <va-input
          class="flex mb-2 md2 va-input"
          type="number"
          placeholder="Items..."
          label="Items per page"
          v-model.number="perPage"
        />

        <va-input
          class="flex mb-2 md2 va-input"
          type="number"
          placeholder="Page..."
          label="Current page"
          v-model.number="currentPage"
        />

        <button class="add-btn" @click="showModal = !showModal">
          Add customer
        </button>

        <va-modal
          v-model="showModal"
          hide-default-actions
          overlay-opacity="0.2"
          min-width="800px"
          size="large"
        >
          <va-form
            style="text-align: center"
            tag="form"
            @submit.prevent="handleSubmit"
          >
            <va-input
              class="mt-2"
              label="Username"
              v-model="username"
              placeholder=" Enter Username"
              type="text"
            />
            <va-input
              class="mt-2"
              label="Phone"
              v-model="phone"
              placeholder=" Enter Phone"
              type="text"
            />
            <va-input
              class="mt-2"
              label="Email"
              v-model="email"
              placeholder=" Enter Email"
              type="email"
            />
            <va-input
              class="mt-2"
              label="Address"
              v-model="address"
              placeholder=" Enter Address"
              type="text"
            />
            <va-input
              class="mt-2"
              label="ID card no"
              v-model="id_card"
              placeholder=" Enter ID card number"
              type="text"
            />
            <va-select
              class="mt-1"
              label="Marital status"
              v-model="marital_status"
              placeholder="Marital status"
              :options="status_op"
              type="text"
            />
            <va-select
              class="mt-1"
              label="Select gender"
              v-model="gender"
              placeholder="Select gender"
              :options="status_op2"
              type="text"
            />
            <button @click="AddCustomer" type="submit" class="add-btn m"> Add customer </button>
          </va-form>
        </va-modal>
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
        ref="datatable"
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

.add-btn {
  text-decoration: none;
  font-size: medium;
  color: white;

  padding: 10px;
  margin: 10px 10px 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4285f4;
}
.add-btn:hover {
  box-shadow: 1px 2px 12px grey;
}
.add-btn:active {
  transform: scale(0.98);
  box-shadow: 1px 2px 8px grey;
}
.m{
  width: 220px;
}

</style>

<script>
import AppNav from "../components/AppNav.vue";
import SideBar from "../components/SideBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const customers = [];

    const columns = [
      { key: "id", sortable: true },
      { key: "username", sortable: true },
      { key: "phone", sortable: true },
      { key: "address", sortable: true },
      { key: "id_card", sortable: true },
      { key: "email", sortable: true },
      { key: "marital_status", sortable: true },
      { key: "gender", sortable: true },
    ];

    return {
      customers: customers,
      columns,
      filter: "",
      // filtered: customers,
      perPage: 7,
      currentPage: 1,
      
      showModal: false,
      status_op: ["S", "M"],
      status_op2: ["F", "M"],
      username:"",
      email:"",
      address:"",
      phone:"",
      id_card:"",
      marital_status: "",
      gender: "",
    };
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.customers.length / this.perPage)
        : this.customers.length;
    },
  },

  methods: {
    async AddCustomer(){
      console.log(result)
      let result = await axios.post("customers/", {
        username:this.username,
        email:this.email,
        phone:this.phone,
        address:this.address,
        id_card:this.id_card,
        marital_status: this.marital_status,
        gender: this.gender,
      }, 
      {   
        headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });

      if(result.status==201){
        this.showModal = !this.showModal;
        window.location.reload();
      }
      console.log(result)
    },

    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
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

    // console.log(this.customers.length)
  },

  components: {
    AppNav,
    SideBar,
  },
});
</script>
