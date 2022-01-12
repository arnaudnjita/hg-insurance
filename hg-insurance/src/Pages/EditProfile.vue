<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">My profile</h1>
      <div style="width: 250px; padding: 10px 0 10px 20px">
        <va-input
          readonly="true"
          class="mb-4 inputs"
          v-model="username"
          label="Name"
        />
        <!-- Ability to edit customers data in the customers table, Edit personal information of users in the profile page, added a welcome message to the user in the navbar.  -->
        <va-input
          @click-append-inner="changeTel"
          v-bind:readonly="readTel"
          class="mb-4 inputs"
          v-model="tel"
          label="Phone"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
        <va-input
          @click-append-inner="changeAddress"
          v-bind:readonly="readAddress"
          class="mb-4 inputs"
          v-model="address"
          label="Address"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
        <va-input
          @click-append-inner="changeStatus"
          v-bind:readonly="readStatus"
          class="mb-4 h"
          v-model="mStatus"
          label="Marital Status"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
      </div>
      <button @click="updateStaff(user_id)" type="submit" class="p-btns">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppNav from "../components/AppNav.vue";
import SideBar from "../components/SideBar.vue";

export default {
  data() {
    return {
      username: "",
      tel: "",
      address: "",
      mStatus: "",
      user_id: "",
      
      readTel: true,
      readAddress: true,
      readStatus: true,
    };
  },
  components: {
    AppNav,
    SideBar,
  },
  methods: {
    changeUsername() {
      if (this.readUsername == true) {
        this.readUsername = false;
      } else this.readUsername = true;
    },
    changeTel() {
      if (this.readTel == true) {
        this.readTel = false;
      } else this.readTel = true;
    },
    changeAddress() {
      if (this.readAddress == true) {
        this.readAddress = false;
      } else this.readAddress = true;
    },
    changeStatus() {
      if (this.readStatus == true) {
        this.readStatus = false;
      } else this.readStatus = true;
    },

    async updateStaff(id) {
      let result = await axios.patch(
        `staff/${id}/`,
        {
          username: this.username,
          id_card: this.id_card,
          marital_status: this.mStatus,
          phone: this.phone,
          address: this.address,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (result.status == 200) {
        window.location.reload();
      }
    },
  },
  async mounted() {
    let user_id = localStorage.getItem("user_id");
    this.user_id = user_id;
    console.log(this.user_id);

    // let result = await axios.get(`customer/${this.user_id}`,
    let result = await axios.get(`staff/${this.user_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    this.username = result.data.username
    this.tel = result.data.phone
    this.address = result.data.address
    this.mStatus = result.data.marital_status
    console.log(result);

  },
};
</script>

<style>
.h1 {
  display: inline;
}
.p-btns {
  font-size: medium;
  color: white;
  padding: 10px;
  margin: 0px 10px 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4285f4;
  width: 200px;
}
.p-btns:hover {
  box-shadow: 1px 2px 12px grey;
}
.p-btns:active {
  transform: scale(0.98);
  box-shadow: 1px 2px 8px grey;
}
</style>

