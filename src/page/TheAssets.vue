<template>
  <div class="toolbar">
    <div class="toolbar-filter">
      <the-input
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
          (data, key) => {
            getIdCategory(data, key);
          }
        "
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
          (data, key) => {
            getIdCategory(data, key);
          }
        "
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
        @click="ShowDialog()"
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
    <data-table @updateListId="updateListIdDelete" />
  <dialog-message
    :typeMessage="typeMessagepp"
    :titleMessage="isDeleteMany"
    v-if="isMessageDelete"
    @btnYesMessage="deleteYes"
    @hideMessage="ReLoadingDataDelete"
  />
</template>

<script>
import DataTable from "@/components/table/DataTable.vue";
import TheInput from "@/components/input/BaseInput.vue";
import TheCombobox from "@/components/combobox/BaseCombobox.vue";
import { get, getById, deleteMultiAssets } from "@/api/api.js";
import Resource from "@/resource/Resource";
import { toast } from "vue3-toastify";
import MISAEnum from "@/enums/enums";

export default {
  components: { DataTable, TheInput, TheCombobox },
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
      isDeleteMany: "",
      isMessageDelete: false,
      departments: [],
      assetCategorys: [],
      dataAssets: [],
      listIdDelete: null,
    };
  },
  mounted() {
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
          this.isDeleteMany =
            Resource.VN_DeleteTxt +
            "<< " +
            res.data.fixed_asset_code +
            " - " +
            res.data.fixed_asset_name +
            " >> ?";
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
     * @ create by : MF1270
     * @ create day : 19/02/2023
     * @ hàm : Gửi sự kiên mở dialog btn thêm mới sang component Dialog
     */
    ShowDialog() {
      this.emitter.emit("showDialog", { dataAsset: null, typeDialog: 1 });
    },

    /**
     * Description:  export danh sách tất cả tài sản
     * Author: TVTam
     * created : tvTam (22/02/2023)
     */

    async Export() {
      await get(
        "Assets/Export",
        () => {
          window.open("https://localhost:7115/api/v1/Assets/Export");
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
        this.getAssetById(Array.from(this.listIdDelete)[0]);
      } else {
        this.isDeleteMany = this.listIdDelete.size + Resource.VN_ManyDeleteTxt;
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
        let a = await deleteMultiAssets(
          "Assets",
          Array.from(this.listIdDelete),
          (error) => {
            // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
            toast.error(Resource.VN_DeleteFailure, {
              autoClose: 2000,
              position: "bottom-right",
            });
            console.log(error);
          }
        );
        if (a) {
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          // chuyền thông báó xóa thành công để clear mảng xóa nhiều
          this.emitter.emit("LoadingDataDelete");
          this.isMessageDelete = false;
        }
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

    getIdCategory(data, key) {
      if (key == MISAEnum.typeCombobox.category) {
        this.category.idCategory = data[key + "_id"];
        this.category.nameCategory = data[key + "_name"];
      } else {
        this.deparment.idDepartment = data[key + "_id"];
        this.deparment.nameDepartment = data[key + "_name"];
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