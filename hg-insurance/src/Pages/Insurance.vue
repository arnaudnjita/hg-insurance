<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <div class="box3">
        <h1 class="h1">All Insurances</h1>
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

          <button
            class="add-btn"
            @click="createInsuranceModal = !createInsuranceModal"
          >
            Create Insurance
          </button>

          <button
            class="add-btn"
            @click="createInsuranceTypeModal = !createInsuranceTypeModal"
          >
            Create Insurance Type
          </button>
        </div>

        <va-modal
          v-model="createInsuranceModal"
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
              placeholder="Select user insured"
              :options="users_insured_ops"
              searchable
            />
            <va-select
              class="mt-1"
              label="Insurance type"
              v-model="insurance_types"
              placeholder="Select insurance type"
              :options="insurance_types_ops"
            />
            <va-input
              class="mt-2"
              label="Amount"
              v-model="amount"
              placeholder=" Enter amount"
              type="number"
              :min="'0'"
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
              label="Expiry date"
              v-model="expiry_date"
              type="date"
              :min="minDate"
              cleareable
              :rules="[
                (value) => {
                  if (value < minDate) {
                    isError = true;
                    isDisabled = true;
                  } else {
                    isError = false;
                    isDisabled = false;
                  }
                },
              ]"
              :error="isError"
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
              label="Measure combat risk"
              v-model="measure_combat_risk"
              placeholder=" Enter measure combat risk"
              type="textarea"
            />
            <va-button
              @click="createInsurance()"
              :disabled="isDisabled"
              :rounded="false"
              type="submit"
              class="add-btn m"
              >Create</va-button
            >
            <va-button
              v-show="false"
              class="mr-2 mb-2"
              @click="$vaToast.init(createInsuranceToast)"
              id="createInsuranceToast"
              >Toast success</va-button
            >
          </va-form>
        </va-modal>

        <va-modal
          v-model="createInsuranceTypeModal"
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
            <va-button
              @click="createInsuranceType()"
              :rounded="false"
              type="submit"
              class="add-btn m"
              >Create</va-button
            >
            <va-button
              v-show="false"
              class="mr-2 mb-2"
              @click="$vaToast.init(createInsuranceTypeToast)"
              id="createInsuranceTypeToast"
              >Toast success</va-button
            >
          </va-form>
        </va-modal>

        <!-- Edit insurance modal-->
        <va-modal
          v-model="editInsuranceModal"
          hide-default-actions
          overlay-opacity="0.2"
          min-width="800px"
          size="large"
        >
          <va-form>
            <va-input
              class="mt-2"
              label="User insured"
              v-model="e_user_insured"
              readonly
            />
            <va-select
              class="mt-1"
              label="Insurance type"
              v-model="e_insurance_types"
              :options="insurance_types_ops"
              readonly
            />
            <va-input
              @click-append-inner="changeAmount"
              v-bind:readonly="readAmount"
              class="mt-2"
              label="Amount"
              v-model="e_amount"
              type="number"
              :min="'0'"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-input
              @click-append-inner="changeLocation"
              v-bind:readonly="readLocation"
              class="mt-2"
              label="Location"
              v-model="e_location"
              type="text"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-input
              class="mt-2"
              label="Expiry date"
              v-model="e_expiry_date"
              type="date"
              :min="minDate"
              cleareable
              :rules="[
                (value) => {
                  if (value < minDate) {
                    isError = true;
                    isDisabled = true;
                  } else {
                    isError = false;
                    isDisabled = false;
                  }
                },
              ]"
              :error="isError"
            />
            <va-input
              @click-append-inner="changeRiskSecure"
              v-bind:readonly="readRiskSecure"
              class="mt-2"
              label="Risk secure"
              v-model="e_risk_secure"
              type="text"
            >
              <template #appendInner>
                <va-icon color="primary" name="edit" />
              </template>
            </va-input>
            <va-input
              class="mt-2"
              label="Measure combat risk"
              v-model="e_measure_combat_risk"
              type="textarea"
            />

            <button
              class="p-btns"
              @click="updateInsurance(rowId)"
              type="submit"
            >
              Save
            </button>

            <va-button
              v-show="false"
              class="mr-2 mb-2"
              @click="$vaToast.init(updateInsuranceToast)"
              id="updateInsuranceToast"
              >Toast success</va-button
            >
          </va-form>
        </va-modal>

        <div class="box4">
          <va-data-table
          id="dt"
          :items="all_insurances"
          :columns="columns"
          :filter="filter"
          :filter-method="customFilteringFn"
          @filtered="filteredCount = $event.items.length"
          @row:dblclick="
            rowId = $event.item.id;
            editInsurance(rowId);
          "
          :per-page="perPage"
          :current-page="currentPage"
          clickable
          striped
          animated
          
        >
          <template #bodyAppend>
            <tr colspan="6">
              <td colspan="6" class="table-example--pagination">
                <va-pagination v-model="currentPage" input :pages="pages" />
              </td>
            </tr>
          </template>

          <template #cell(user_insured)="{ source: user_insured }">
            <p :key="tableRenderKey">{{ user_insured }}</p>
          </template>
          <template #cell(location)="{ source: location }">
            <p :key="tableRenderKey">{{ location }}</p>
          </template>
          <template #cell(insurance_types)="{ source: insurance_types }">
            <p :key="tableRenderKey">{{ insurance_types }}</p>
          </template>
          <template #cell(amount)="{ source: amount }">
            <p :key="tableRenderKey">{{ amount }}</p>
          </template>
          <template #cell(expiry_date)="{ source: expiry_date }">
            <p :key="tableRenderKey">{{ expiry_date }}</p>
          </template>
          <template #cell(created_by)="{ source: created_by }">
            <p :key="tableRenderKey">{{ created_by }}</p>
          </template>
          <template #cell(updated_by)="{ source: updated_by }">
            <p :key="tableRenderKey">{{ updated_by }}</p>
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
      { key: "user_insured", sortable: true },
      { key: "location", sortable: true },
      { key: "insurance_types", sortable: true },
      { key: "amount", sortable: true },
      { key: "expiry_date", sortable: true },
      { key: "created_by" },
      { key: "updated_by" },
    ];

    return {
      all_insurances: [],
      columns,
      filter: "",
      perPage: 6,
      currentPage: 1,
      tableRenderKey: 0,
      createInsuranceModal: false,
      createInsuranceTypeModal: false,
      editInsuranceModal: false,

      createInsuranceTypeToast: {
        message: "Insurance type created successfully",
        color: "primary",
        position: "bottom-right",
        duration: 5000,
      },
      createInsuranceToast: {
        message: "Insurance created successfully",
        color: "primary",
        position: "bottom-right",
        duration: 5000,
      },
      updateInsuranceToast: {
        message: "Updated successfully",
        color: "primary",
        position: "bottom-right",
        duration: 5000,
      },

      // select options fields
      insurance_types_ops: [],
      users_insured_ops: [],
      minDate: "",

      isError: false,
      isDisabled: false,

      //Update insurance fields
      e_user_insured: "",
      e_risk_secure: "",
      e_insurance_types: "",
      e_location: "",
      e_measure_combat_risk: "",
      e_expiry_date: "",
      e_amount: "",
      e_createdBy: "",
      e_updatedBy: "",

      //create insurance type fields
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

      //readonly values for function to edit fields
      readAmount: true,
      readLocation: true,
      readRiskSecure: true,
      readMeasureCombatRisk: true,
    };
  },

  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.all_insurances.length / this.perPage)
        : this.this.all_insurances.length;
    },
  },

  methods: {
    async getAllInsurances() {
      await axios
        .get("insurances-all/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data)
          this.all_insurances = response.data.results;
        })
        .catch();
    },

    async editInsurance(id) {
      this.editInsuranceModal = !this.editInsuranceModal;
      // console.log(items);
      await axios
        .get(`insurances/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            this.e_user_insured = response.data.user_insured;
            this.e_risk_secure = response.data.risk_secure;
            this.e_insurance_types = response.data.insurance_types;
            this.e_location = response.data.location;
            this.e_measure_combat_risk = response.data.measure_combat_risk;
            this.e_expiry_date = response.data.expiry_date;
            this.e_amount = response.data.amount;
            this.e_createdBy = response.data.createdBy;
            this.e_updatedBy = response.data.updatedBy;
          }
        });
    },

    // Function to save the insurance fields updated
    async updateInsurance(id) {
      await axios
        .patch(
          `insurances/${id}/`,
          {
            risk_secure: this.e_risk_secure,
            insurance_types: this.e_insurance_types,
            location: this.e_location,
            measure_combat_risk: this.e_measure_combat_risk,
            expiry_date: this.e_expiry_date,
            amount: this.e_amount,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            var elem = document.getElementById("updateInsuranceToast");
            elem.click();
            this.editInsuranceModal = !this.editInsuranceModal;
          }
          this.getAllInsurances();
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById("updateInsuranceToast");
            elem.click();
            this.updateInsuranceToast.message = "Update unsuccessful";
            this.updateInsuranceToast.color = "danger";
          }
        });
    },

    async createInsuranceType() {
      await axios
        .post(
          "insurances/types/",
          {
            nameType: this.it_name,
            descriptionType: this.it_description,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status == 201) {
            var elem = document.getElementById("createInsuranceTypeToast");
            elem.click();
            this.users_insured_ops = [];
            this.insurance_types_ops = [];
            this.createInsuranceData();
            this.createInsuranceTypeModal = !this.createInsuranceTypeModal;
          }
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById("createInsuranceTypeToast");
            this.createInsuranceTypeToast.message =
              "Insurance type creation unsuccessful";
            this.createInsuranceTypeToast.color = "danger";
            elem.click();
          }
        });
    },

    async createInsurance() {
      await axios
        .post(
          "insurances/",
          {
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
            },
          }
        )
        .then((response) => {
          if (response.status == 201) {
            var elem = document.getElementById("createInsuranceToast");
            elem.click();
            this.createInsuranceModal = !this.createInsuranceModal;
          }
          this.getAllInsurances();
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById("createInsuranceToast");
            this.createInsuranceToast.message =
              "Insurance creation unsuccessful";
            this.createInsuranceToast.color = "danger";
            elem.click();
          }
        });
    },

    async createInsuranceData() {
      // Get min date
      const d = new Date();
      this.minDate =
        d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate();
      console.log(this.minDate);

      // Get all insurance types
      let insurance_types = await axios.get("insurances/types/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Get all users
      let users_insured = await axios.get("customers/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Get all users insured and assign to users insured options
      let users_insured_length = users_insured.data.results.length;
      for (let i = 0; i < users_insured_length; i++) {
        this.users_insured_ops.push(users_insured.data.results[i].email);
      }
      console.log(this.users_insured_ops);

      // Get all insurance types and assign to select options
      let type_length = insurance_types.data.results.length;
      for (let i = 0; i < type_length; i++) {
        this.insurance_types_ops.push(insurance_types.data.results[i].nameType);
      }
    },

    // functions to make fields editable
    changeAmount() {
      if (this.readAmount == true) {
        this.readAmount = false;
      } else this.readAmount = true;
    },
    changeLocation() {
      if (this.readLocation == true) {
        this.readLocation = false;
      } else this.readLocation = true;
    },
    changeRiskSecure() {
      if (this.readRiskSecure == true) {
        this.readRiskSecure = false;
      } else this.readRiskSecure = true;
    },

    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
    },
  },

  async mounted() {
    this.getAllInsurances();
    this.createInsuranceData();
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
</style>
