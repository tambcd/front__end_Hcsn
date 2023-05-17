<template>
  <BaseDialogLicense
    :refError="isErrorLicense"
    @updateCostAsset="updateCostAsset"
    @erroInsertLicense="(mvg, isError) => erroInsertLicense(mvg, isError)"
    @closeDialogLicense="ToggleDialog()"
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
  />
  <BaseDialogUpdateCost
    @closeDialogUpdate="closeUpdateCost"
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
          <div class="icon-display margin-icon">
            <div class="list-icon-display" @click="openDisplaySelect()">
              <div
                class="display-icon backgrsvg"
                :class="{ 'display-icon': !isRow, 'icon-display-y': isRow }"
              ></div>
              <div class="select-icon backgrsvg margin-icon"></div>
            </div>
            <div class="display-icon-y" v-if="ischangeDisplay">
              <div class="icon-y" @click="changeDisplay(2)">
                <div class="icon-y_icon">
                  <div class="icon-display-y backgrsvg"></div>
                  <div class="icon-display-y-title">theo chiều ngang</div>
                </div>
              </div>

              <div class="icon-y" @click="changeDisplay(1)">
                <div class="icon-y_icon">
                  <div class="display-icon backgrsvg"></div>
                  <div class="icon-display-y-title">theo chiều dọc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="license-body">
      <splitpanes
        class="default-theme splitpanes-main_license"
        horizontal
        @resize="changeSize($event[0])"
      >
        <pane class="table-one" :size="paneSize">
          <div class="license-action">
            <div class="input-search">
              <BaseInput
                style="margin-right: 10px"
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
              <BaseTooltip position="down" tooltipText="Xóa nhiểu">
                <div
                  v-show="isDeleteMany"
                  class="icon-display icon36 margin-icon"
                  @click="deleteLicense()"
                >
                  <div class="delete-icon backgrsvg box-shadowbl"></div>
                </div>
              </BaseTooltip>
              <BaseTooltip position="down" tooltipText="In">
                <div class="icon-display icon36 margin-icon">
                  <div class="export-icon backgrsvg box-shadowbl"></div>
                </div>
              </BaseTooltip>
              <div class="icon-select icon36 margin-icon">
                <div class="dot-icon backgrsvg"></div>
              </div>
            </div>
          </div>
          <div class="table-license-data">
            <BaseTableLicense
              :isSelectDefault="true"
              :isLicense="true"
              sizeEndRow="250px"
              @updateListId="listIdSelect"
              @getIdByTable="(id, type) => byDataUpdate(id, type)"
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
        <pane class="table-two" :size="100 - paneSize">
          <div class="header-asset-detail">
            <div class="header-asset-detail-title">Thông tin chi tiết</div>
            <BaseTooltip position="left" :tooltipText="textMinmax">
              <div class="maximine-btn" @click="Maximine()">
                <div
                  class="backgrsvg icon14"
                  :class="{
                    'icon-maximaine': paneSize != 0,
                    minimaxi: paneSize == 0,
                  }"
                ></div>
              </div>
            </BaseTooltip>
          </div>

          <BaseTableLicense
            :typeTableData="false"
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
    :titleBtnYes="titleBtnYesMg"
    :titleBtnNo="titleBtnNoMg"
    :typeMessage="typeMessage"
    :titleMessage="midTitleMessage"
    v-if="isMessage"
    @btnYesMessageUpdate="btnYesMessageUpdate"
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
import { getByFilter, getById, deleteManyAssets } from "@/common/api/api";
import { toast } from "vue3-toastify";
import Resource from "@/common/resource/Resource";
import MISAEnum from "@/common/enums/enums";
import DialogMessage from "@/components/message/DialogMessage.vue";

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
    // this.emitter.on("updateListId", (data) => {
    //   console.log(data);
    // });
  },
  data() {
    return {
      isErrorLicense: false,
      typeYesMessage: MISAEnum.typeYesMessage.add,
      titleBtnYesMg: "Có",
      titleBtnNoMg: "Không",
      rootListId: [],
      listIdDelete: [],
      textMinmax: Resource.VN_Maximaine,
      codeLicense: "",
      ischangeDisplay: false,
      isRow: true,
      paneSize: 70,
      oldpaneSize: 0,
      typeHighligh: 1,
      typeMessage: 1,
      midTitleMessage: "11",
      isMessage: false,
      txtSreach: "",
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
        idLicense: "00000000-0000-0000-0000-000000000000",
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
      isDeleteMany: false,
      isShowDialogAsset: false,
      isShowDialogLicense: false,
      listCode: "''",
      listId: [],
      listIdLisecen: [],
      titleDialog: Resource.typeLicensetxt.add,
    };
  },
  methods: {
    /**
     * thay đổi kích thước pane
     * @created : tvt
     * @createday: 20/04/2023
     */
    changeSize(eventS) {
      this.paneSize = eventS.size;
    },
    /**
     * Sửa chứng từ ở pp message
     * @created : tvt
     * @createday: 20/04/2023
     */
    btnYesMessageUpdate() {
      this.isMessage = false;
      this.ToggleDialog();
      this.emitter.emit("updateLicenseMessage");
    },
    /**
     * Xoá chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    deleteYes() {
      if (this.typeYesMessage === MISAEnum.typeYesMessage.delete) {
        deleteManyAssets(
          "Licenses",
          { data: this.listIdDelete },
          () => {
            toast.success(Resource.VN_DeleteSuccess, {
              autoClose: 2000,
              position: "bottom-right",
            });
            // chuyền thông báó xóa thành công để clear mảng xóa nhiều
            this.emitter.emit("LoadingDataDelete");
            // xoa 1 thì là mới mảng

            if (this.listIdDelete.length < 2) {
              this.listIdLisecen = this.listIdLisecen.filter(
                (item) => item !== this.listIdDelete[0]
              );
            } else {
              this.listIdLisecen = [];
              this.listIdDelete = [];
            }

            this.togglerDeletebtn();
            this.isMessageDelete = false;
          },
          (error) => {
            // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
            toast.error(Resource.VN_DeleteFailure, {
              autoClose: 2000,
              position: "bottom-right",
            });
            console.log(error);
          }
        );
      } else {
        this.ToggleDialog();
      }
      this.isMessage = false;
    },
    /**
     * lấy chứng từ theo id
     * @created : tvt
     * @createday: 20/04/2023
     */
    getEntityById(id) {
      getById(
        "Licenses",
        id,
        (res) => {
          this.byTxtMessage(
            Resource.VN_DeleteLicense +
              " << <b>" +
              res.data.license_code +
              "</b> >> " +
              "không?",
            MISAEnum.typeMessage.delete,
            MISAEnum.typeMessage.delete
          );
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
     * danh sach chứng từ chọn bên bảng
     * @created : tvt
     * @createday: 20/04/2023
     */
    listIdSelect(data) {
      this.listIdLisecen = Array.from(data);
      this.togglerDeletebtn();
    },
    /**
     * danh sach chứng từ chọn bên bảng
     * @created : tvt
     * @createday: 20/04/2023
     */
    togglerDeletebtn() {
      if (this.listIdLisecen.length < 2) {
        this.isDeleteMany = false;
      } else {
        this.isDeleteMany = true;
      }
    },

    /**
     * Mở chọn hiển thị
     * @created : tvt
     * @createday: 20/04/2023
     */
    openDisplaySelect() {
      this.ischangeDisplay = !this.ischangeDisplay;
    },
    /**
     * Chọn hiển thị
     * @created : tvt
     * @createday: 20/04/2023
     */
    changeDisplay(typeDislay) {
      if (MISAEnum.typeDisplay.column == typeDislay) {
        this.isRow = true;
        this.paneSize = 70;
      } else {
        this.isRow = false;
        this.paneSize = 100;
      }
      this.ischangeDisplay = false;
    },
    /**
     * phóng to
     * @created : tvt
     * @createday: 20/04/2023
     */
    Maximine() {
      if (this.paneSize !== 0) {
        this.paneSize = 0;
        this.textMinmax = Resource.VN_Maximaine;
      } else {
        this.paneSize = this.oldpaneSize;
        this.textMinmax = Resource.VN_Minimaine;
      }
    },
    /**
     * đóng form thông báo
     * @created : tvt
     * @createday: 20/04/2023
     */
    hideMessage() {
      this.isMessage = false;
      this.isErrorLicense = !this.isErrorLicense;
    },

    /**
     * Hiển thị lỗi thêm chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    erroInsertLicense(mvg, isError) {
      this.isErrorLicense = isError;
      this.byTxtMessage(
        mvg,
        MISAEnum.typeMessage.erro,
        MISAEnum.typeMessage.erro
      );
      this.midTitleMessage = mvg;
      this.isMessage = true;
    },
    /**
     * Setting thông báo
     * @created : tvt
     * @createday: 20/04/2023
     */
    byTxtMessage(mid, type) {
      this.midTitleMessage = mid;
      this.typeMessage = type;
      this.isMessage = true;
    },

    /**
     * đóng form chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    CloseDialogLicense() {
      if (this.titleDialog === Resource.typeLicensetxt.update) {
        this.byTxtMessage(
          Resource.VN_CancelUpdate,
          MISAEnum.typeMessage.update,
          MISAEnum.typeMessage.delete
        );
      } else {
        this.byTxtMessage(
          Resource.VN_CancelAddLicense,
          MISAEnum.typeMessage.delete,
          MISAEnum.typeMessage.update
        );
      }
    },
    /**
     * đóng form update tài sản
     * @created : tvt
     * @createday: 20/04/2023
     */
    closeUpdateCost() {
      this.isUpdateCost = false;
      this.isErrorLicense = !this.isErrorLicense;
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
        "Assets/getByLicense",
        { id: ids },
        (response) => {
          // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
          this.listCode = response.data
            .map((obj) => `'${obj.fixed_asset_id}'`)
            .join(", ");
          this.rootListId = response.data.map((obj) => obj.fixed_asset_id);
          this.selectAsset(response.data.map((obj) => obj.fixed_asset_id));
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
    deleteLicense() {
      this.titleBtnYesMg = "Có";
      this.titleBtnNoMg = "Không";
      this.typeYesMessage = MISAEnum.typeYesMessage.delete;
      this.listIdDelete = this.listIdLisecen;
      if (this.listIdLisecen.length === 0) {
        this.byTxtMessage(
          Resource.VN_DeleteEmptyLicense,
          MISAEnum.typeMessage.erro,
          MISAEnum.typeMessage.erro
        );
      } else if (this.listIdLisecen.length === 1) {
        this.getEntityById(this.listIdLisecen[0]);
      } else if (this.listIdLisecen.length > 1) {
        let str = this.listIdLisecen.length.toString();
        if (this.listIdLisecen.length < 10) {
          str = "0" + this.listIdLisecen.length.toString();
        }
        this.byTxtMessage(
          `<b>${str}</b> ` + Resource.VN_ManyDeleteLicense,
          MISAEnum.typeMessage.delete,
          MISAEnum.typeMessage.erro
        );
      }
    },
    /**
     * Lấy dữ liệu từ bảng chứng từ
     * @created : tvt
     * @createday: 20/04/2023
     */
    byDataUpdate(id, type) {
      this.idLicense = id;
      if (type === MISAEnum.stateAction.update) {
        this.typeYesMessage = MISAEnum.typeYesMessage.update;
        this.titleDialog = Resource.typeLicensetxt.update;
        this.listIdSelectUpdate(id);
        this.ToggleDialog();
        this.typeDialog = MISAEnum.stateDialog.update;
      } else {
        this.titleBtnYesMg = "Có";
        this.titleBtnNoMg = "Không";
        this.getEntityById(id);
        this.typeYesMessage = MISAEnum.typeYesMessage.delete;
        this.listIdDelete = [];
        this.listIdDelete.push(id);
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
      this.paramApiLicenseDetail.id = data;
    },
    /**
     * danh sách tài sản đã chọn
     * @created : tvt
     * @createday: 20/04/2023
     */
    selectAsset(ids) {
      this.isErrorLicense = false;
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
     * ẩn hiện form nhập chứng từ
     * @create by : MF1270
     * @@create day : 19/04/2023
     */
    ToggleDialog() {
      this.isShowDialogLicense = !this.isShowDialogLicense;
      if (!this.isShowDialogLicense) {
        this.listId = [];
        this.listCode = "''";
      }
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
      this.typeYesMessage = MISAEnum.typeYesMessage.add;
      this.idLicense = "00000000-0000-0000-0000-000000000000";
      this.typeDialog = MISAEnum.typeMessage.erro;
      this.titleDialog = Resource.typeLicensetxt.add;
      this.titleBtnYesMg = "Hủy bỏ";
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
      this.isErrorLicense = !this.isErrorLicense;
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
    paneSize(newValue, oldValue) {
      this.oldpaneSize = oldValue;
      console.log(newValue);
    },
    txtSreach: _.debounce(function (data) {
      this.searchInput(data.trim());
    }, 700),
  },
};
</script >

<style >
.table-license-data {
  height: 100%;
}
.minimaxi {
  background-position: -289px -333px;
}
.icon-y {
  width: 100%;
  height: 40px;
}
.icon-y_icon {
  width: 100%;
  padding: 0 4px;
  height: 40px;
  display: flex;
  align-items: center;
}

.icon-y:hover {
  background-color: #d1edf4;
  cursor: pointer;
}
.icon-display-y-title {
  margin-left: 10px;
}
.display-icon-y {
  z-index: 10000;
  position: absolute;
  left: -70px;
  display: flex;
  flex-direction: column;
  height: 80px;
  width: 150px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16) !important;
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