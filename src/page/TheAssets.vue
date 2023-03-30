<template>
  <div class="toolbar">
    <div class="toolbar-filter">
      <the-input
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
        @selectItemCombobox="
          (data, key,text) => {
            getIdCategory(data, key,text);
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
          (data, key,text) => {
            getIdCategory(data, key,text);
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
          :disabled="!listIdDelete || this.listIdDelete.size == 0"
          class="btn__delete icon36 button-icon backgrsvg"
          @click="deleteAssets()"
        ></button>
      </BaseTooltip>
    </div>
  </div>
    <data-table @updateListId="updateListIdDelete" />

    <DialogAssets v-if="showHideDialog"
    :assetItem="itemAsset"
    :typeD="typeDialog"
     @closeDialog ="closeDialog()"     />
  <dialog-message
    :typeMessage="typeMessagepp"
    :typeHighligh ="typeHighligh"
    :titleMessage="isDeleteMany"
    :titleMessagebottom="titleMessagebottom"
    :titleMessageheader ="titleMessageheader"
    v-if="isMessageDelete"
    @btnYesMessage="deleteYes"
    @hideMessage="ReLoadingDataDelete"
  />
</template>

<script>
import DataTable from "@/components/table/DataTable.vue";
import TheInput from "@/components/input/BaseInput.vue";
import TheCombobox from "@/components/combobox/BaseCombobox.vue";
import { get, getById,deleteManyAssets } from "@/api/api.js";
import Resource from "@/resource/Resource";
import { toast } from "vue3-toastify";
import MISAEnum from "@/enums/enums";
import DialogAssets from '@/components/dialog/DialogAssets.vue';

export default {
  components: { DataTable, TheInput, TheCombobox, DialogAssets },
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
  },
  data() {
    return {
      itemAsset:{},
      typeDialog:1,
      showHideDialog:false,
      txtSreach: "",
      deparment:{
        nameDepartment:"",
        idDepartment: "",
      },
      category:{
        nameCategory:"",
        idCategory: "",
      },
      typeMessagepp: 2,
      typeHighligh: 1,
      isDeleteMany: "",
      titleMessageheader: "",
      titleMessagebottom: "",
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
      this.typeDialog =data.typeDialog,
      this.itemAsset =  data.dataAsset
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
     * Last Edited: 5/2/2023
     * Lấy thông tài sản theo ID
     */
    async getAssetById(id) {
      await getById(
        "Assets",
        id,
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          this.titleMessageheader = Resource.VN_DeleteTxt + " " 
          this.isDeleteMany =          
            res.data.fixed_asset_code +
            " - " +
            res.data.fixed_asset_name 
            this.titleMessagebottom = "  ?";
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
    closeDialog(){
       this.showHideDialog = false;
    },
    /**
     * @ create by : MF1270
     * @ create day : 19/02/2023
     * @ hàm : Gửi sự kiên mở dialog btn thêm mới sang component Dialog
     */
    showDialogAsset() {
      this.showHideDialog = true;
      this.typeDialog =1,
      this.itemAsset = {}
    },

    /**
     * Description:  export danh sách tất cả tài sản
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    async Export() {
      await get(
        "Assets/Export",{
          txtSearch : this.txtSreach,
          DepartmentId: this.deparment.idDepartment,
          AssetCategoryId : this.category.idCategory
        },
        () => {
          window.open(`https://localhost:7115/api/v1/Assets/Export?txtSearch=${this.txtSreach}&DepartmentId=${this.deparment.idDepartment}&AssetCategoryId=${this.category.idCategory}`);
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
      this.typeMessagepp = 2;
      if (this.listIdDelete.size == 1) {
        this.typeHighligh = 2;
        this.getAssetById(Array.from(this.listIdDelete)[0]);
      } else {
           this.typeHighligh = 1;
        if (this.listIdDelete.size < 10) {
          this.titleMessageheader = '0' + this.listIdDelete.size
           this.isDeleteMany = Resource.VN_ManyDeleteTxt;
            this.titleMessagebottom = "";
        }
        else{

          this.titleMessageheader =  this.listIdDelete.size
           this.isDeleteMany = Resource.VN_ManyDeleteTxt;
            this.titleMessagebottom = "";
        }
      }
      this.isMessageDelete = true;
    },
    /**
     * xác nhận xóa và xóa nhiều
     * Author: TVTam
     * Last Edited: 28/02/2023
     */

    async deleteYes() {
      try {
        // xóa nhiều thì mảng xóa đc cập nhập data
        await deleteManyAssets(
          "Assets",
          {data: Array.from(this.listIdDelete)},
          ()=>{
              toast.success(Resource.VN_DeleteSuccess, {
              autoClose: 2000,
               position: "bottom-right",
          });
          // chuyền thông báó xóa thành công để clear mảng xóa nhiều
          this.emitter.emit("LoadingDataDelete");
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
        
      } catch (error) {
        toast.error(Resource.VN_DeleteEmpty, {
          autoClose: 2000,
          position: "bottom-right",
        });
        console.log(error);
        this.$emit("hideMessage");
      }
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
    ReLoadingDataDelete() {
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
    searchInputEnter(){     
           
        if(event.code== 'Enter')          
          {
            this.searchInput()
          }         
           
    
    },
    getIdCategory(data,key,text) {

      if (key == MISAEnum.typeCombobox.category) {
      if(data ===null){
        this.category.idCategory = "";
        this.category.nameCategory = "134";
      }
      else{

        this.category.idCategory = data[key + "_id"];
        this.category.nameCategory = text;
      }
      } else {
        if(data ===null){
        this.deparment.idDepartment = "";
        this.deparment.nameDepartment = text;
      }
      else{

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
};
</script>

<style>
</style>