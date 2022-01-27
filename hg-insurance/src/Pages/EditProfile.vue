<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <div class="top-box">
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
            class="mb-4 inputs"
            v-model="fName"
            label="First Name"
            :key="pInfoRenderKey"
          >
            <template #appendInner>
              <va-icon color="primary" name="edit" />
            </template>
          </va-input>
          <va-input
            @click-append-inner="changelName"
            v-bind:readonly="readlName"
            class="mb-4 inputs"
            v-model="lName"
            label="Last Name"
            :key="pInfoRenderKey"
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
            :key="pInfoRenderKey"
          >
            <template #appendInner>
              <va-icon color="primary" name="edit" />
            </template>
          </va-input>
          <va-select class="mb-4 h" v-model="mStatus" :options="mstatus_op" label="Marital Status" />
        </div>
        <va-button gradient @click="updateStaffInfo(user_id)" type="submit" :rounded="false" v-show="pInfo" class="p-btns">Save</va-button>

        <va-button
          v-show="false"
          class="mr-2 mb-2"
          @click="$vaToast.init(toastData)"
          id="infoToast"
        >Toast success</va-button>

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
            :rules="[(value) => {
              if (value == staffOldPass) {
                errCompare1 = true
                isError1 = true
                isDisabled = true
              }
              else {
                errCompare1 = false
                isError1 = false
                isDisabled = false
              }
            }]"
            :error="isError1"
          />

          <div v-if="errCompare1" style="text-align:left; margin-top:-18px; color:red; font-size:12px">
            <p>*Old password same as new password</p>
          </div>

          <va-input
            class="mb-4 h"
            v-model="staffConfirmPass"
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
            :rules="[(value) => {
              if (value !== staffNewPass) {
                errCompare2 = true
                isError2 = true
                isDisabled = true
              }
              else {
                errCompare2 = false
                isError2 = false
                isDisabled = false
              }
            }]"
            :error="isError2"
          />

          <div v-if="errCompare2" style="text-align:left; margin-top:-18px; color:red; font-size:12px">
            <p>*Passwords do not match</p>
          </div>
        </div>

        <va-button
          @click="updateStaffPassword(user_id)"
          type="submit"
          v-show="uPass"
          class="p-btns"
          :rounded="false"
          :disabled="isDisabled"
        >Save</va-button>
        <va-button
          v-show="false"
          class="mr-2 mb-2"
          @click="$vaToast.init(toastData)"
          id="passToast"
        >Toast success</va-button>
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
      mstatus_op: ["S", "M"],

      errCompare1: false,
      errCompare2: false,
      isError1: false,
      isError2: false,
      isDisabled: false,

      pInfoRenderKey: 0,
      toastData: {
        message: 'Updated successfully',
        color: 'primary',
        position: 'bottom-right',
        duration: 5000
      },

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
      await axios.patch(
        `staff/${id}/`,
        {
          first_name: this.fName,
          last_name: this.lName,
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
      )
        .then((response) => {
          if (response.status == 200) {
            var elem = document.getElementById('infoToast')
            elem.click()
          }
        })
        .catch((error) => {
          if (error.response) {
            this.toastData.message = "Edit personal info unsuccessful"
            this.toastData.color = "danger"
            var elem = document.getElementById('infoToast')
            elem.click()
          }
        }
        )
    },
    async updateStaffPassword(id) {
      await axios.put(
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
      )
        .then((response) => {
          if (response.status == 200) {
            var elem = document.getElementById('passToast')
            elem.click()
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            this.toastData.message = "Password update unsuccessful"
            this.toastData.color = "danger"
            var elem = document.getElementById('passToast')
            elem.click()
          }
        }
        )
    }
  },
  async mounted() {
    let user_id = localStorage.getItem("user_id");
    this.user_id = user_id;
    // console.log(this.user_id);

    let result = await axios.get(`staff/${this.user_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    this.fName = result.data.first_name
    this.lName = result.data.last_name
    this.username = result.data.username
    this.tel = result.data.phone
    this.address = result.data.address
    this.mStatus = result.data.marital_status
    console.log(result);

  },
};
</script>

<style scoped>
.inputs{
  margin: 0 10px;
}
.top-box {
  display: flex;
  text-align: center;
  border-radius: 5px 5px 0 0;
  box-shadow: 2px 3px 10px #8e8e8e;
  margin: 30px auto 0 auto;
  width: 65%;
}
.pInfo {
  width: 50%;
  color: white;
  padding: 20px;
  border-radius: 5px 0 0 0;
  cursor: pointer;
}
.pInfo:hover,.uPass:hover {
  box-shadow: 1px 1px 1px grey;
}
.uPass {
  width: 50%;
  color: white;
  padding: 20px;
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
  padding: 10px 0 10px 20px;
  justify-content: center;
}
.p-btns {
  font-size: medium;
  color: white;
  padding: 12px;
  margin: 0px 10px 10px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  width: 200px;
}
.p-btns:hover {
  box-shadow: 1px 2px 1px grey;
}
.p-btns:active {
  transform: scale(0.98);
  box-shadow: 1px 2px 8px grey;
}
</style>

