<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">All Customers</h1>
      <div class="row">
        <va-input class="flex mb-2 md4 va-input" label="Filter" placeholder="Filter..." v-model="filter" />

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

        <button class="add-btn" @click="addCustomerModal = !addCustomerModal">Add customer</button>

        <va-modal
          v-model="addCustomerModal"
          hide-default-actions
          overlay-opacity="0.2"
          min-width="800px"
          size="large"
        >
          <va-form style="text-align: center" tag="form" @submit.prevent="handleSubmit">
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
              label="Password"
              v-model="password"
              placeholder=" Enter Password"
              type="password"
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
            <button @click="AddCustomer" type="submit" class="add-btn m">Add customer</button>
          </va-form>
        </va-modal>

        <va-modal
          v-model="editCustomerModal"
          hide-default-actions
          overlay-opacity="0.2"
          min-width="800px"
          size="large"
          @close="hey"
        >
          <va-form>
            <va-input
              readonly="true"
              class="mb-4 inputs"
              v-model="e_username"
              label="Username"
            />
            <va-input v-bind:readonly="true" class="mb-4 inputs" v-model="e_email" label="Email" />
            <va-input
              @click-append-inner="changeTel"
              v-bind:readonly="readTel"
              class="mb-4 inputs"
              v-model="e_tel"
              label="Phone"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-input
              @click-append-inner="changeIdcard"
              v-bind:readonly="readIdcard"
              class="mb-4 inputs"
              v-model="e_idcard"
              label="Id Card No"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-input
              @click-append-inner="changeAddress"
              v-bind:readonly="readAddress"
              class="mb-4 inputs"
              v-model="e_address"
              label="Address"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-select
              v-bind:readonly="true"
              class="mb-4 h"
              v-model="e_mStatus"
              :options="e_status_op"
              label="Marital Status"
            />

            <button @click="updateCustomer(rowId)" type="submit" class="p-btns">Save</button>
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
        @row:click="rowId = $event.item.id; editCustomer(rowId)"
        :per-page="perPage"
        :current-page="currentPage"
        ref="datatable"
        clickable
        striped
      >
        <template #bodyAppend>
          <tr>
            <td colspan="8" class="table-example--pagination">
              <va-pagination v-model="currentPage" input :pages="pages" />
            </td>
          </tr>
        </template>
        <template #cell(Edit)>
          <va-chip>Edit</va-chip>
        </template>
      </va-data-table>
      <!-- <p v-if="rowId">row id = {{ rowId }}</p> -->
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
    const customers = [];

    const columns = [
      { key: "username", sortable: true, label: "Username" },
      { key: "phone", sortable: true, label: "Tel No" },
      { key: "address", sortable: true, label: "Address" },
      { key: "id_card", sortable: true, label: "ID Card No" },
      { key: "email", sortable: true, label: "Email" },
      { key: "marital_status", label: "Status", sortable: true },
      { key: "gender", sortable: true, label: "Gender" },
      { key: "created_by" },
      { key: "updated_by" },
      { key: "Edit" }
    ];

    return {
      customers: customers,
      columns,
      filter: "",
      // filtered: customers,
      perPage: 5,
      currentPage: 1,
      rowId: "",

      addCustomerModal: false,
      editCustomerModal: false,

      status_op: ["S", "M"],
      status_op2: ["F", "M"],
      e_status_op: ["S", "M"],
      username: "",
      email: "",
      address: "",
      password: "",
      phone: "",
      id_card: "",
      marital_status: "",
      gender: "",

      e_username: "",
      e_tel: "",
      e_address: "",
      e_mStatus: "",
      e_email: "",
      e_idcard: "",

      readTel: true,
      readAddress: true,
      readStatus: true,
      readIdcard: true,

    };
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.customers.length / this.perPage)
        : this.customers.length;
    }
  },

  methods: {
    async editCustomer(id) {
      this.editCustomerModal = !this.editCustomerModal
      // let rowId = this.rowId

      let result = await axios.get(`customer/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(result.data)

      this.e_username = result.data.username
      this.e_email = result.data.email
      this.e_tel = result.data.phone
      this.e_idcard = result.data.id_card
      this.e_address = result.data.address
      this.e_mStatus = result.data.marital_status

    },
    async updateCustomer(id) {
      let result = await axios.patch(`customer/${id}/`,
        {
          username: this.e_username,
          email: this.e_email,
          phone: this.e_tel,
          id_card: this.e_idcard,
          address: this.e_address,
          marital_status: this.e_mStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (result.status == 200) {
        window.location.reload();
      }
      console.log(result.data)

    },
    async AddCustomer() {
      console.log(result)
      let result = await axios.post("register/", {
        username: this.username,
        email: this.email,
        phone: this.phone,
        address: this.address,
        id_card: this.id_card,
        marital_status: this.marital_status,
        gender: this.gender,
        password: this.password
      },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });

      if (result.status == 201) {
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

    // changeUsername() {
    //   if (this.readUsername == true) {
    //     this.readUsername = false;
    //   } else this.readUsername = true;
    // },
    changeTel() {
      if (this.readTel == true) {
        this.readTel = false;
      } else this.readTel = true;
    },
    changeIdcard() {
      if (this.readIdcard == true) {
        this.readIdcard = false;
      } else this.readIdcard = true;
    },
    changeAddress() {
      if (this.readAddress == true) {
        this.readAddress = false;
      } else this.readAddress = true;
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
.m {
  width: 220px;
}
</style>