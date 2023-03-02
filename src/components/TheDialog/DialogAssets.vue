<template>
  <div class="dialog-model" v-if="showHideDialog" >
    <div class="dialog-content" >
      <div class="dialog-main">
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">{{ contentForm }}</div>
          <div
            class="dialog-header-close icon24 backgrsvg"
            @click="() => (showHideDialog = false)"
          ></div>
        </div>
        <div class="dialog-body" >
          <div class="item-multiple">
            <div class="item-code item-left" ref="assetsCode">
              <the-input
                :valueInputFisrt="asset.fixed_asset_code"
                heightInput="35px"
                widthInput="100%"
                contentInput="TS0001"
                titleInput="Mã tài sản"
                required="True"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.fixed_asset_code = e;
                  }
                "
              />
            </div>
            <div class="item-name item-right">
              <the-input
                :valueInputFisrt="asset.fixed_asset_name"
                heightInput="35px"
                widthInput="100%"
                contentInput="Nhập tên tài sản..."
                titleInput="Tên tài sản"
                required="True"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.fixed_asset_name = e;
                  }
                "
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-combobox
                :DataCombobox="departments"
                dataContent="department_code"
                keyData="department_id"
                iconCombobox="2"
                marginCombobox="8px"
                contentComboxbox="Chọn mã bộ phận sử dụng"
                titleCombobox=" Mã bộ phần sử dụng"
                requiredCombobox="true"
              />
            </div>
            <div class="item-name item-right">
              <the-input
                :valueInputFisrt="asset.department_name"
                disabledInput="true"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tên bộ phân sử dụng"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.department_name = e;
                  }
                "
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-combobox
                :DataCombobox="assetCategorys"
                keyData="fixed_asset_category_id"
                dataContent="fixed_asset_category_code"
                iconCombobox="2"
                marginCombobox="8px"
                contentComboxbox="Chọn mã tài sản"
                titleCombobox=" Mã tài sản"
                requiredCombobox="true"
              />
            </div>
            <div class="item-name item-right">
              <the-input
                :valueInputFisrt="asset.fixed_asset_category_name"
                disabledInput="true"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tên loại tài sản"
                :required="false"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.fixed_asset_category_name = e;
                  }
                "
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.quantity"
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Số Lượng"
                contentInput="0"
                required="True"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.quantity = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.cost"
                :money="true"
                iconNumber="false"
                heightInput="35px"
                widthInput="100%"
                titleInput="Nguyên giá"
                contentInput="100.000.000"
                required="True"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.cost = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.life_time"
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="số năm sử dụng"
                contentInput="1"
                required="True"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.life_time = e;
                  }
                "
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.depreciation_rate"
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tỷ lệ hao mòn(%)"
                contentInput="0"
                required="True"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.depreciation_rate = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.depreciation_value"
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Giá trị hao mòn năm"
                contentInput="10"
                required="True"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.depreciation_value = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.tracked_year"
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Năm Theo dõi"
                contentInput="2021"
                disabledInput="true"
                marginInput="8px"
                textalignInput="right"
                @sendValueInput="
                  (e) => {
                    this.asset.tracked_year = e;
                  }
                "
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.purchase_date"
                typeInput="date"
                heightInput="35px"
                widthInput="100%"
                titleInput="Ngày mua"
                contentInput="1"
                required="True"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.purchase_date = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :valueInputFisrt="asset.production_year"
                typeInput="date"
                heightInput="35px"
                widthInput="100%"
                titleInput="Ngày bắt đầu sử dụng"
                required="True"
                marginInput="8px"
                @sendValueInput="
                  (e) => {
                    this.asset.production_year = e;
                  }
                "
              />
            </div>
            <div class="item-code item-left"></div>
          </div>
        </div>
        <div class="dialog__footer">
          <button class="btn-add btn">Lưu</button>
          <button class="btn__cancel btn">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheCombobox from "../combobox/BaseCombobox.vue";
import TheInput from "../input/BaseInput.vue";
import { getNewAssetsCode, get } from "@/api/api.js";
import { toast } from "vue3-toastify";
import Resource from "@/resource/Resource";
import MISAEnum from "@/enums/enums";

