<template>
  <BaseDialogLicense
    @erroInsertLicense ="erroInsertLicense"
    @closeDialogLicense="CloseDialogLicense()"
    :idLicenseUpdate="idLicense"
    :typeDialog="typeDialog"
    @deleteItem="deleteItem"
    :listCodes="listCode"
    :listIds="listId"
    @OpenSelectAsset="OpenSelectAsset()"
    v-if="isShowDialogLicense"
    @cancelDialog="CloseDialogLicense()"
    :contentForm="titleDialog"
  />
  <BaseDialogAssets
    :idLicense="idLicense"
    :listCodes="listCode"
    @listIdLicense="(listId) => selectAsset(listId)"
    v-if="isShowDialogAsset"
    @cancelDialog="ToggleDialogAsset()"
    contentForm="Chọn tài sản ghi tăng"
    @saveDialog="ToggleDialogAsset()"
    @updateCostAsset="updateCostAsset"
  />
  <BaseDialogUpdateCost
    @cancelDialog="closeUpdateCost"    
    v-if="isUpdateCost"
    :idAsset="idAsset"
    :idLicense="idLicense"
  />

  <div class="license-layout">
    <div class="license-header">
      <div class="license-top">
        <div class="license-title">Ghi tăng tài sản</div>
        <div class="license-display">
          <TheButton
            btnName="Thêm"
            class="btn-add"
            @click="showDialogLicense()"
            btnType="2"
          />
          <div class="icon-display icon36 margin-icon">
            <div class="display-icon backgrsvg" :class="{'display-icon': isRow ,'icon-display-y':!isRow}"></div>
            <div class="display-icon-y" v-if="ischangeDisplay">
              <div class="icon-y">
              <div class="icon-display-y backgrsvg" @click="changeDisplay(1)"></div>
              <div class="icon-display-y-title">theo chiều dọc</div>
              </div>
              <div class="icon-y">
              <div class="display-icon backgrsvg" @click="changeDisplay(2)"></div>
               <div class="icon-display-y-title">theo chiều ngang</div>
              </div>
            </div>
          </div>
          <div class="icon-select icon36 margin-icon" @click="openDisplaySelect()">
            <div class="select-icon backgrsvg"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="license-body">

      <splitpanes class="default-theme splitpanes-main_license" horizontal @resize="paneSize = $event[0].size">
        <pane class="table-one" :size="paneSize">
          <div class="license-action">
            <div class="input-search">
              <BaseInput
                style="margin-right: 10px"
                @keyDownbaseInput="searchInputEnter()"
                heightInput="35"
                widthInput="179"
                :iconLeft="true"
                contentInput="Tìm kiếm theo số chứng từ, nội dung"
                @sendValueInput="
                  (e) => {
                    this.txtSreach = e;
                  }
                "
                @searchInput="searchInput()"
              />
            </div>
            <div class="action-btn">
              <div
                class="icon-display icon36 margin-icon"
                @click="DeleteLicense()"
              >
                <div class="delete-icon backgrsvg"></div>
              </div>
              <div class="icon-display icon36 margin-icon">
                <div class="export-icon backgrsvg"></div>
              </div>
              <div class="icon-select icon36 margin-icon">
                <div class="dot-icon backgrsvg"></div>
              </div>
            </div>
          </div>
          <div class="table-license-data">
            <BaseTableLicense
              @updateListId="listIdSelect"
              @getIdByTable="(id,type)=>byDataUpdate(id,type)"
              @fisrtLoad="fisrtLoad"
              :objectParamApi="paramApiLicense"
              @senIdLicense="
                (id) => {
                  getIdLicense(id);
                }
              "
              :nameTable="tableLicense.NameTable"
              urlApi="Licenses/getBySreach"
              :headerTable="tableLicense.headerTableLicense"
              :stateCheckbox="tableLicense.stateCheckBox"
              :statePaging="tableLicense.statePaging"
              :bodyTable="tableLicense.bodyTableLicense"
            />
          </div>
        </pane>
        <pane class="table-two" :size="100-paneSize">
          <div class="header-asset-detail">
            <div class="header-asset-detail-title">Thông tin tài sản</div>
            <div class="maximine-btn" @click="Maximine()">
              <div class="icon-maximaine backgrsvg icon14"></div>
            </div>
          </div>

          <BaseTableLicense
            :objectParamApi="paramApiLicenseDetail"
            urlApi="Assets/getByLicense"
            :nameTable="tableLicenseAsset.NameTable"
            :headerTable="tableLicenseAsset.headerTableLicense"
            :stateCheckbox="tableLicenseAsset.stateCheckBox"
            :statePaging="tableLicenseAsset.statePaging"
            :bodyTable="tableLicenseAsset.bodyTableLicense"
          />
        </pane>
      </splitpanes>
    </div>
  </div>
   <DialogMessage
    :typeHighligh="typeHighligh"
    :typeMessage="typeMessage"
    :titleMessage="midTitleMessage"
    :titleMessagebottom="titleMessagebottom"
    :titleMessageheader="titleMessageheader"
    v-if="isMessage"
    @btnYesMessage="deleteYes"
    @hideMessage="hideMessage"
  />
