<template>
  <div
    class="dialog-model"
    tabindex="0"
    @keyup.esc="btnCancel()"
    @keydown.ctrl.s.prevent="saveAsset()"
  >
    <div class="dialog-content">
      <div class="dialog-main">
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">{{ contentForm }}</div>
          <BaseTooltip position="down" tooltipText="Đóng (ESC)">
            <div
              class="dialog-header-close icon24 backgrsvg"
              @click="btnCancel()"
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
                :hideIconInput="true"
                :stepInput="1"
                :maxInput="10000"
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
                @keyDownbaseInput="isNumberKey()"
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
                :maxInput="1000"
                :stepInput="1"
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
                :hideIconInput="true"
                :maxInput="100"
                :stepInput="0.1"
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
                @keyDownbaseInput="isNumberKey()"
                :valueInputFisrt="asset.depreciation_value"
                :money="true"
                iconNumber="false"
                heightInput="35px"
                widthInput="100%"
                titleInput="Giá trị hao mòn năm"
                contentInput="0"
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
                :stepInput="1"
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
                value-type="YYYY-MM-DD"
                lang="vi"
              ></DatePicker>
            </div>
            <div class="item-code item-left" ref="production_year">
              <label for="" class="content-input">
                Ngày bắt đầu sử dụng <span style="color: red">*</span></label
              >
              <DatePicker
                v-model:value="asset.production_year"
                value-type="YYYY-MM-DD"
                format="DD/MM/YYYY"
                class="date-input"
                lang="vi"
              ></DatePicker>
            </div>
            <div class="item-code item-left"></div>
          </div>
        </div>

        <div class="dialog__footer">
          <BaseTooltip position="down" tooltipText="Lưu (Ctrl + S)">
            <TheButton
              @click="saveAsset()"
              btnName="Lưu"
              class="btnWarn-Yes btn-save"
              btnType="2"
            />
          </BaseTooltip>
          <BaseTooltip position="down" tooltipText="Hủy (ESC)">
            <TheButton
              btnName="Hủy"
              class="btnWarn-close"
              btnType="1"
              @click="btnCancel()"
            />
          </BaseTooltip>
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
    @hideMessage="closeMessage()"
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
  props: {
    assetItem: {},
    typeD: {
      default: 1,
    },
  },
  async created() {
    /**
     * Xác định loại form và thực hiện gán dữ liệu tương ứng
     * @create by: TVTam
     * @created : tvTam (22/02/2023)
     *
     */
    this.dataAssignment(this.typeD, this.assetItem);
    /**
     * @created : tvTam (22/02/2023)
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
     * @created : tvTam (22/02/2023)
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
        purchase_date: "",
        cost: 0,
        quantity: 0,
        depreciation_value: 0,
        depreciation_rate: 0,
        tracked_year: 2023,
        life_time: 0,
        production_year: "",
      },
    };
  },
  mounted() {
    this.focusInput("fixed_asset_code");
  },
  methods: {
    /**
     * lấy ngày hiện tại
     * @create by : MF1270
     * @@create day : 1/03/2023
     
     */
    getNowday() {
      // mặc đinh là ngày hiện tại
      if (new Date().getMonth() + 1 < 10) {
        if (new Date().getDate() < 10) {
          this.asset.production_year =
            new Date().getFullYear().toString() +
            "-0" +
            (new Date().getMonth() + 1).toString() +
            "-0" +
            new Date().getDate().toString();
          this.asset.purchase_date =
            new Date().getFullYear().toString() +
            "-0" +
            (new Date().getMonth() + 1).toString() +
            "-0" +
            new Date().getDate().toString();
          return;
        }
        this.asset.purchase_date =
          new Date().getFullYear().toString() +
          "-0" +
          (new Date().getMonth() + 1).toString() +
          "-" +
          new Date().getDate().toString();
        this.asset.production_year =
          new Date().getFullYear().toString() +
          "-0" +
          (new Date().getMonth() + 1).toString() +
          "-" +
          new Date().getDate().toString();
      } else {
        if (new Date().getDate() < 10) {
          this.asset.production_year =
            new Date().getFullYear().toString() +
            "-" +
            (new Date().getMonth() + 1).toString() +
            "-0" +
            new Date().getDate().toString();
          this.asset.purchase_date =
            new Date().getFullYear().toString() +
            "-" +
            (new Date().getMonth() + 1).toString() +
            "-0" +
            new Date().getDate().toString();
          return;
        }
        this.asset.production_year =
          new Date().getFullYear().toString() +
          "-" +
          (new Date().getMonth() + 1).toString() +
          "-" +
          new Date().getDate().toString();
        this.asset.purchase_date =
          new Date().getFullYear().toString() +
          "-" +
          (new Date().getMonth() + 1).toString() +
          "-" +
          new Date().getDate().toString();
      }
    },

    /**
     * chuyển date sang chuỗi
     * @create by : MF1270
     * @@create day : 1/03/2023
     
     */
    dateToString(dateNew) {
      if (new Date(dateNew).getMonth() + 1 < 10) {
        if (new Date(dateNew).getDate() < 10) {
          return (
            new Date(dateNew).getFullYear().toString() +
            "-0" +
            (new Date(dateNew).getMonth() + 1).toString() +
            "-0" +
            new Date(dateNew).getDate().toString()
          );
        }
        return (
          new Date(dateNew).getFullYear().toString() +
          "-0" +
          (new Date(dateNew).getMonth() + 1).toString() +
          "-" +
          new Date(dateNew).getDate().toString()
        );
      } else {
        if (new Date(dateNew).getDate() < 10) {
          return (
            new Date(dateNew).getFullYear().toString() +
            "-" +
            (new Date(dateNew).getMonth() + 1).toString() +
            "-0" +
            new Date(dateNew).getDate().toString()
          );
        }
        return (
          new Date(dateNew).getFullYear().toString() +
          "-" +
          (new Date(dateNew).getMonth() + 1).toString() +
          "-" +
          new Date(dateNew).getDate().toString()
        );
      }
    },
    /**
     * chuyển chuỗi sang date
     * @create by : MF1270
     * @@create day : 1/03/2023
     
     */
    stringToDate(text) {
      return new Date(text);
    },
    /**
     * chỉ nhập số
     * @create by : MF1270
     * @@create day : 1/03/2023
     
     */
    isNumberKey() {
      if (event.keyCode > 47 && event.keyCode < 58) {
        event.target;
      } else if (
        event.keyCode == 9 ||
        event.keyCode == 37 ||
        event.keyCode == 39 ||
        event.keyCode == 46 ||
        event.keyCode == 8
      ) {
        event.target;
      } else {
        event.preventDefault();
      }
    },

    /**
     * đóng mở form
     * @create by : MF1270
     * @@create day : 1/03/2023
     
     */
    closeDialog() {
      this.$emit("closeDialog");
    },

    /**
     * @create by : MF1270
     * @@create day : 1/03/2023
     * ham : set focus
     */
    focusInput(reftxt) {
      // 👇 call custom "focus" method
      this.$refs[reftxt].querySelector("input").focus();
    },
    closeMessage() {
      this.isMessage = false;
      this.focusInput(this.isValidate.isfocus);
    },

    /**
     * @create by : MF1270
     * @create day : 1/03/2023
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
          data["depreciation_rate"].toFixed(1)
        );
      }
    },

    /**
     * @create by : MF1270
     * @create day : 1/03/2023
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
     * @create by : MF1270
     * @@create day : 1/03/2023
     * @ham : gán giá trị lên form nhập liệu
     */
    dataAssignment(typeDialog, data) {
      this.isValidate.isfocus = "fixed_asset_code";
      if (typeDialog === MISAEnum.stateDialog.update) {
        this.typeDialog = 2;
        this.contentForm = Resource.VN_update;
        this.asset.fixed_asset_code = data.fixed_asset_code;
        this.asset.fixed_asset_id = data.fixed_asset_id;
        this.byData(data);
      } else if (typeDialog === MISAEnum.stateDialog.add) {
        this.getNowday(), this.newAssetCode();
        this.typeDialog = 1;
        this.contentForm = Resource.VN_Add;
      } else if (typeDialog === MISAEnum.stateDialog.replication) {
        this.newAssetCode();
        this.typeDialog = 1;
        this.contentForm = Resource.VN_Add;
        this.byData(data);
      }
    },

    /**
     * @create by : MF1270
     * @create day : 1/03/2023
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
      this.asset.purchase_date = this.dateToString(data.purchase_date);
      this.asset.cost = data.cost;
      this.asset.quantity = data.quantity;
      this.asset.depreciation_value = data.depreciation_value;
      this.asset.depreciation_rate = Number(
        (data.depreciation_rate * 100).toFixed(1)
      );
      this.asset.tracked_year = data.tracked_year;
      this.asset.life_time = data.life_time;
      this.asset.production_year = this.dateToString(data.production_year);
    },

    /**
     * @create by : MF1270
     * @create day : 1/03/2023
     * ham : kiểm tra dữ liệu trên form đã thay dổi chưa
     */
    ischange() {
      if (
        this.asset.fixed_asset_name !== this.assetItem.fixed_asset_name ||
        this.asset.department_id !== this.assetItem.department_id ||
        this.asset.fixed_asset_category_id !==this.assetItem.fixed_asset_category_id ||
        new Date(this.asset.purchase_date).getDate() !==
          new Date(this.assetItem.purchase_date).getDate() ||
        new Date(this.asset.purchase_date).getMonth() !==
          new Date(this.assetItem.purchase_date).getMonth() ||
        new Date(this.asset.purchase_date).getFullYear() !==
          new Date(this.assetItem.purchase_date).getFullYear() ||
        this.moneyToNumber(this.asset.cost) !== this.assetItem.cost ||
        this.asset.quantity !== this.assetItem.quantity ||
        this.asset.tracked_year !== this.assetItem.tracked_year ||
        this.asset.life_time !== this.assetItem.life_time ||
        new Date(this.asset.production_year).getDate() !==
          new Date(this.assetItem.production_year).getDate() ||
        new Date(this.asset.production_year).getMonth() !==
          new Date(this.assetItem.production_year).getMonth() ||
        new Date(this.asset.production_year).getFullYear() !==
          new Date(this.assetItem.production_year).getFullYear()
      ) {
        return true;
      }
      return false;
    },

    /**
     * @create by : MF1270
     * @create day : 03/03/2023
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
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : thêm - sửa tài sản
     */
    saveAsset() {
      var isChangeDataUpdate = this.ischange();
      this.isValidateEmpty();
      if (this.isValidate.stateValide) {
        this.typeMessage = 1;
        this.ContentMessage =
          Resource.VN_Please + Resource.MapNameAsset[this.isValidate.isfocus];
        this.isMessage = true;
        return;
      }
      if (this.asset.quantity == 0) {
        this.isValidate.isfocus = "quantity";
        this.typeMessage = 1;
        this.ContentMessage =
          Resource.VN_Please + Resource.MapNameAsset["quantity"];
        this.isMessage = true;
        return;
      }
      this.asset.cost = this.moneyToNumber(this.asset.cost);
      this.asset.depreciation_value = this.moneyToNumber(
        this.asset.depreciation_value
      );
      this.asset.depreciation_rate = this.asset.depreciation_rate / 100;

      if (this.asset.cost < this.asset.depreciation_value) {
        this.isValidate.isfocus = "depreciation_value";
        this.typeMessage = 1;
        this.ContentMessage =
          Resource.MapNameAsset[this.isValidate.isfocus] + Resource.VN_NumberSS;
        this.isMessage = true;
        return;
      }
      this.asset.purchase_date = new Date(this.asset.purchase_date);

      this.asset.production_year = new Date(this.asset.production_year);

      try {
        if (this.typeDialog === MISAEnum.stateDialog.add) {
          this.addAsset();
          this.emitter.emit("showLoading", false);
        } else {
          if (isChangeDataUpdate) {
            this.updateAsset();
            this.emitter.emit("showLoading", false);
          } else {
            this.closeDialog();
          }
        }
      } catch (error) {
        this.isValidate.isfocus = "fixed_asset_code";
        this.typeMessage = 1;
        this.ContentMessage = Resource.VN_AddFailure;
        this.isMessage = true;
        console.log(error);
        this.emitter.emit("showLoading", true);
      }
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
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

          this.closeDialog();

          /// đóng loading
          this.emitter.emit("showLoading", true);
          //load lại data
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.update);
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.\

          if (error.code === "ERR_NETWORK") {
            this.ContentMessage = Resource.VN_SeverDisconnect;
            this.isValidate.isfocus = "fixed_asset_code";
          } else {
            this.ContentMessage = error.response.data.erros[0];
            console.log(
              `${error.response.data.devMsg}: ${error.response.data.erros}`
            );
            this.isValidate.isfocus = "cost";
          }

          this.typeMessage = 1;
          this.isMessage = true;
          // đóng loading
          this.emitter.emit("showLoading", true);
        }
      );
    },
    /**
     * sửa nhân tài sản
     * @param : tài sản cần sửa
     * @create by: TVTam
     * Last Edited: 5/03/2023
     */
    async updateAsset() {
      await put(
        `Assets`,
        this.asset.fixed_asset_id,
        this.asset,
        () => {
          // Trường hợp thành công nhận về dữ liệu thì toast thông báo
          toast.success(Resource.VN_UpdateSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.closeDialog();

          /// đóng loading
          this.emitter.emit("showLoading", true);
          //load lại data
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.add);
        },
        (error) => {
          if (error.code === "ERR_NETWORK") {
            this.ContentMessage = Resource.VN_SeverDisconnect;
            this.isValidate.isfocus = "fixed_asset_code";
          } else {
            this.ContentMessage = error.response.data.erros[0];
            console.log(
              `${error.response.data.devMsg}: ${error.response.data.erros}`
            );
            this.isValidate.isfocus = "cost";
          }

          this.typeMessage = 1;
          this.isMessage = true;
          // đóng loading
          this.emitter.emit("showLoading", true);
        }
      );
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : mỏ hộp thông báo hàm hủy thêm - sửa
     */
    btnCancel() {
      if (this.typeDialog === MISAEnum.stateDialog.add) {
        this.isMessage = true;

        this.typeMessage = 2;
        this.ContentMessage = Resource.VN_CancelAdd;
      } else {
        if (this.ischange()) {
          this.isMessage = true;
          this.typeMessage = 3;
          this.ContentMessage = Resource.VN_CancelUpdate;
        } else {
          this.closeDialog();
        }
      }
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : thực hiện hủy thêm - sửa
     */
    btnYesMessage() {
      this.isMessage = false;
      this.closeDialog();
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : thực hiện sửa
     */
    updateAssetMessage() {
      this.isMessage = false;
      this.saveAsset();
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : định dạng tiền
     */
    FormatMoney(dataFormat) {
      return FormatMoney(dataFormat);
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
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
    "asset.cost"(data) {
      this.asset.depreciation_value = this.FormatMoney(
        (
          (this.moneyToNumber(data) * this.asset.depreciation_rate) /
          100
        ).toFixed()
      );
    },
    "asset.depreciation_rate"(data) {
      this.asset.depreciation_value = this.FormatMoney(
        ((this.moneyToNumber(this.asset.cost) * data) / 100).toFixed()
      );
    },
    "asset.life_time"(data) {
      if (data == 0) {
        this.asset.depreciation_rate = 0.00001;
      } else {
        this.asset.depreciation_rate = Number(((1 / data) * 100).toFixed(1));
      }
      this.asset.depreciation_rate = Number(
        this.asset.depreciation_rate.toFixed(1)
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
.mx-table-date td,
.mx-table-date th {
  text-align: center;
}
</style>