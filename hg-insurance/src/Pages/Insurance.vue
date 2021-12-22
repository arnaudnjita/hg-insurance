<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">All Insurances</h1>
      <!-- <div class="big-div"> -->

      <va-modal
        v-model="showModal"
        v-if="showModal == 'ci'"
        hide-default-actions
        overlay-opacity="0.2"
        size="large"
      >
        <va-form
          style="text-align: center"
          tag="form"
          @submit.prevent="handleSubmit"
        >
          <h1 style="margin: 20px 0">Create Insurance</h1>
          <va-select
            class="mt-2"
            label="User insured"
            v-model="user_insured"
            placeholder=" Select user insured"
            :options="users_insured_ops"
          />
          <va-input
            class="mt-2"
            label="Risk secure"
            v-model="risk_secure"
            placeholder=" Enter risk secure"
            type="text"
          />
          <va-input
            class="mt-2"
            label="Location"
            v-model="location"
            placeholder=" Enter location"
            type="text"
          />
          <va-input
            class="mt-2"
            label="Measure combat risk"
            v-model="measure_combat_risk"
            placeholder=" Enter measure combat risk"
            type="text"
          />
          <va-input
            class="mt-2"
            label="Expiry date"
            v-model="expiry_date"
            placeholder=" Enter expiry date"
            type="date"
          />
          <va-input
            class="mt-2"
            label="Amount"
            v-model="amount"
            placeholder=" Enter amount"
            type="number"
          />
          <va-select
            class="mt-1"
            label="Insurance type"
            v-model="insurance_types"
            placeholder="Select insurance type"
            :options="insurance_types_ops"
          />
          <button @click="createInsurance" type="submit" class="add-btn m">
            Create
          </button>
        </va-form>
      </va-modal>

      <va-modal
        v-model="showModal"
        v-if="showModal == 'cit'"
        hide-default-actions
        overlay-opacity="0.2"
        size="large"
      >
        <va-form
          style="text-align: center"
          tag="form"
          @submit.prevent="handleSubmit"
        >
          <h1 style="margin: 20px 0">Create Insurance Type</h1>

          <va-input
            class="mt-2"
            label="Insurance Type Name"
            v-model="it_name"
            placeholder=" Enter type name"
            type="text"
          />
          <va-input
            class="mb-4"
            v-model="it_description"
            type="textarea"
            label="Type Description"
            placeholder="Enter the description here"
            :min-rows="2"
            :max-rows="4"
            autosize
          />
          <button @click="createInsuranceType" type="submit" class="add-btn m">
            Create
          </button>
        </va-form>
      </va-modal>

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

        <button class="add-btn" @click="showModal = 'ci'">
          Create Insurance
        </button>

        <button class="add-btn" @click="showModal = 'cit'">
          Create Insurance Type
        </button>

        <!-- <button class="f-btns all" @click="allActivations">
          All activations
        </button>
        <button class="f-btns act" @click="activeActivations">
          Active activations
        </button>
        <button class="f-btns exp" @click="expiredActivations">
          Expired activations
        </button> -->
        <!-- </div> -->
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
            <tr colspan="8">
              <td colspan="8" class="table-example--pagination">
                <va-pagination v-model="currentPage" input :pages="pages" />
              </td>
            </tr>
          </template>
        </va-data-table>
      </div>
    </div>
  </div>
</template>

<style>
/* .big-div{
  display: grid;
  grid-template-columns: auto auto;
} */
/* .f-btns {
  padding: 10px;
  margin: 10px 10px 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #ff7e1b;
} */
/* .act {
  background-color: #4285f5;
}
.exp {
  background-color: #2abbac;
} */
/* .dt,
.row {
  margin-left: 20px;
}

.h1 {
  margin: 0 0 10px 20px;
}
.va-input {
  margin: 10px 20px 10px 0;
} */
.add-btn{
  width: 210px;
  padding: 15px 0;
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

      // select options fields
      insurance_types_ops: [],
      users_insured_ops: [],

      //create insurance type fields
      showModal: null,
      it_name: "",
      it_description: "",

      //create insurance fields
      user_insured: "",
      risk_secure: "",
      insurance_types: "",
      location: "",
      measure_combat_risk: "",
      expiry_date: "",
      amount: "",
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

    // Get all insurances
    let i_types = await axios.get("insurances/types/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })

    // Get all users
    let users_insured = await axios.get("customers/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })

    // Get all users insured and assign to users insured options
    let users_insured_length = users_insured.data.results.length
    for(let i = 0; i < users_insured_length; i++){
        this.users_insured_ops.push(users_insured.data.results[i].email)
    } 
    console.log(this.users_insured_ops)

    // Get all insurance types and assign to select options
    let type_length = i_types.data.results.length
    for(let i = 0; i < type_length; i++){
        this.insurance_types_ops.push(i_types.data.results[i].nameType)
    } 
    console.log(this.insurance_types_ops)
    
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.all_activations.length / this.perPage)
        : this.this.all_activations.length;
    },
  },

  methods: {
    async createInsuranceType() {
      let result = await axios.post("insurances/types/", {
        nameType: this.it_name,
        descriptionType: this.it_description,
      },
      {   
        headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });

      if(result.status==201){
        this.showModal = null;
      }
      console.log(result);
    },

    async createInsurance() {
      let result = await axios.post("insurances/", {
        user_insured: this.user_insured,
        risk_secure: this.risk_secure,
        insurance_types: this.insurance_types,
        location: this.location,
        measure_combat_risk: this.measure_combat_risk,
        expiry_date: this.expiry_date,
        amount: this.amount,

      },
      {   
        headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })

      if(result.status==201){
        this.showModal = null;
      }
      console.log(result);
    },
    // allActivations() {
    //   this.all_activations = this.expired.concat(this.active);
    // },

    // activeActivations() {
    //   this.all_activations = this.active;
    // },

    // expiredActivations() {
    //   this.all_activations = this.expired;
    // },

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
