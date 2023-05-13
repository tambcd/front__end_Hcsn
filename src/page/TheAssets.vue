<template>
  <div class="toolbar">
    <div class="toolbar-filter">
      <the-input
        style="margin-right: 10px"
        @keyDownbaseInput="searchInputEnter()"
        heightInput="35"
        widthInput="179"
        :iconLeft="true"
        contentInput="Tìm kiếm tài sản..."
        @sendValueInput="
          (e) => {
            this.txtSreach = e;
          }
        "
        @searchInput="searchInput()"
      />
      <the-combobox
        style="margin-right: 10px"
        @selectItemCombobox="
          (data, key, text) => {
            getIdCategory(data, key, text);
          }
        "
        :allItem="true"
        :valueSelect="category.nameCategory"
        dataContent="fixed_asset_category_name"
        :DataCombobox="assetCategorys"
        keyData="fixed_asset_category"
        contentComboxbox="Loại tài sản"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />

      <the-combobox
        @selectItemCombobox="
          (data, key, text) => {
            getIdCategory(data, key, text);
          }
        "
        :allItem="true"
        :valueSelect="deparment.nameDepartment"
        dataContent="department_name"
        :DataCombobox="departments"
        keyData="department"
        contentComboxbox="Bộ phận sử dụng"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />
    </div>

    <div class="toolbar-action">
      <TheButton
        btnName="+ Thêm tài sản"
        class="btn-add"
        @click="showDialogAsset()"
        btnType="2"
      />
      <BaseTooltip position="down" tooltipText="xuất khẩu">
        <button
          class="btn-export icon36 button-icon backgrsvg"
          @click="Export()"
        ></button>
      </BaseTooltip>
      <BaseTooltip position="down" tooltipText="Xóa">
        <button
          class="btn__delete icon36 button-icon backgrsvg"
          @click="deleteAssets()"
        ></button>
      </BaseTooltip>
    </div>
  </div>
  <BaseDataTable
    @updateListId="updateListIdDelete"
    :modelHeaderTable="headerTable"
    @openFormAddNew="showDialogAsset()"
    @deleteAssetContextMenu="(data) => deleteContextMenu(data)"
  />

  <DialogAssets
    v-if="showHideDialog"
    :assetItem="itemAsset"
    :typeD="typeDialog"
    @closeDialog="closeDialog()"
  />
  <dialog-message
    :typeMessage="typeMessagepp"
    :titleMessage="isDeleteMany"
    v-if="isMessageDelete"
    @btnYesMessage="deleteYes"
    @hideMessage="reLoadingDataDelete"
  />
</template>

<script>
import DataObject from "@/common/dataobject/model";
import TheInput from "@/components/input/BaseInput.vue";
import TheCombobox from "@/components/combobox/BaseCombobox.vue";
import BaseDataTable from "@/components/table/BaseDataTable.vue";
import DialogAssets from "@/components/dialog/DialogAssets.vue";
import Resource from "@/common/resource/Resource";
import MISAEnum from "@/common/enums/enums";
import {
  get,
  getById,
  deleteManyAssets,
} from "@/common/api/api.js";
import { toast } from "vue3-toastify";
import _ from "lodash";

