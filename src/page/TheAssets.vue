<template>
  <div class="toolbar">
    <div class="toolbar__filter">
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

    <div class="toolbar__action">
      <button class="btn__add button" @click="ShowDialog">
        + Thêm tài sản
      </button>
      <button
        class="btn__export icon36 button__icon backgrsvg"
        @click="Export()"
      ></button>
      <button class="btn__delete icon36 button__icon backgrsvg"></button>
    </div>
  </div>
  <div class="table">
    <data-table />
  </div>
</template>

<script>
import DataTable from "@/components/table/DataTable.vue";
import TheInput from "@/components/input/TheInput.vue";
import TheCombobox from "@/components/combobox/TheCombobox.vue";
import { get } from "@/api/api.js";
import Resource from "@/resource/Resource";

export default {
  components: { DataTable, TheInput, TheCombobox },
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
        console.log(Resource.VN_ErroData);
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
        console.log(Resource.VN_ErroData);
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
        console.log(Resource.VN_ErroData);
      }
    );
  },
  data() {
    return {
      departments: [],
      assetCategorys:[],
      dataAssets : []
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
          console.log(`Xuất khẩu thành công`);
        },
        () => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(`Có lỗi mục xuất khẩu`);
        }
      );
    },
  },
};
</script>

<style>
</style>