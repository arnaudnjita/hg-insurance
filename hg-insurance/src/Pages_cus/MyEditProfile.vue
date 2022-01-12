<template>
  <div class="container">
    <div class="box-1">
      <SideBarCus></SideBarCus>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">My profile</h1>
      <div style="width: 250px; padding: 10px 0 10px 20px">
        <va-input
          @click-append-inner="change"
          v-bind:readonly="read"
          class="mb-4 inputs"
          v-model="username"
          label="Name"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
        <va-input
          @click-append-inner="change"
          v-bind:readonly="read"
          class="mb-4 inputs"
          v-model="tel"
          label="Phone"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
        <va-input
          @click-append-inner="change"
          v-bind:readonly="address"
          class="mb-4 inputs"
          v-model="address"
          label="Address"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
        <va-input
          @click-append-inner="change"
          v-bind:readonly="read"
          class="mb-4 h"
          v-model="mStatus"
          label="Marital Status"
        >
          <template #appendInner>
            <va-icon color="primary" name="edit" />
          </template>
        </va-input>
      </div>
      <button @click="saveMe" type="submit" class="p-btns">Save</button>
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios'
  import AppNav from '../components/AppNav.vue'
  import SideBarCus from '../components_cus/SideBarCus.vue'

  export default {
    data() {
      return {
        username: "",
      tel: "",
      address: "",
      mStatus: "",
      read: true,
      user_id: "",
      }
    },
    components: {
      AppNav,   
      SideBarCus
    },
    methods: {
    change() {
      if (this.read == true) {
        this.read = false;
      } else this.read = true;
    },

    async saveMe() {
      await axios.patch(
        `customer/${this.user_id}`,
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
    },
  },
  async mounted() {
    let user_id = localStorage.getItem("user_id");
    this.user_id = user_id;
    console.log(this.user_id);

    let result = await axios.get(`customer/${this.user_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(result);
  },
    
  }

</script>

