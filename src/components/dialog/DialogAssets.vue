<template>
  <div class="dialog-model" v-if="showHideDialog">
    <div class="dialog-content">
      <div class="dialog-main">
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">{{ contentForm }}</div>
          <div
            class="dialog-header-close icon24 backgrsvg"
            @click="() => (showHideDialog = false)"
          ></div>
        </div>
        <div class="dialog-body">
          <div class="item-multiple">
            <div class="item-code item-left" >
              <the-input
                :refInput="'assetsCode'"
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
                :valueSelect="asset.department_code"
                :DataCombobox="departments"
                dataContent="department_code"
                keyData="department"
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
                :valueSelect="asset.fixed_asset_category_code"
                :DataCombobox="assetCategorys"
                keyData="fixed_asset_category"
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
                titleInput="Số năm sử dụng"
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
                titleInput="Năm theo dõi"
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
              <label for="" class="content-input">
                Ngày mua <span style="color: red">*</span></label
              >
              <DatePicker
                v-model:value="asset.purchase_date"
                format="DD/MM/YYYY"
                class="date-input"
              ></DatePicker>
            </div>
            <div class="item-code item-left">
              <label for="" class="content-input">
                Ngày bắt đầu sử dụng <span style="color: red">*</span></label
              >
              <DatePicker
                v-model:value="asset.production_year"
                format="DD/MM/YYYY"
                class="date-input"
              ></DatePicker>
            </div>
            <div class="item-code item-left"></div>
          </div>
        </div>

        <div class="dialog__footer">
          <TheButton
            @click="saveAsset()"
            btnName="Lưu"
            class="btnWarn-Yes btn-save"
            btnType="2"
          />
          <TheButton btnName="Hủy" class="btnWarn-close" btnType="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheCombobox from "../combobox/BaseCombobox.vue";
import TheInput from "../input/BaseInput.vue";
import { getNewAssetsCode, get, post } from "@/api/api.js";
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
    // this.$nextTick(function(){

    //   this.$refs.assetsCode.focus();
    // })

    /**tải lại data khi thực hiện xóa */
    this.emitter.on("dataComboboxSendForm", (data) => {
      if (data[1] === MISAEnum.typeCombobox.deparment) {

        this.asset.department_code = data[0][MISAEnum.typeCombobox.deparment + "_code"];
        this.asset.department_name = data[0][MISAEnum.typeCombobox.deparment + "_name"];
        this.asset.department_id = data[0][MISAEnum.typeCombobox.deparment + "_id"];
      } else {
        this.asset.fixed_asset_category_code = data[0][MISAEnum.typeCombobox.category + "_code"];
        this.asset.fixed_asset_category_name = data[0][MISAEnum.typeCombobox.category + "_name"];
        this.asset.fixed_asset_category_id = data[0][MISAEnum.typeCombobox.category + "_id"];
        this.asset.life_time = data[0]['life_time'];
        this.asset.depreciation_rate = Number(data[0]['depreciation_rate'].toFixed(2));
      }
    });
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : lấy mã tự động
     */
    async newAssetCode() {
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
     dataAssignment(typeDialog, data) {
      if (typeDialog === MISAEnum.stateDialog.update) {
        this.contentForm = Resource.VN_update;
        this.asset.fixed_asset_code = data.fixed_asset_code;
        this.byData(data);
      } else if (typeDialog === MISAEnum.stateDialog.add) {
        this.contentForm = Resource.VN_Add;
         this.newAssetCode();
      } else if (typeDialog === MISAEnum.stateDialog.replication) {
        this.contentForm = Resource.VN_Add;
        this.newAssetCode();
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
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : thêm - sửa tài sản
     */
    async saveAsset() {
      this.moneyToNumber(this.asset.cost);
      console.log(this.asset);
      // this.moneyToNumber(this.asset.cost);
      // this.moneyToNumber(this.asset.cost);
      // this.moneyToNumber(this.asset.cost);
      await post(
        `Assets`,
        this.asset,
        () => {
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.VN_AddSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.showHideDialog = false
          // đóng form loading
          this.$emit("LoadingClose");
          // cất và thêm
          // if (this.checkSave === 1) {
          //   this.$emit("OpenDialogContinue");
          // }
          // // cất
          // else {
          //   this.$emit("ContinueAdd");
          // }
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.\
          toast.error(Resource.VN_, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(
            `${error.response.data.devMsg}: ${error.response.data.erros}`
          );

          // this.checkError.id = true;
          // this.fisrtForcus();

          // // đóng loading
          // this.$emit("LoadingClose");
        }
      );
    },
    moneyToNumber(money){
      if (money.length > 3) {
        money.replaceAll(".", "")
        return Number(money.replaceAll(".", ""));
      }
      return Number(money);

    }
  },
  watch: {
    showHideDialog(stateShowHide) {
      if (!stateShowHide) {
        this.clearData();
      }
    },
    'asset.cost'(data){
      if (!this.asset.depreciation_rate) {
        this.asset.depreciation_value =0;
        return;
      }      
      this.asset.depreciation_value = Math.round(this.moneyToNumber(data)*this.asset.depreciation_rate);
    },
    'asset.depreciation_rate'(data){
      if (!this.asset.depreciation_rate) {
        this.asset.depreciation_value =0;
        return;
      }      
      this.asset.depreciation_value = Math.round(this.moneyToNumber(this.asset.cost)* data);
    }
  },
};
</script>
<style scope>
.date-input {
  width: 260px !important;
  height: 36px !important;
  margin-top: 8px;
  border: none !important;
}
.mx-datepicker-popup {
  z-index: 10000000 !important;
}
.btn-save {
  margin-left: 10px;
}
</style>