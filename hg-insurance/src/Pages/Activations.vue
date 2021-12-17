<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1 class="h1">All Activations</h1>
      <button class="f-btns" @click="allActivations">All activations</button>
      <button class="f-btns" @click="activeActivations">Active activations</button>
      <button class="f-btns" @click="expiredActivations">Expired activations</button>
      <div class="row">
        <va-input
          class="flex mb-2 md6"
          placeholder="Filter..."
          v-model="filter"
        />
      </div>
      <va-data-table
        class="dt"
        :items="all_activations"
        :columns="columns"
        :filter="filter"
        :filter-method="customFilteringFn"
        @filtered="filteredCount = $event.items.length"
      />
    </div>
  </div>
</template>

<style>
.f-btns{
  padding: 10px;
  margin: 10px 10px 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #ff7e1b;
}
.dt, .row, .h1{
  margin-left: 20px;
}
</style>

<script>
  import AppNav from '../components/AppNav.vue'
  import SideBar from '../components/SideBar.vue'
  import axios from "axios";
  import { defineComponent } from 'vue'

  export default defineComponent ({
    data() {
      const columns = [
        // { key: '#', sortable: true },
        { key: 'user_insured', sortable: true },
        { key: 'username', sortable: true },
        { key: 'location', sortable: true },
        { key: 'insurance_types', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'expiry_date', sortable: true },
      ]

      return {
        all_activations: [],
        active: [],
        expired: [],
        columns,
        filter: '',
        useCustomFilteringFn: false,
      }
    },

    async mounted() {
    let active = await axios.get('active-activations', {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    console.log(active.data);
    this.active = active.data.results;

    let expired = await axios.get('expired-activations', {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    console.log(expired.data);
    this.expired = expired.data.results;

    this.all_activations = this.expired.concat(this.active)
    console.log(this.all_activations)
    
    },

    methods: {
      allActivations() {
        this.all_activations = this.expired.concat(this.active)
      },
      activeActivations() {
        this.all_activations = this.active
      },
      expiredActivations() {
        this.all_activations = this.expired
      }
    },

    components: {
      AppNav,   
      SideBar
    } 
  })

</script>

