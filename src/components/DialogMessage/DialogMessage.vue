<template>
  <div class="messing" ref="Close-error">
    <div class="messing-content">
      <div class="messing-body">
        <div class="content flex">
          <div class="icon-message">
            <div class="icon icon48 icon-error"></div>
          </div>
          <div class="message-title">
            <span>{{ titleMessage }}</span>
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
            btnName="Có"
            class="btnWarn-Yes"
            @click="deleteAssets()"
            btnType="2"
          />
          <TheButton
            btnName="Không"
            class="btnWarn-close"
            @click="closeThisMessage()"
            btnType="1"
          />
        </div>

        <!-- btn mesage -->
        <div class="footer-mesage flex" v-if="typeMessage === 3">
          <div class="footer-right flex">
            <TheButton
              btnName="Lưu"
              class="btnWarn-Yes"
              @click="closeThisDialogAndSave()"
              btnType="2"
            />
            <TheButton
              btnName="Không lưu"
              class="btnWarn-close"
              @click="closeThisDialog()"
              btnType="1"
            />
          </div>
          <div class="footer-left">
            <TheButton
              btnName="Hủy bỏ "
              class="btnWarn-close"
              @click="closeThisMessage()"
              btnType="1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from "../button/BaseButton.vue";
import { deleteMultiAssets } from "@/api/api";
import { Resource } from "@/resource/Resource";
import { toast } from "vue3-toastify";

export default {
  props: {
    /** kiểm tra kiểu của thông báo */
    typeMessage: Number,
    /**nội dung thông báo */
    titleMessage: String,

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
     * Last Edited: 28/02/2023  *
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
      this.$emit("deleteSuccefull");
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
     * thực hiện xóa và xóa nhiều
     * Author: TVTam
     * Last Edited: 28/02/2023
     */
    async deleteAssets() {
      try {
        // xóa nhiều thì mảng xóa đc cập nhập data
        let a = await deleteMultiAssets(
          "Assets",
          Array.from(this.listIdAsset),
          (error) => {
            // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
            toast.error(Resource.VN_DeleteFailure, {
              autoClose: 2000,
              position: "bottom-right",
            });
            console.log(error);
          }
        );
        if (a) {
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          // chuyền thông báó xóa thành công để clear mảng xóa nhiều
          this.emitter.emit("LoadingDataDelete");
          this.$emit("deleteSuccefull");
        }
      } catch (error) {
        toast.error(Resource.VN_DeleteEmpty, {
          autoClose: 2000,
          position: "bottom-right",
        });
        console.log(error);
        this.$emit("deleteSuccefull");
      }
        
      
    },
  },
};
</script>

<style scoped>
</style>