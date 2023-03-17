<template>
  <div class="dialog-model" v-if="showHideDialog">
    <div class="dialog-content">
      <div class="dialog-main">
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">{{ contentForm }}</div>
          <BaseTooltip position="down" tooltipText="Đóng">
            <div
              class="dialog-header-close icon24 backgrsvg"
              @click="() => (showHideDialog = false)"
            ></div>
          </BaseTooltip>
        </div>
        <div class="dialog-body">
          <div class="item-multiple">
            <div class="item-code item-left" ref="fixed_asset_code">
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
            <div class="item-name item-right" ref="fixed_asset_name">
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
            <div class="item-code item-left" ref="department_code">
              <the-combobox
                @selectItemCombobox="
                  (data, key) => {
                    getDataComboboxItem(data, key);
                  }
                "
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
            <div class="item-name item-right" ref="department_name">
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
            <div class="item-code item-left" ref="fixed_asset_category_code">
              <the-combobox
                @selectItemCombobox="
                  (data, key) => {
                    getDataComboboxItem(data, key);
                  }
                "
                :valueSelect="asset.fixed_asset_category_code"
                :DataCombobox="assetCategorys"
                keyData="fixed_asset_category"
                dataContent="fixed_asset_category_code"
                iconCombobox="2"
                marginCombobox="8px"
                contentComboxbox="Chọn mã loại tài sản"
                titleCombobox=" Mã loại tài sản"
                requiredCombobox="true"
              />
            </div>
            <div class="item-name item-right" ref="fixed_asset_category_name">
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
            <div class="item-code item-left" ref="quantity">
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
            <div class="item-code item-left" ref="cost">
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
            <div class="item-code item-left" ref="life_time">
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
            <div class="item-code item-left" ref="depreciation_rate">
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
            <div class="item-code item-left" ref="depreciation_value">
              <the-input
                :valueInputFisrt="asset.depreciation_value"
                :money="true"
                iconNumber="false"
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
            <div class="item-code item-left" ref="tracked_year">
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
            <div class="item-code item-left" ref="purchase_date">
              <label for="" class="content-input">
                Ngày mua <span style="color: red">*</span></label
              >
              <DatePicker
                v-model:value="asset.purchase_date"
                format="DD/MM/YYYY"
                class="date-input"
              ></DatePicker>
            </div>
            <div class="item-code item-left" ref="production_year">
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
          <TheButton
            btnName="Hủy"
            class="btnWarn-close"
            btnType="1"
            @click="btnCancel()"
          />
        </div>
      </div>
    </div>
  </div>
  <dialog-message
    @btnYesMessageUpdate="updateAssetMessage"
    @btnYesMessage="btnYesMessage"
    :titleBtnNo="Không"
    titleBtnYes="Hủy bỏ"
    :typeMessage="typeMessage"
    :titleMessage="ContentMessage"
    v-if="isMessage"
    @hideMessage="
      () => {
        this.isMessage = false;
      }
    "
  />
</template>

