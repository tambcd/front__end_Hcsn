<template>
  <div class="messing" ref="Close-error" tabindex="0" @keyup.esc="closeThisMessage()">
    <div class="messing-content">
      <div class="messing-body">
        <div class="content flex">
          <div class="icon-message">
              <div class="icon icon48 icon-error"></div>
          </div>
          <div class="message-title">
            <span :class="{'highligh': typeHighligh==1}">{{ titleMessageheader}}</span>
             <span  :class="{'highligh': typeHighligh==2}"> {{ titleMessage }}</span>
              <span :class="{'highligh': typeHighligh==3}">{{titleMessagebottom}}</span>
          </div>
        </div>

        <!-- btn errror -->
        <div class="footer-error flex" v-if="typeMessage === 1">
          <TheButton
            btnName="Đóng"
            class="btnError-close"
            @click="closeThisMessage()"
            btnType="2"
          />
        </div>

        <!-- btn warning -->
        <div class="footer-warning flex" v-if="typeMessage === 2">
          <TheButton
            :btnName="titleBtnYes"
            class="btnWarn-Yes"
            @click="btnYes()"
            btnType="2"
          />
          <TheButton
            :btnName="titleBtnNo"
            class="btnWarn-close"
            @click="closeThisMessage()"
            btnType="1"
          />
        </div>

        <!-- btn mesage -->
        <div class="footer-mesage flex" v-if="typeMessage === 3">
          <TheButton
            btnName="Lưu"
            class="btnWarn-Yes"
            @click="btnYesUpdate()"
            btnType="2"
          />
          <TheButton
            btnName="Không lưu"
            class="btnWarn-close"
            @click="btnYes()"
            btnType="1"
          />
          <TheButton
            btnName="Hủy bỏ"
            class="btnWarn-close"
            @click="closeThisMessage()"
            btnType="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from "../button/BaseButton.vue";

export default {
  name: "DialogMessage",
  props: {
    /** kiểm tra kiểu của thông báo */
    typeMessage: Number,
    typeHighligh:{
      default:4
    },
    /**nội dung thông báo */
    titleMessage: String,
    titleMessageheader: String,
    titleMessagebottom: String,
    titleBtnYes: {
      default: "Có",
    },
    titleBtnNo: {
      default: "không",
    },

    /**mảng khóa chính tài sản */
    listIdAsset: {
      typeof: Set,
      default: null,
    },
  },
  components: { TheButton },
  mounted() {
    /**
     * check forcus khi mở thông báo
     * Author: TVTam
     * Last Edited: 28/02/2023 *
     */
    this.$refs["Close-error"].querySelector("button").focus();
  },
  methods: {
    /**
     * đóng hộp thông báo
     * Author: TVTam
     * Last Edited: 28/02/2023  *
     */
    closeThisMessage() {
      this.$emit("hideMessage");
    },
    /**
     * Author: TVTam
     * Last Edited: 28/02/2023
     * đóng form nhập liệu nhân viên
     */
    closeThisDialog() {
      this.$emit("ClosethiDl");
    },
    /**
     * đóng hộp thông báo và thực hiện cất dữ liêu
     * Author: TVTam
     * Last Edited: 28/02/2023
     */
    closeThisDialogAndSave() {
      this.$emit("CloseThisDialogAndSave");
    },
    /**
     * đống ý
     * Author: TVTam
     * Last Edited: 28/02/2023
     */
    btnYes() {
      this.$emit("btnYesMessage");
    },
    /**
     * đống ý sửa
     * Author: TVTam
     * Last Edited: 28/02/2023
     */
    btnYesUpdate() {
      this.$emit("btnYesMessageUpdate");
    },
  },
};
</script>

<style scoped>
.highligh{
  font-weight: 700;
}
</style>