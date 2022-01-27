<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <div class="box3">
      <h1 class="h1">All Customers</h1>
      <div class="row" >
          <va-input
          class="flex mb-2 md2 va-input"
          label="Filter"
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

        <va-button gradient :rounded="false" class="add-btn" @click="addCustomerModal = !addCustomerModal">Add customer</va-button>
        </div>

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
            <va-button gradient :rounded="false" @click="AddCustomer" type="submit" class="add-btn m">Add customer</va-button>

            <va-button
              v-show="false"
              class="mr-2 mb-2"
              @click="$vaToast.init(addToast)"
              id="addToast"
            >Toast success</va-button>
          </va-form>
        </va-modal>

        <va-modal
          v-model="editCustomerModal"
          hide-default-actions
          overlay-opacity="0.2"
          min-width="800px"
          size="large"
        >
          <va-form
            style="text-align: center"
            tag="form"
            @submit.prevent="handleSubmit">

            <h1 style="margin: 20px 0">Edit Customer</h1>

            <va-input readonly="true" class="mb-4 inputs" v-model="e_username" label="Username" />
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

            <va-button gradient :rounded="false" 
              class="p-btns"
              @click="updateCustomer(rowId)" 
              type="submit" 
            >Save</va-button>

            <va-button
              v-show="false"
              class="mr-2 mb-2"
              @click="$vaToast.init(updateToast)"
              id="updateToast"
            >Toast success</va-button>
          </va-form>
        </va-modal>
      <div class="box4">
      <va-data-table
        id="dt"
        :items="customers"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
        @row:dblclick="rowId = $event.item.id; editCustomer(rowId)"
        :per-page="perPage"
        :current-page="currentPage"
        clickable
        striped
      >
        <!-- <template #bodyAppend>
          <tr>
            <td colspan="8" class="table-example--pagination">
              <va-pagination style="margin-left: 20px;" v-model="currentPage" input :pages="pages" :rounded="false" />
            </td>
          </tr>
        </template> -->

        <!-- <template #cell(Edit)>
          <va-chip>Edit</va-chip>
        </template> -->
        <template #cell(address)="{ source: address }">
          <p :key="tableRenderKey">{{ address }}</p>
        </template>
        <template #cell(username)="{ source: username }">
          <p :key="tableRenderKey">{{ username }}</p>
        </template>
        <template #cell(email)="{ source: email }">
          <p :key="tableRenderKey">{{ email }}</p>
        </template>
        <template #cell(phone)="{ source: phone }">
          <p :key="tableRenderKey">{{ phone }}</p>
        </template>
        <template #cell(id_card)="{ source: id_card }">
          <p :key="tableRenderKey">{{ id_card }}</p>
        </template>
        <template #cell(marital_status)="{ source: marital_status }">
          <p :key="tableRenderKey">{{ marital_status }}</p>
        </template>
      </va-data-table>
      </div>
      <va-pagination style="margin-left: 20px;" v-model="currentPage" input :pages="pages" :rounded="false" />
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
    // const customers = [];

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
      // { key: "Edit" },

    ];

    return {
      customers: [],
      columns,
      filter: "",
      perPage: 6,
      currentPage: 1,
      tableRenderKey: 0,
      updateToast: {
        message: 'Updated successfully',
        color: 'primary',
        position: 'bottom-right',
        duration: 5000
      },
      addToast: {
        message: 'Customer added successfully',
        color: 'primary',
        position: 'bottom-right',
        duration: 5000
      },
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
      // console.log(items)
      this.editCustomerModal = !this.editCustomerModal

      let result = await axios.get(`customer/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // console.log(result.data)

      this.e_username = result.data.username
      this.e_email = result.data.email
      this.e_tel = result.data.phone
      this.e_idcard = result.data.id_card
      this.e_address = result.data.address
      this.e_mStatus = result.data.marital_status

    },
    async updateCustomer(id) {
      await axios.patch(`customer/${id}/`,
        {
          phone: this.e_tel,
          id_card: this.e_idcard,
          address: this.e_address,
          marital_status: this.e_mStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            var elem = document.getElementById('updateToast')
            elem.click()
            this.loadCustomers()
            this.editCustomerModal = !this.editCustomerModal;
          }
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById('updateToast')
            elem.click()
            this.updateToast.message = "Update unsuccessful"
            this.updateToast.color = "danger"
          }
        }
        )

    },
    async AddCustomer() {
      await axios.post("register/", {
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
        })
      .then((response) => {
          if (response.status == 201) {
            var elem = document.getElementById('addToast')
            elem.click()
            this.addCustomerModal = !this.addCustomerModal;
          }
          this.loadCustomers() 
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById('addToast')
            elem.click()
            this.addToast.message = "Edit customer unsuccessful"
            this.addToast.color = "danger"
          }
        }
        )
    },

    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
    },

    // Make fields editable
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

    // Get all customers
    async loadCustomers() {
      await axios.get("customers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
    // Sorts customers indescending order and assigns
        let all_customers = response.data.results
        all_customers.sort((a,b) => {
          return b.id - a.id
          })
        console.log(all_customers);
        this.customers = all_customers;
      })      
    }
  },

  mounted() {
    this.loadCustomers()
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
  height: 73vh;
  border-radius: 5px;
  box-shadow: 2px 2px 12px #8e8e8e;
  padding: 30px 10px;
  width: 100%;
  overflow-y: hidden;
}
.box4 {
  overflow-y: auto; 
  height:41vh; 
  margin-bottom:10px;
  margin-left: 20px;
  margin-right: 20px;
}
.row {
  margin-left: 20px;
  display: flex;
  flex-direction: row;
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
  padding: 12px 12px;
  margin: 10px 20px 10px auto;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4285f4;
}
.add-btn:hover {
  box-shadow: 2px 2px 5px grey;
}
.add-btn:active {
  transform: scale(0.98);
  box-shadow: 2px 2px 5px grey;
}
.m {
  width: 220px;
}
</style>