<template>
  <BaseDialog
    nameBtnAcrep="Đồng ý"
    nameBtnHCancel="Hủy bỏ"
    bgMain="#ffffff"
    @saveDialog="saveDialog()"
  >
    <div class="line"></div>
    <div class="dialog-table" ref="dialog-table">
      <div class="dialog-table-search">
        <BaseInput
          refInput="search"
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
      </div>
      <BaseTableLicense
        :isLicense="false"
        :typeTableData="false"
        @updateListId="(listIs) => updateId(listIs)"
        @changePage="(statePage) => changePage(statePage)"
        :objectParamApi="paramApiLicenseDetail"
        urlApi="Assets/getBySreach"
        :nameTable="tableLicenseAsset.NameTable"
        :headerTable="tableLicenseAsset.headerTableLicense"
        :stateCheckbox="tableLicenseAsset.stateCheckBox"
        :statePaging="tableLicenseAsset.statePaging"
        :bodyTable="tableLicenseAsset.bodyTableLicense"
      />
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from "./BaseDialog.vue";
import DataObject from "@/common/dataobject/model.js";
import BaseTableLicense from "../table/BaseTableLicense.vue";
import _ from "lodash";

export default {
  props: {
    idLicense: {
      default: "00000000-0000-0000-0000-000000000000",
    },
    listCodes: {
      default: "''",
    },
  },
  created() {
    this.paramApiLicenseDetail.codes = this.listCodes;
    this.paramApiLicenseDetail.idLicense = this.idLicense;
  },
  components: { BaseDialog, BaseTableLicense },
  name: "BaseDialogAssets",

  data() {
    return {
      txtSreach: "",
      listId: null,
      tableLicenseAsset: {
        headerTableLicense: DataObject.TableLicenseAsset.headerTable,
        statePaging: true,
        stateCheckBox: true,
        bodyTableLicense: DataObject.TableLicenseAsset.bodyTable,
        NameTable: DataObject.TableLicenseAsset.nameTable,
      },
      paramApiLicenseDetail: {
        codes: "''",
        pageNumber: 1,
        pageSize: 15,
        txtSearch: "",
        idLicense: "00000000-0000-0000-0000-000000000000",
      },
    };
  },
  mounted() {
    
  },
  methods: {
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
     * created : tvTam (20/04/2023)
     * lấy ra danh sách id
     */
    saveDialog() {
      this.$emit("listIdLicense", this.listId);
    },
    /**
     * Author: TVTam
     * created : tvTam (20/04/2023)
     * chọn item tài sản
     */
    updateId(listId) {
      this.listId = listId;
    },
    /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * đến trang phía sau-trước
     */
    changePage(state) {
      if (state == 1) {
        this.paramApiLicenseDetail.pageNumber =
          this.paramApiLicenseDetail.pageNumber - 1;
      } else {
        this.paramApiLicenseDetail.pageNumber =
          this.paramApiLicenseDetail.pageNumber + 1;
      }
    },
  },
  watch: {
    listCodes(value) {
      this.paramApiLicenseDetail.codes = value;
    },
    txtSreach: _.debounce(function (data) {
      this.searchInput(data.trim());
    }, 700),
  },
};
</script>

<style scoped>
.line {
  background: #afafaf;
  height: 1px;
  width: 103%;
  margin: 10px 0px 10px -15px;
}
.dialog-table {
  width: 100%;
  height: calc(100% - 10px);
}
.dialog-table-search {
  padding: 0 10px;
  background-color: #ffffff;
  height: 50px;
}
</style>