<template>
  <BaseDialog @saveDialog="btnSave()">
    <div class="license-body-dialog" ref="license-body-dialog">
      <div class="title-license">Thông tin chứng từ</div>
      <div class="license-body-dialog-input">
        <div class="license-body-dialog-input-top">
          <div class="input-license">
            <BaseInput
              ref="codeLicense"
              :isValide="isCodeCt"
              maxlengthBaseInput="100"
              contentInput="GT0001"
              titleInput="Mã chứng từ  "
              required="True"
              :valueInputFisrt="dataLicense.license.license_code"
              heightInput="35px"
              widthInput="100%"
              marginInput="8px"
              @sendValueInput="
                (e) => {
                  this.dataLicense.license.license_code = e;
                }
              "
            />
          </div>
          <div class="input-license">
            <label for="" class="content-input">
              {{ "Ngày bắt đầu sử dụng " }}
              <span style="color: red">*</span></label
            >
            <DatePicker
              :clearable="false"
              placeholder="dd/MM/yyyy"
              v-model:value="dateUser"
              format="DD/MM/YYYY"
              class="date-input"
              value-type="YYYY-MM-DD"
              lang="vi"
            ></DatePicker>
          </div>
          <div class="input-license">
            <label for="" class="content-input">
              {{ "Ngày ghi tăng " }} <span style="color: red">*</span></label
            >
            <DatePicker
              :clearable="false"
              placeholder="dd/MM/yyyy"
              v-model:value="dateLicense"
              format="DD/MM/YYYY"
              class="date-input"
              value-type="YYYY-MM-DD"
              lang="vi"
            ></DatePicker>
          </div>
        </div>
        <div class="license-body-dialog-input-bottom">
          <BaseInput
            titleInput="Ghi chú "
            :valueInputFisrt="dataLicense.license.note"
            heightInput="35px"
            widthInput="100%"
            marginInput="8px"
            @sendValueInput="
              (e) => {
                this.dataLicense.license.note = e;
              }
            "
          />
        </div>
      </div>
    </div>
    <div class="license-body-dialog-table">
      <div class="title-license">Thông tin chi tiết</div>
      <div class="dialog-table-search">
        <BaseInput
          heightInput="35"
          widthInput="300px"
          :iconLeft="true"
          contentInput="Tìm kiếm theo Mã, tên tài sản"
          @sendValueInput="
            (e) => {
              this.txtSreach = e;
            }
          "
          @searchInput="searchInput()"
        />
        <div class="btn-select-asset">
          <button class="btn-select" @click="openSelectAsset()">
            Chọn tài sản
          </button>
        </div>
      </div>
      <div class="dialog-table">
        <BaseTableLicense
          @getCose="getTotalCose"
          @getIdByTable="(id, type) => getIdItemTable(id, type)"
          :objectParamApi="paramApiLicenseDetail"
          urlApi="Assets/getByItemSelect"
          :nameTable="tableLicenseAsset.NameTable"
          :headerTable="tableLicenseAsset.headerTableLicense"
          :stateCheckbox="tableLicenseAsset.stateCheckBox"
          :statePaging="tableLicenseAsset.statePaging"
          :bodyTable="tableLicenseAsset.bodyTableLicense"
        />
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import BaseTableLicense from "@/components/table/BaseTableLicense.vue";
import BaseDialog from "./BaseDialog.vue";
import DataObject from "@/common/dataobject/model.js";
import {
  getNewCode,
  post,
  getById,
  getByFilter,
  putlc,
} from "@/common/api/api.js";
import {
  getNowday,
  convertDateTypeEnter,
  dateToString,
} from "@/common/helper/format";
import { toast } from "vue3-toastify";
import Resource from "@/common/resource/Resource";
import MISAEnum from "@/common/enums/enums";
import _ from "lodash";
export default {
  props: {
    refError: { default: false },
    typeDialog: {
      default: 1,
    },
    idLicenseUpdate: {
      default: "",
    },
    listIds: null,
    listCodes: {
      default: "''",
    },
  },
  name: "DialogLicense",
  components: { BaseDialog, BaseTableLicense },
  created() {
    if (this.typeDialog === MISAEnum.stateDialog.add) {
      this.newLicenseCode();
    } else {
      this.getEntityById(this.idLicenseUpdate);
    }
    this.dataLicense.ids = this.listIds;
  },
  mounted() {
    this.$nextTick(() => {
      this.emitter.on("focusErroMvg", () => {
        this.focusInputtest("codeLicense");
      });
    });
    this.focusInputtest("codeLicense");
    this.emitter.on("updateLicenseMessage", () => {
      this.btnSave();
    });
    this.emitter.on("updateListId", (data) => {
      this.listIdSelect = data;
    });
  },
  data() {
    return {
      focusInput: "firstFocus",
      isCodeCt: false,
      rootlistId: [],
      paramApiLicenseDetail: {
        codes: "''",
        pageNumber: 1,
        pageSize: 15,
        txtSearch: "",
        idLicense: "00000000-0000-0000-0000-000000000000",
      },
      tableLicenseAsset: {
        headerTableLicense: DataObject.TableLicenseAsset.headerTable,
        statePaging: true,
        stateCheckBox: DataObject.TableLicenseAsset.stateCheckBox,
        bodyTableLicense: DataObject.TableLicenseAsset.bodyTable,
        NameTable: DataObject.TableLicenseAsset.nameTable,
      },
      dateUser: getNowday(),
      dateLicense: getNowday(),
      txtSreach: "",
      listIdSelect: null,
      dataLicense: {
        license: {
          license_code: "",
          license_date: getNowday(),
          increase_date: getNowday(),
          total_price: 0,
          note: "",
        },
        ids: [],
      },
      dataUpdate: {
        license: null,
        guidsDelete: [],
        guidsUpdate: [],
      },
    };
  },
  methods: {
    /**
     * Description: forcus form
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    focusInputtest(reftxt) {
      //  goi "focus" của input
      this.$refs[reftxt].setFocus();
    },
    convertDateTypeEnter,
    /**
     * Description: mở form sửa nguyên giá
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    updateCost(id) {
        this.$emit("updateCostAsset", id);
    },
    /**
     * Description: Tìm kiếm text
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    searchInput(txt) {
      this.paramApiLicenseDetail.txtSearch = txt;
    },
    /**
     * Author: TVTam
     * Last Edited: 5/2/2023
     * Lấy thông tài sản theo ID
     */
    getEntityById(id) {
      getById(
        "Licenses",
        id,
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          this.dataLicense.license = res.data;
          this.dateUser = dateToString(new Date(res.data.license_date));
          this.dateLicense = dateToString(new Date(res.data.increase_date));
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(error);
        }
      );
    },
    /**
     * @create by : MF1270
     * @create day : 24/04/2023
     * ham : Lấy ra tổng nguyên giá của chứng từ
     */
    getTotalCose(sumCost) {
      this.dataLicense.license.total_price = sumCost;
    },

    /**
     * @create by : MF1270
     * @create day : 24/04/2023
     * ham : đóng form
     */
    closeDialog() {
      this.$emit("closeDialogLicense");
    },

    /**
     * @create by : MF1270
     * @create day : 08/05/2023
     * ham : validate chứng từ
     */
    validateLicense() {
      let txtMessageLc = "";
      let isValidate = true;
      if (this.dataLicense.license.license_code.trim() == "") {
        txtMessageLc += Resource.Vn_LisenceCode + Resource.VN_EmptyData;
        this.isCodeCt = true;
        isValidate = false;
      }
      if (this.dataLicense.ids.length == 0) {
        if (txtMessageLc.trim() !== "") {
          txtMessageLc += ". " + Resource.Vn_AssetZeros;
        } else {
          txtMessageLc += Resource.Vn_AssetZeros;
        }
        isValidate = false;
      }
      if (!isValidate) {
        this.$emit("erroInsertLicense", txtMessageLc, false);
      }
      return isValidate;
    },
    /**
     * @create by : MF1270
     * @create day : 24/04/2023
     * ham : thêm chứng từ
     */
    btnSave() {
      if (this.validateLicense()) {
        this.dataLicense.license.increase_date = new Date(this.dateLicense);
        this.dataLicense.license.license_date = new Date(this.dateUser);
        if (this.typeDialog === MISAEnum.stateDialog.add) {
          this.addLicense();
        } else if (this.typeDialog === MISAEnum.stateDialog.update) {
          this.updateLicense();
        }
      }
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : thêm
     */
    addLicense() {
      post(
        `Licenses/Detail`,
        this.dataLicense,
        () => {
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.VN_AddSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });

          this.closeDialog();
          /// đóng loading
          this.emitter.emit("showLoading", false);
          //load lại data
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.update);
        },
        (error) => {
          this.isCodeCt = true;
          var stringError = "";
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          error.response.data.codeError.map((code) => {
            if (code == MISAEnum.codeError.ErrorCodeSameCode) {
              stringError += Resource.ErrorCode.codeSame.replace(
                "{0}",
                this.dataLicense.license.license_code
              );
            }
          });
          if (error.response.data)
            this.$emit("erroInsertLicense", stringError, false);
          // đóng loading
          this.emitter.emit("showLoading", false);
        }
      );
    },
    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : sửa chứng từ
     */
    updateLicense() {
      getByFilter(
        "Assets/getByLicense",
        { id: this.idLicenseUpdate },
        (response) => {
          this.rootlistId = response.data.map((obj) => obj.fixed_asset_id);
          this.dataUpdate.guidsDelete = this.rootlistId.filter(
            (x) => !this.dataLicense.ids.includes(x)
          );
          this.dataUpdate.guidsUpdate = this.dataLicense.ids.filter(
            (x) => !this.rootlistId.includes(x)
          );
          this.dataUpdate.license = this.dataLicense.license;
          this.putLicense();
        },
        (erro) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(erro);
          this.isReloadData = true;
        }
      );
    },
    /**
     * gọi api sửa
     * @created : tvt
     * @creatday:20/04/2023
     */
    putLicense() {
      this.emitter.emit("showLoading", true);
      putlc(
        `Licenses/Detail`,
        this.dataUpdate,
        () => {
          // Trường hợp thành công nhận về dữ liệu thì toast thông báo
          toast.success(Resource.VN_UpdateSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.closeDialog();

          /// đóng loading
          this.emitter.emit("showLoading", false);
          //load lại data
          this.emitter.emit("ReloadData", MISAEnum.stateDialog.add);
        },
        (error) => {
          this.isCodeCt = true;
          console.log(
            `${error.response.data.devMsg}: ${error.response.data.erros}`
          );
          var stringError = "";
          error.response.data.codeError.map((code) => {
            console.log(code);
            if (code == MISAEnum.codeError.ErrorCodeSameCode) {
              stringError += Resource.ErrorCode.codeSame.replace(
                "{0}",
                this.dataLicense.license.license_code
              );
            }
          });
          this.$emit("erroInsertLicense", stringError, false);
          this.emitter.emit("showLoading", false);
        }
      );
    },
    /**
     * lấy ra id từ table
     * @created : tvt
     * @creatday:20/04/2023
     */
    getIdItemTable(id, type) {
      if (type === MISAEnum.typeActiontr.delete){

        this.$emit("deleteItem", id);
      }
       if (type === MISAEnum.typeActiontr.doubleCick){
           this.updateCost(id);
       }
    },
    /**
     * mở dialog chọn tải sản
     * @created : tvt
     * @creatday:20/04/2023
     */
    openSelectAsset() {
      this.$emit("OpenSelectAsset");
    },

    /**
     * @create by : MF1270
     * @create day : 1/03/2023
     * ham : lấy mã tự động
     */
    newLicenseCode() {
      getNewCode(
        "Licenses/NewAutoCode",
        (response) => {
          // Trường hợp thành công gán giá trị cho  AssetCode
          this.dataLicense.license.license_code = response.data;
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
  },
  watch: {
    refError(value) {
      if(value){

        this.focusInputtest("codeLicense");
      }
    },
    txtSreach: _.debounce(function (data) {
      this.searchInput(data.trim());
    }, 700),
    listCodes(value) {
      this.paramApiLicenseDetail.codes = value;
    },
    listIds: {
      handler: function (value) {
        this.dataLicense.ids = value;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.dialog-table {
  height: 250px;
}
.btn-select {
  height: 35px;
  width: 120px;
  background: #ffffff;
  border: 1px solid #afafaf;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  font-family: MISA__Bold;
  cursor: pointer;
  
}
.btn-select:hover ,.btn-select:focus {
  background: #1aa4c8;
  color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}
.dialog-table-search {
  padding: 0 10px;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialog-content {
  width: 800px !important;
}
.input-license {
  width: 300px;
}
.license-body-dialog-input {
  background-color: #ffffff;
  height: 150px;
  padding: 0 10px;
}
.license-body-dialog-input-top {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin-bottom: 10px;
}
.dialog-content {
  width: 100px !important;
  height: 100px !important;
}
.title-license {
  background: #f4f7ff;
  height: 33px;
  display: flex;
  align-content: center;
  font-size: 16px;
  font-family: MISA__Bold;
}
</style>