export default {
  name: "TheAssets",
  components: { TheInput, TheCombobox, DialogAssets, BaseDataTable },
  created() {
    /**
     * Author: TVTam
     * created : tvTam (22/02/2023)
     * Lấy dữ liệu phòng ban
     */
    get(
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
    get(
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
  data() {
    return {
      idDeleteContext: "",
      typeDelete: 1,
      headerTable: DataObject.headerTable,
      itemAsset: {},
      typeDialog: 1,
      showHideDialog: false,
      txtSreach: "",
      deparment: {
        nameDepartment: "",
        idDepartment: "",
      },
      category: {
        nameCategory: "",
        idCategory: "",
      },
      typeMessagepp: 2,
      isDeleteMany: "",
      isMessageDelete: false,
      departments: [],
      assetCategorys: [],
      dataAssets: [],
      listIdDelete: "null",
    };
  },
  mounted() {
    /** mở form thêm sửa cùng dữ liệu */

    this.emitter.on("showDialog", (data) => {
      this.showHideDialog = true;
      (this.typeDialog = data.typeDialog), (this.itemAsset = data.dataAsset);
    });
    this.emitter.on("messageValidate", (data) => {
      this.isMessageDelete = true;
      this.typeMessagepp = data[1];
      if (data[2] === 1) {
        this.isDeleteMany =
          Resource.MapNameAsset[data[0]] + Resource.VN_EmptyData;
      } else {
        this.isDeleteMany =
          Resource.MapNameAsset[data[0]] + Resource.VN_NumberSS;
      }
    });
  },
  methods: {
    /**
     * Author: TVTam
     * Last Edited: 9/04/2023
     * xóa tài sản từ context menu
     */
    deleteContextMenu(asset) {
      this.typeDelete = MISAEnum.typeDelete.delete;     
      this.isDeleteMany =  Resource.VN_DeleteTxt + " "+ 
      "<b> " + asset.fixed_asset_code +  " - " +  asset.fixed_asset_name + " </b>" +  "  ?";
      this.isMessageDelete = true;
    },
    /**
     * Author: TVTam
     * Last Edited: 5/2/2023
     * Lấy thông tài sản theo ID
     */
    async getAssetById(id) {
      await getById(
        "Assets",
        id,
        (res) => {
          this.deleteContextMenu(res.data) 
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
     * @create day : 19/02/2023
     * @hàm : đóng form
     */
    closeDialog() {
      this.showHideDialog = false;
    },
    /**
     * @ create by : MF1270
     * @ create day : 19/02/2023
     * @ hàm : Gửi sự kiên mở dialog btn thêm mới sang component Dialog
     */
    showDialogAsset() {
      this.showHideDialog = true;
      (this.typeDialog = 1), (this.itemAsset = {});
    },

    /**
     * Description:  export danh sách tất cả tài sản
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    async Export() {
      await get(
        "Assets/Export",
        {
          txtSearch: this.txtSreach,
          DepartmentId: this.deparment.idDepartment,
          AssetCategoryId: this.category.idCategory,
        },
        () => {
          window.open(
            `https://localhost:7115/api/v1/Assets/Export?txtSearch=${this.txtSreach}&DepartmentId=${this.deparment.idDepartment}&AssetCategoryId=${this.category.idCategory}`
          );
          toast.success(Resource.VN_ExportSucces, {
            autoClose: 2000,
            position: "bottom-right",
          });
        },
        () => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ExportErro, {
            autoClose: 2000,
            position: "bottom-right",
          });
        }
      );
    },

    /**
     * thực hiện xóa và xóa nhiều
     * Author: TVTam
     * Last Edited: 28/02/2023
     */
    deleteAssets() {
      this.typeDelete = MISAEnum.typeDelete.allDelete;
      this.typeMessagepp = MISAEnum.typeDelete.delete;
      if (this.listIdDelete.size < 1 || !this.listIdDelete.size) {
        this.typeMessagepp = MISAEnum.typeDelete.allDelete;
        this.isDeleteMany = Resource.VN_NotDataDelete;
      }
      if (this.listIdDelete.size == MISAEnum.typeDelete.allDelete) {
        this.getAssetById(Array.from(this.listIdDelete)[0]);
      }

      if (this.listIdDelete.size > 1) {
        if (this.listIdDelete.size < 10) {
          this.isDeleteMany = "<b>0" + this.listIdDelete.size +"</b>"+ Resource.VN_ManyDeleteTxt;
        } else {
          this.isDeleteMany = "<b>" + this.listIdDelete.size +"</b>"+ Resource.VN_ManyDeleteTxt;
        }
      }
      this.isMessageDelete = true;
    },
    /**
     * xác nhận xóa và xóa nhiều
     * Author: TVTam
     * Last Edited: 28/02/2023
     */

    deleteYes() {
 
        deleteManyAssets(
          "Assets",
          { data: Array.from(this.listIdDelete) },
          () => {
            toast.success(Resource.VN_DeleteSuccess, {
              autoClose: 2000,
              position: "bottom-right",
            });
            // chuyền thông báó xóa thành công để clear mảng xóa nhiều
            this.emitter.emit("LoadingDataDelete");
            this.isMessageDelete = false;
          },
          (error) => {           

            this.messageDeleteError(error.response.data.erros);
          }
        );
      
    },

    /**
     * Description:  cập nhập id chọn tại table
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    messageDeleteError(titleError) {
      this.typeMessagepp = MISAEnum.typeDelete.allDelete;
     
        this.isDeleteMany = titleError;
      
    },
    /**
     * Description:  cập nhập id chọn tại table
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    updateListIdDelete(e) {
      this.listIdDelete = e;
    },

    /**
     * Description: Load lại data khi xóa
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    reLoadingDataDelete() {
      this.isMessageDelete = false;
    },
    /**
     * Description: Tìm kiếm text
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    searchInput() {
      this.emitter.emit("filterAssets", [
        this.txtSreach,
        this.deparment.idDepartment,
        this.category.idCategory,
      ]);
    },
    /**
     * Description: Tìm kiếm text keydown enter
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */
    searchInputEnter() {
      if (event.code == "Enter") {
        this.searchInput();
      }
    },
    getIdCategory(data, key, text) {
      if (key == MISAEnum.typeCombobox.category) {
        if (data === null) {
          this.category.idCategory = "";
          this.category.nameCategory = "";
        } else {
          this.category.idCategory = data[key + "_id"];
          this.category.nameCategory = text;
        }
      } else {
        if (data === null) {
          this.deparment.idDepartment = "";
          this.deparment.nameDepartment = text;
        } else {
          this.deparment.idDepartment = data[key + "_id"];
          this.deparment.nameDepartment = text;
        }
      }

      this.emitter.emit("filterAssets", [
        this.txtSreach,
        this.deparment.idDepartment,
        this.category.idCategory,
      ]);
    },
  },
  watch: {
    txtSreach: _.debounce(function () {
      this.searchInput();
    }, 700),
  },
};
</script>

<style>
</style>