</template>
<script>
import { Splitpanes, Pane } from "splitpanes";
import BaseTableLicense from "@/components/table/BaseTableLicense.vue";
import DataObject from "@/common/dataobject/model.js";
import BaseDialogLicense from "@/components/dialog/BaseDialogLicense.vue";
import BaseDialogAssets from "@/components/dialog/BaseDialogAssets.vue";
import _ from "lodash";
import BaseDialogUpdateCost from "@/components/dialog/BaseDialogUpdateCost.vue";
import { getByFilter } from "@/common/api/api";
import { toast } from "vue3-toastify";
import Resource from "@/common/resource/Resource";
import MISAEnum from '@/common/enums/enums';
import DialogMessage from '@/components/message/DialogMessage.vue';

export default {
  components: {
    Splitpanes,
    Pane,
    BaseTableLicense,
    BaseDialogLicense,
    BaseDialogAssets,
    BaseDialogUpdateCost,
    DialogMessage,
  },
  mounted() {
    this.emitter.on("updateListId", (data) => {
      console.log(data);
    });
  },
  data() {
    return {
      ischangeDisplay:false,
      isRow:true,
      paneSize:50,
      typeHighligh:1,
      typeMessage:1,
      midTitleMessage:"11",
      titleMessageheader:"",
      titleMessagebottom:"",
      isMessage:false,
      txtSreach:"",
      idAsset: "",
      isUpdateCost: false,
      typeDialog: 1,
      idLicense: "",
      tableLicense: {
        headerTableLicense: DataObject.TableLicense.headerTableLicense,
        statePaging: DataObject.TableLicense.statePaging,
        stateCheckBox: DataObject.TableLicense.stateCheckBox,
        bodyTableLicense: DataObject.TableLicense.bodyTableLicense,
        NameTable: DataObject.TableLicense.nameTable,
      },
      paramApiLicense: {
        codes: "''",
        pageNumber: 1,
        pageSize: 15,
        txtSearch: "",
        idLicense:"00000000-0000-0000-0000-000000000000"
      },
      tableLicenseAsset: {
        headerTableLicense: DataObject.TableLicenseAsset.headerTable,
        statePaging: DataObject.TableLicenseAsset.statePaging,
        stateCheckBox: DataObject.TableLicenseAsset.stateCheckBox,
        bodyTableLicense: DataObject.TableLicenseAsset.bodyTable,
        NameTable: DataObject.TableLicenseAsset.nameTable,
      },
      paramApiLicenseDetail: {
        id: "9aad0b48-ebbd-46e4-a450-a63d1ecb2bd8",
      },
      dataTableLicense: [],
      isShowDialogAsset: false,
      isShowDialogLicense: false,
      listCode: "''",
      listId: [],
      titleDialog: "Thêm chứng từ ghi tăng",
    };
  },
  methods: {
    /**
     * Mở chọn hiển thị
     * @created : tvt
     * @createday: 20/04/2023
     */
    openDisplaySelect(){
        this.ischangeDisplay = true
    },
    /**
     * Chọn hiển thị
     * @created : tvt
     * @createday: 20/04/2023
     */
    changeDisplay(typeDislay){
        if(MISAEnum.typeDisplay.row == typeDislay){
            this.isRow = true
        }
        else{
           this.isRow = false
           this.paneSize = 100
        }
        this.ischangeDisplay = false
    },
    /**
     * phóng to
     * @created : tvt
     * @createday: 20/04/2023
     */
    Maximine(){
        this.paneSize = 0
    },
    /**
     * đóng form thông báo
     * @created : tvt
     * @createday: 20/04/2023
     */
    hideMessage(){
      this.isMessage = false
    },

    /**
     * Hiển thị lỗi thêm chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    erroInsertLicense(data){
      this.midTitleMessage = data.join(', ').replaceAll(".","");
      this.isMessage = true
    },

     /**
     * đóng form chứng từ 
     * @created : tvt
     * @createday: 20/04/2023
     */
    CloseDialogLicense(){
      
      this.ToggleDialog();
      this.listId = []
      this.listCode= "''"
    },
    /**
     * dongd form update tài sản
     * @created : tvt
     * @createday: 20/04/2023
     */
    closeUpdateCost(){
      this.isUpdateCost=false
    },
    /**
     * update giá tài 
     * @created : tvt
     * @createday: 20/04/2023
     */
    updateCostAsset(id) {
      this.isUpdateCost = true;
      this.idAsset = id;
    },
    /**
     * update giá tài 
     * @created : tvt
     * @createday: 20/04/2023
     */
    listIdSelectUpdate(ids) {
       getByFilter(
       'Assets/getByLicense',
        {id : ids},
        (response) => {
          // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
            this.listCode = response.data.map(obj => `'${obj.fixed_asset_id}'`).join(', ');
            this.listId = response.data;
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
     * Lấy dữ liệu chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    DeleteLicense() {
      console.log(this.listId);
    },
    /**
     * Lấy dữ liệu chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    byDataUpdate(id,type) {
      if(type===MISAEnum.stateAction.update){        
        this.listIdSelectUpdate(id)
        this.titleDialog = "Sửa chứng từ ghi tăng";
        this.ToggleDialog();
        this.typeDialog = 2;
        this.idLicense = id;
      }
    },
    /**
     * Cập nhập lại list id tài sản khi insert
     * @created : tvt
     * @createday: 20/04/2023
     */
    deleteItem(id) {
      if (this.listId.length !== 1) {
        this.listId.splice(this.listId.indexOf(id), 1);
        this.listTostring();
      }
    },
    /**
     * Lấy chi tiết chứng từ đầu tiên
     * @created : tvt
     * @createday: 20/04/2023
     */
    fisrtLoad(data) {
      this.paramApiLicenseDetail.id = data.license_id;
    },
    /**
     * danh sách tài sản đã chọn
     * @created : tvt
     * @createday: 20/04/2023
     */
    selectAsset(ids) {
      if (!ids) {
        return;
      }

      ids.forEach((element) => {
        this.listId.push(element);
      });
      this.listTostring();
    },

    /**
     * chuyển list sang chuỗi
     * @created : tvt
     * @createday: 20/04/2023
     */
    listTostring() {
      this.listCode = "";
      this.listId.forEach((element) => {
        if (element == this.listId[this.listId.length - 1]) {
          this.listCode += "'" + element + "'";
        } else {
          this.listCode += "'" + element + "'" + ",";
        }
      });

      if (this.listCode == "") {
        this.listCode = "''";
      }
    },
    /**
     * Đóng dialog và gửi data
     * @created : tvt
     * @createdate: 20/04/2023
     */
    saveDialog() {
      alert("hello");
    },
    /**
     * ẩn hiện form nhập chứng từ
     * @create by : MF1270
     * @@create day : 19/04/2023
     */
    ToggleDialog() {
      this.isShowDialogLicense = !this.isShowDialogLicense;
    },

    /**
     * lấy id để hiển thị danh sách tài sản theo chứng từ
     * @create by : MF1270
     * @@create day : 19/04/2023
     */
    getIdLicense(id) {
      this.paramApiLicenseDetail.id = id;
    },

    /**
     * mở form nhập liệu chứng từ
     * @create by : MF1270
     * @@create day : 19/04/2023
     */
    showDialogLicense() {
      this.idLicense="00000000-0000-0000-0000-000000000000"
      this.typeDialog = 1;
      this.titleDialog = "Thêm chứng từ ghi tăng";
      this.ToggleDialog();
    },
    /**
     * mở form chọn danh sách tài sản
     * @create by : MF1270
     * @create day : 20/04/2023
     */
    OpenSelectAsset() {
      this.isShowDialogAsset = true;
      // this.ToggleDialog();
    },
    /**
     * mở form chọn danh sách tài sản
     * @create by : MF1270
     * @create day : 20/04/2023
     */
    ToggleDialogAsset() {
      this.isShowDialogAsset = false;
    },
    /**
     * Description: Tìm kiếm text
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    searchInput(txt) {
      this.paramApiLicense.txtSearch = txt;
    },
  },
  watch: {
    txtSreach: _.debounce(function (data) {
      this.searchInput(data);
    }, 700),
  },
};
</script >

<style >
.icon-y{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

}

.icon-y:hover{
  background-color: #d1edf4;
  cursor: pointer;
}
.icon-display-y-title{
  margin-left: 10px;
}
.display-icon-y{
  z-index: 10000;
  position: absolute;
  left: -70px;
  display: flex;
  flex-direction: column;
  height: 80px;
  width: 150px;
  background-color: #ffffff;
   box-shadow: 0 2px 6px rgba(0, 0, 0, .16) !important; 
}
.table-two {
  height: 30%;
}
.table-one {
  height: 70%;
}

.splitpanes-main_license {
  height: calc(100vh - 100px);
}
.splitpanes__pane .table-base {
  height: calc(100% - 30px);
}
@import url(./licensestyle/license.css);
</style>