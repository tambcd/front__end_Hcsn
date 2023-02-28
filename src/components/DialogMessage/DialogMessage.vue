<template>
  <div class="messing" ref="Close__error">
    <div class="messing__content">
      <div class="messing__body">
        <div class="content flex">
          <div class="icon__message">
            <div class="icon icon48 icon__error"></div>
          </div>
          <div class="message__title">
            <span>{{ titleMessage }}</span>
          </div>
        </div>

        <!-- btn errror -->
        <div class="footer__error flex" v-if="typeMessage === 1">
          <TheButton
            btnName="Đóng"
            class="btnError__close"
            @click="closeThisMessage()"
            btnType="2"
          />
        </div>

        <!-- btn warning -->
        <div class="footer__warning flex" v-if="typeMessage === 2">
          <TheButton
            btnName="Có"
            class="btnWarn__Yes"
            @click="deleteEmployee()"
            btnType="2"
          />
          <TheButton
            btnName="Không"
            class="btnWarn__close"
            @click="closeThisMessage()"
            btnType="1"
          />
        </div>

        <!-- btn mesage -->
        <div class="footer__mesage flex" v-if="typeMessage === 3">
          <div class="footer__right flex">
            <TheButton
              btnName="Lưu"
              class="btnWarn__Yes"
              @click="closeThisDialogAndSave()"
              btnType="2"
            />
            <TheButton
              btnName="Không lưu"
              class="btnWarn__close"
              @click="closeThisDialog()"
              btnType="1"
            />
          </div>
          <div class="footer__left">
            <TheButton
              btnName="Hủy bỏ "
              class="btnWarn__close"
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
import TheButton from "../button/TheButton.vue";
import { deleteAssets, deleteMultiAssets } from "@/api/api";
// import {Resource} from '@/resource/Resource';
export default {
  props: {
    /** kiểm tra kiểu của thông báo */
    typeMessage: Number,
    /**nội dung thông báo */
    titleMessage: String,
    /**khóa chính tài sản */
    idAsset: {
      typeof: String,
      default: "",
    },
    /**mảng khóa chính tài sản */
    listIdAsset: {
      typeof: Array,
      default: [],
    },
  },
  components: { TheButton },
  mounted() {
    /**
     * check forcus khi mở thông báo
     * Author: TVTam
     * Last Edited: 28/02/2023  *
     */
    this.$refs["Close__error"].querySelector("button").focus();
  },
  methods: {
    /**
     * đóng hộp thông báo
     * Author: TVTam
     * Last Edited: 28/02/2023  *
     */
    closeThisMessage() {
      this.$emit("ClosethisMg");
      this.emitter.emit("foucusInputError");
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
    async deleteEmployee() {
      // check nếu nhân nut xóa 1 thì data của idEmployee đc cập nhập
      if (this.idEmployyee !== "") {
        await deleteAssets(
          "Assets",
          this.idAsset,
          () => {
            // Trường hợp thành công nhận về dữ liệu thì gán lại các thông tin vào bảng
            // toaster.error(Resource.VN_DeleteSuccess),
            //     setTimeout(toaster.clear, 2000);
            // check chon nhieu
            this.emitter.emit("deleteOneSuccefull", this.idAsset);
            this.$emit("LoadingDataDelete");
          },
          (error) => {
            // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
            // toaster.error(Resource.VN_DeleteFailure);
            console.log(error);
          }
        );
      }
      // xóa nhiều thì mảng xóa đc cập nhập data
      else {
        let a = await deleteMultiAssets("Assets", this.listIdAsset, (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          // toaster.error(Resource.VN_DeleteFailure);
          console.log(error);
        });
        if (a) {
          // toaster.error(Resource.VN_DeleteSuccess);
          // chuyền thông báó xóa thành công để clear mảng xóa nhiều
          this.emitter.emit("deleteSuccefull");
          this.$emit("LoadingDataDelete");
        }
      }
    },
  },
};
</script>

<style scoped>
</style>