<script>
import TheCombobox from "../combobox/BaseCombobox.vue";
import TheInput from "../input/BaseInput.vue";
import { getNewAssetsCode, get, post, put } from "@/api/api.js";
import { toast } from "vue3-toastify";
import Resource from "@/resource/Resource";
import MISAEnum from "@/enums/enums";
import { FormatMoney } from "@/assets/js/Format";

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
      typeMessage: 1,
      isMessage: false,
      ContentMessage: "",
      isValidate: {
        stateValide: true,
        isfocus: "",
      },
      typeDialog: 1,
      departments: [],
      assetCategorys: [],
      contentForm: "Thêm tài sản",
      showHideDialog: false,
      asset: {
        fixed_asset_id: "0d4aa7be-2106-11ed-82ee-0259e1bc84a2",
        fixed_asset_code: "",
        fixed_asset_name: "",
        department_code: "",
        department_id: "",
        department_name: "",
        fixed_asset_category_code: "",
        fixed_asset_category_id: "",
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
    // this.setFocus("fixed_asset_code")
    //  this.$refs[refFocus].queryseletor.focus();
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : set focus
     */
    setFocus(refFocus) {
      console.log(this.$refs[refFocus]);
      //  this.$refs[refFocus].queryseletor.focus();
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : lấy dữ liệu combobox
     */
    getDataComboboxItem(data, key) {
      if (key === MISAEnum.typeCombobox.deparment) {
        this.asset.department_code =
          data[MISAEnum.typeCombobox.deparment + "_code"];
        this.asset.department_name =
          data[MISAEnum.typeCombobox.deparment + "_name"];
        this.asset.department_id =
          data[MISAEnum.typeCombobox.deparment + "_id"];
      } else {
        this.asset.fixed_asset_category_code =
          data[MISAEnum.typeCombobox.category + "_code"];
        this.asset.fixed_asset_category_name =
          data[MISAEnum.typeCombobox.category + "_name"];
        this.asset.fixed_asset_category_id =
          data[MISAEnum.typeCombobox.category + "_id"];
        this.asset.life_time = data["life_time"];
        this.asset.depreciation_rate = Number(
          data["depreciation_rate"].toFixed(2)
        );
      }
    },

    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : lấy mã tự động
     */
    async newAssetCode() {
      await getNewAssetsCode(
        "Assets/NewAutoCode",
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
        this.typeDialog = 2;
        this.contentForm = Resource.VN_update;
        this.asset.fixed_asset_code = data.fixed_asset_code;
        this.asset.fixed_asset_id = data.fixed_asset_id;
        this.byData(data);
      } else if (typeDialog === MISAEnum.stateDialog.add) {
        this.typeDialog = 1;
        this.contentForm = Resource.VN_Add;
        this.newAssetCode();
      } else if (typeDialog === MISAEnum.stateDialog.replication) {
        this.typeDialog = 1;
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
      this.asset.purchase_date = new Date(data.purchase_date);
      this.asset.cost = data.cost;
      this.asset.quantity = data.quantity;
      this.asset.depreciation_value = data.depreciation_value;
      this.asset.depreciation_rate = data.depreciation_rate;
      this.asset.tracked_year = data.tracked_year;
      this.asset.life_time = data.life_time;
      this.asset.production_year = new Date(data.production_year);
    },

    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : valide
     */
    isValidateEmpty() {
      for (var key in this.asset) {
        if (
          typeof this.asset[key] == "string" &&
          this.asset[key].trim() == ""
        ) {
          this.isValidate.stateValide = true;
          this.isValidate.isfocus = key;
          return;
        }
        if (this.asset[key] == null) {
          this.isValidate.stateValide = true;
          this.isValidate.isfocus = key;
          return;
        }
        this.isValidate.stateValide = false;
        this.isValidate.isfocus = "";
      }
    },

    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : thêm - sửa tài sản
     */
    saveAsset() {
      this.isValidateEmpty();
      if (this.isValidate.stateValide) {
        this.typeMessage = 1;
        this.ContentMessage =
          Resource.MapNameAsset[this.isValidate.isfocus] +
          Resource.VN_EmptyData;
        this.isMessage = true;
        return;
      }
      this.asset.cost = this.moneyToNumber(this.asset.cost);
      this.asset.depreciation_value = this.moneyToNumber(
        this.asset.depreciation_value
      );
      if (this.asset.cost < this.asset.depreciation_value) {
        this.isValidate.isfocus = "depreciation_value";
        this.typeMessage = 1;
        this.ContentMessage =
          Resource.MapNameAsset[this.isValidate.isfocus] + Resource.VN_NumberSS;
        this.isMessage = true;
        return;
      }

      try {
        this.emitter.emit("showLoading", false);

        if (this.typeDialog === MISAEnum.stateDialog.add) {
          this.addAsset();
        } else {
          this.updateAsset();
        }
      } catch (error) {
        toast.error(Resource.VN_AddFailure, {
          autoClose: 2000,
          position: "top-center",
        });
        console.log(error);
        this.emitter.emit("showLoading", true);
      }
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : thêm
     */
    async addAsset() {
      await post(
        `Assets`,
        this.asset,
        () => {
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.VN_AddSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.showHideDialog = false;
          // đóng form loading
          this.emitter.emit("showLoading", true);
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.add);
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.\
        
          this.typeMessage = 1;
          
           this.ContentMessage =  error.response.data.erros[0];
          this.isMessage = true;      
              console.log(
            `${error.response.data.devMsg}: ${error.response.data.erros}`
          );
          // đóng loading
          this.emitter.emit("showLoading", true);
        }
      );
    },
    /**
     * sửa nhân tài sản
     * @param : tài sản cần sửa
     * Author: TVTam
     * Last Edited: 5/03/2023
     */
    async updateAsset() {
      await put(
        `Assets` , this.asset.fixed_asset_id, 
        this.asset,
        () => {
          // Trường hợp thành công nhận về dữ liệu thì toast thông báo
          toast.success(Resource.VN_UpdateSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.showHideDialog = false;

          /// đóng loading
          this.emitter.emit("showLoading", true);
          //load lại data
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.update);
        },
        (error) => {
          toast.error(Resource.VN_UpdateFailure, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(
            `${error.response.data.devMsg}: ${error.response.data.erros}`
          );
        }
      );
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : mỏ hộp thông báo hàm hủy thêm - sửa
     */
    btnCancel() {
      this.isMessage = true;
      if (this.typeDialog === MISAEnum.stateDialog.add) {
        this.typeMessage = 2;
        this.ContentMessage = Resource.VN_CancelAdd;
      } else {
        this.typeMessage = 3;
        this.ContentMessage = Resource.VN_CancelUpdate;
      }
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : thực hiện hủy thêm - sửa
     */
    btnYesMessage() {
      this.isMessage = false;
      this.showHideDialog = false;
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : thực hiện sửa
     */
    updateAssetMessage() {
      this.isMessage = false;
      this.saveAsset();
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : định dạng tiền
     */
    FormatMoney(dataFormat) {
      return FormatMoney(dataFormat);
    },
    /**
     * create by : MF1270
     * create day : 03/03/2023
     * ham : tiền thành số
     */
    moneyToNumber(money) {
      if (money.length > 3) {
        money.replaceAll(".", "");
        return Number(money.replaceAll(".", ""));
      }
      return Number(money);
    },
  },
  watch: {
    showHideDialog(stateShowHide) {
      if (!stateShowHide) {
        this.clearData();
      }
    },
    "asset.cost"(data) {
      this.asset.depreciation_value = this.FormatMoney(
        (this.moneyToNumber(data) * this.asset.depreciation_rate).toFixed()
      );
    },
    "asset.depreciation_rate"(data) {
      this.asset.depreciation_value = this.FormatMoney(
        (this.moneyToNumber(this.asset.cost) * data).toFixed()
      );
    },
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
.mx-table-date td, .mx-table-date th{
  text-align: center;
}
</style>