export default {
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
      (erro) => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
          autoClose: 2000,
          position: "top-center",
        });
        console.log(erro);
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
      (erro) => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
          autoClose: 2000,
          position: "top-center",
        });
        console.log(erro);
      }
    );

    /** mở form thêm sửa cùng dữ liệu */

    this.emitter.on("showDialog", (data) => {
      this.dataAssignment(data.typeDialog, data.dataAsset);
      this.showHideDialog = true;
    });
  },
  components: { TheInput, TheCombobox },
  data() {
    return {
      departments: [],
      assetCategorys: [],
      contentForm: "Thêm tài sản",
      showHideDialog: false,
      asset: {
        fixed_asset_code: "",
        fixed_asset_name: "",
        department_id: "",
        department_code: "",
        department_name: "",
        fixed_asset_category_id: "",
        fixed_asset_category_code: "",
        fixed_asset_category_name: "",
        purchase_date: new Date(),
        cost: 0,
        quantity: 0,
        depreciation_value: 0,
        depreciation_rate: 0,
        tracked_year: 2023,
        life_time: 2023,
        production_year: new Date(),
      },
    };
  },
  mounted() {
            // this.$refs["assetsCode"].querySelector("input").focus();
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : lấy mã tự động
     */
    async addNewEmployee() {
      await getNewAssetsCode(
        "Assets/NewAssetsCode",
        (response) => {
          // Trường hợp thành công gán giá trị cho  AssetCode
          this.asset.fixed_asset_code = response.data;
        },
        (erro) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và và gán lại AssetCode = ""
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(erro);
        }
      );
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : gán giá trị lên form nhập liệu
     */
    async dataAssignment(typeDialog, data) {
      if (typeDialog === MISAEnum.stateDialog.update) {
        this.contentForm = Resource.VN_update;
        this.asset.fixed_asset_code = data.fixed_asset_code;
        this.byData(data);
      } else if (typeDialog === MISAEnum.stateDialog.add) {
        this.contentForm = Resource.VN_Add;
        await this.addNewEmployee();
      } else if (typeDialog === MISAEnum.stateDialog.replication) {
        this.contentForm = Resource.VN_Add;
        await this.addNewEmployee();
        this.byData(data);
      }
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : Clear data asset
     */
    clearData() {
      this.asset.fixed_asset_code = "";
      this.asset.fixed_asset_name = "";
      this.asset.department_id = "";
      this.asset.department_code = "";
      this.asset.department_name = "";
      this.asset.fixed_asset_category_id = "";
      this.asset.fixed_asset_category_code = "";
      this.asset.fixed_asset_category_name = "";
      this.asset.purchase_date = new Date();
      this.asset.cost = 0;
      this.asset.quantity = 0;
      this.asset.depreciation_value = 0;
      this.asset.depreciation_rate = 0;
      this.asset.tracked_year = 2023;
      (this.asset.life_time = 2023), (this.production_year = new Date());
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : Gắn dữ liệu lên form
     */
    byData(data) {
      this.asset.fixed_asset_name = data.fixed_asset_name;
      this.asset.department_id = data.department_id;
      this.asset.department_code = data.department_code;
      this.asset.department_name = data.department_name;
      this.asset.fixed_asset_category_id = data.fixed_asset_category_id;
      this.asset.fixed_asset_category_code = data.fixed_asset_category_code;
      this.asset.fixed_asset_category_name = data.fixed_asset_category_name;
      this.asset.purchase_date = data.purchase_date;
      this.asset.cost = data.cost;
      this.asset.quantity = data.quantity;
      this.asset.depreciation_value = data.depreciation_value;
      this.asset.depreciation_rate = data.depreciation_rate;
      this.asset.tracked_year = data.tracked_year;
      this.asset.life_time = data.life_time;
      this.production_year = data.production_year;
    },
  },
  watch: {
    showHideDialog(stateShowHide) {
      if (!stateShowHide) {
        this.clearData();
      }
    },
  },
};
</script>

<style>
</style>