<template>
  <div class="toolbar">
    <div class="toolbar-filter">
      <the-input
        heightInput="35"
        widthInput="179"
        :iconLeft="true"
        contentInput="Tìm kiếm tài sản..."
      />

      <the-combobox
        dataShow="fixed_asset_category_name"
        :DataCombobox="assetCategorys"
        keyData="fixed_asset_category_id"
        contentComboxbox="Loại tài sản"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />

      <the-combobox
        dataShow="department_name"
        :DataCombobox="departments"
        keyData="department_id"
        contentComboxbox="Bộ phận sử dụng"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />
    </div>

    <div class="toolbar-action">
      <button class="btn-add button" @click="ShowDialog">+ Thêm tài sản</button>
      <button
        class="btn-export icon36 button-icon backgrsvg"
        @click="Export()"
      ></button>
      <button class="btn__delete icon36 button-icon backgrsvg" @click="DeleteAssets()"></button>
    </div>
  </div>
  <div class="table">
    <data-table  @updateListId = updateListIdDelete />
  </div>
  <dialog-message
    :listIdAsset="listIdDelete"
    :typeMessage="2"
    titleMessage="bạn có muốn xóa không ?"
    v-show="isMessageDelete"
    @deleteSuccefull = ReLoadingDataDelete
  />
</template>

<script>
import DataTable from "@/components/table/DataTable.vue";
import TheInput from "@/components/input/BaseInput.vue";
import TheCombobox from "@/components/combobox/BaseCombobox.vue";
import { get } from "@/api/api.js";
import Resource from "@/resource/Resource";
import DialogMessage from "@/components/DialogMessage/DialogMessage.vue";
import { toast } from "vue3-toastify";

export default {
  components: { DataTable, TheInput, TheCombobox, DialogMessage },
  async created() {
    /**
     * Author: TVTam
     * created : tvTam (22/02/2023)
     * Lấy dữ liệu phòng ban
     */
    await get(
      "Departments",
      (response) => {
        // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
        this.departments = response.data;
      },
      () => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
            autoClose: 2000,position :'bottom-right'
          });
      }
    );
    /**
     * Author: TVTam
     * created : tvTam (22/02/2023)
     * Lấy dữ liệu loại tài sản
     */
    await get(
      "AssetCategorys",
      (response) => {
        // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
        this.assetCategorys = response.data;
      },
      () => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
            autoClose: 2000,position :'bottom-right'
          });
      }
    );
    /**
     * Author: TVTam
     * created : tvTam (22/02/2023)
     * Lấy dữ liệu loại tài sản
     */
    await get(
      "AssetCategorys",
      (response) => {
        // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
        this.assetCategorys = response.data;
      },
      () => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
            autoClose: 2000,position :'bottom-right'
          });
      }
    );
  },
  data() {
    return {
      isMessageDelete:false,
      departments: [],
      assetCategorys: [],
      dataAssets: [],
      listIdDelete:null
    };
  },
  methods: {
    /**
     * @ create by : MF1270
     * @ create day : 19/02/2023
     * @ hàm : Gửi sự kiên mở dialog btn thêm mới sang component Dialog
     */
    ShowDialog() {
      this.emitter.emit("showDialog");
    },

    /**
     * Description: chọn thư mục export
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    async Export() {
      await get(
        "Assets/Export",
        () => {
          window.open("https://localhost:7115/api/v1/Assets/Export");
          toast.success(Resource.VN_ExportSucces, {
            autoClose: 2000,position :'bottom-right'
          });
        },
        () => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ExportErro, {
            autoClose: 2000,position :'bottom-right'
          });
        }
      );
    },

    /**
     * Description:  xóa 
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    DeleteAssets(){
       this.isMessageDelete = true;
      
    },
     /**
     * Description:  cập nhập id chọn tại table
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

  updateListIdDelete(e){
    this.listIdDelete = e
  },

   /**
     * Description: Load lại data khi xóa
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    ReLoadingDataDelete(){
      this.isMessageDelete = false;
    }

  },

};
</script>

<style>
</style>