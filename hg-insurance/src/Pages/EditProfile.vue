<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <div
        class="top-box"
      >
        <div
          @click="switchPInfo()"
          class="pInfo"
          :style="{ backgroundColor: bgInActive }"
        >Personal info</div>
        <div
          @click="switchUPass()"
          class="uPass"
          :style="{ backgroundColor: bgActive }"
        >Update password</div>
      </div>
      <div class="main-box">
        <div class="edit-box" v-show="pInfo">
          <va-input
            @click-append-inner="changefName"
            v-bind:readonly="readfName"
            class="mb-4 h"
            v-model="fname"
            label="First Name"
          >
            <template #appendInner>
              <va-icon color="primary" name="edit" />
            </template>
          </va-input>
          <va-input
            @click-append-inner="changelName"
            v-bind:readonly="readlName"
            class="mb-4 h"
            v-model="lname"
            label="Last Name"
          >
            <template #appendInner>
              <va-icon color="primary" name="edit" />
            </template>
          </va-input>
          <va-input readonly="true" class="mb-4 inputs" v-model="username" label="username" />
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
        <button @click="updateStaffInfo(user_id)" type="submit" v-show="pInfo" class="p-btns">Save</button>

        <div class="edit-box" style="grid-template-columns:auto;" v-show="uPass">
          <va-input
            class="mb-4 h"
            v-model="staffOldPass"
            label="Old Password"
            type="password"
            placeholder="Enter old password"
          />
          <va-input
            class="mb-4 h"
            v-model="staffNewPass"
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <va-input
            class="mb-4 h"
            v-model="staffConfirmPass"
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
            :rules="[value => value === staffNewPass || 'Passwords do not match']"
          />
        </div>
        <button @click="updateStaffPassword(user_id)" type="submit" v-show="uPass" class="p-btns">Save</button>
      </div>
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
      lName: "",
      fName: "",

      staffOldPass: "",
      staffNewPass: "",
      staffConfirmPass: "",

      user_id: "",
      pInfo: true, /* personal info tab active value*/
      uPass: false, /* password update tab active value*/

      bgActive: "#6599f4",
      bgInActive: "#4285f5",

      readTel: true,
      readAddress: true,
      readStatus: true,
      readfName: true,
      readlName: true,
    };
  },
  components: {
    AppNav,
    SideBar,
  },
  methods: {
    switchPInfo() {
      if (this.pInfo == true) { return }
      else {
        this.pInfo = !this.pInfo
        this.uPass = !this.uPass
        this.bgInActive = "#4285f5"
        this.bgActive = "#6599f4"
      }
    },
    switchUPass() {
      if (this.uPass == true) { return }
      else {
        this.pInfo = !this.pInfo
        this.uPass = !this.uPass
        this.bgActive = "#4285f5"
        this.bgInActive = "#6599f4"
      }
    },
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
    changefName() {
      if (this.readfName == true) {
        this.readfName = false;
      } else this.readfName = true;
    },
    changelName() {
      if (this.readlName == true) {
        this.readlName = false;
      } else this.readlName = true;
    },
    async updateStaffInfo(id) {
      let result = await axios.patch(
        `staff/${id}/`,
        {
          username: this.username,
          id_card: this.id_card,
          marital_status: this.mStatus,
          phone: this.tel,
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
    async updateStaffPassword(id) {
      let result = await axios.put(
        `change_password/${id}/`,
        {
          old_password: this.staffOldPass,
          password: this.staffNewPass,
          password2: this.staffConfirmPass
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (result.status == 200) {
        alert("password updated successfully")
      }
    }
  },
  async mounted() {
    let user_id = localStorage.getItem("user_id");
    this.user_id = user_id;
    console.log(this.user_id);

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
.top-box{
  display:flex; text-align: center;
  border-radius: 5px 5px 0 0;
  box-shadow: 2px 3px 10px #8e8e8e;
  margin: 30px auto 0 auto;
  width: 65%;
}
.pInfo {
  width: 50%;
  color: white;
  padding: 15px;
  border-radius: 5px 0 0 0;
  cursor: pointer;
}
.uPass {
  width: 50%;
  color: white;
  padding: 15px;
  border-radius: 0 5px 0 0;
  cursor: pointer;
}
.main-box {
  text-align: center;
  padding: 30px 50px;
  border-radius: 0 0 5px 5px;
  box-shadow: 2px 3px 10px #8e8e8e;
  background-color: white;
  margin: 0 auto 50px auto;
  width: 65%;
}
.edit-box {
  display: grid;
  grid-template-columns: auto auto;
  /* width: 100%; */
  padding: 10px 0 10px 20px;
  justify-content: center;
}
.h1 {
  text-align: center;
  display: inline;
}
.p-btns {
  font-size: medium;
  color: white;
  padding: 10px;
  margin: 0px 10px 10px 10px;
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

