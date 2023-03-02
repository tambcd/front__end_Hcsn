<template>
  <table class="table-assets">
    <tr class="header-table weight700">
      <th class="first-column center input-checkbox" ref="checkBoxAll">
        <input type="checkbox" v-model="stateAll" @click="IsCheckAll" />
      </th>
      <th class="center" style="width: 50px">STT</th>
      <th style="min-width: 150px">Mã tài sản</th>
      <th style="min-width: 150px">Tên tài sản</th>
      <th style="min-width: 150px">Loại tài sản</th>
      <th style="min-width: 150px">Bộ phận sử dụng</th>
      <th class="right" style="min-width: 50px">Số lượng</th>
      <th class="right" style="width: 150px">Nguyên giá</th>
      <th class="right" style="width: 150px">
      <BaseTooltipTable :isInline="true" tooltipContent="Giá trị hoa mòn năm " :show="true">
        <span>HM/KH lũy kế</span>
      </BaseTooltipTable>
      </th>
      <th class="right" style="width: 150px">Giá trị còn lại</th>
      <th style="min-width: 100px" class="The-actions center header-actions">
        Chức năng
      </th>
    </tr>
    <tbody>
      <item-table
        :stateIsAll="listIdSelection"
        @changeDataSelect="changeDataId"
        v-for="(item, index) in listData.data"
        :key="item.fixed_asset_id"
        :dataItem="item"
        :indexItemTable="index + 1"
      />
    </tbody>

    <tr class="Last_row">
      <td colspan="5" class="first-column">
        <div class="the-paging">
          <div class="total">
            Tổng số:
            <span class="weight700">{{ listData.totalRecord }}</span> bản ghi
          </div>
          <div class="drop-paging dropdown">
            <div class="header-dropdown">
              <div class="dropdown-left">
                <div class="dropdown-value">20</div>
              </div>
              <button class="dropdown-icon__right backgrsvg"></button>
            </div>
            <div class="body__dropdown" hidden>
              <div class="item-dropdown">10</div>
              <div class="item-dropdown">40</div>
              <div class="item-dropdown">50</div>
              <div class="item-dropdown">100</div>
            </div>
          </div>
          <div class="number-page">
            <button class="btn-page icon20 btn-back">{{ "<" }}</button>
            <button
              class="btn-page icon20 btn__item"
              :class="{
                'btn-paging__active': priorityFilter.pageNumber == itemPage,
              }"
              v-for="itemPage in listpageNumber"
              :key="itemPage"
              @click="selectNumber(itemPage)"
            >
              {{ itemPage }}
            </button>

            <button class="btn-page icon20 btn-new">
              {{ ">" }}
            </button>
          </div>
        </div>
      </td>

      <td></td>
      <td class="right" style="width: 50px">13</td>
      <td class="right" style="width: 150px">249.000.000</td>
      <td class="right" style="width: 150px">19.176.00</td>
      <td class="right" style="width: 150px">229.284.000</td>
      <td class="The-actions center" style="width: auto"></td>
    </tr>
  </table>
  <the-loading :hidden="isReloadData" />
</template>

<script>
import ItemTable from "./ItemTable.vue";
import { getByFilter } from "@/api/api";
import Resource from "@/resource/Resource";
import TheLoading from "../Loading/TheLoading.vue";
import { toast } from "vue3-toastify";

export default {
  components: { ItemTable, TheLoading },
  async created() {
    this.listIdSelection = new Set()
    await this.LoadDataTable(1);
  },
  data() {
    return {
      stateAll: false,
      listData: [],
      priorityFilter: {
        pageNumber: 1,
        pageSize: 20,
        txtSearch: "",
        DepartmentId: null,
        AssetCategoryId: null,
      },
      listpageNumber: [],
      isReloadData: false,
      listIdSelection: null,
    };
  },
  mounted() {
    /**tải lại data khi thực hiện xóa */
      this.emitter.on("LoadingDataDelete", () => {
      this.LoadDataTable(1);
    });
  },
  methods: {
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Lấy dữ tài sản
     */
    async LoadDataTable(pageNumber) {
      this.isReloadData = false;
      this.stateAll = false;
      this.ClearData();
      await getByFilter(
        "Assets/Filter",
        {
          pageNumber: pageNumber,
          pageSize: this.priorityFilter.pageSize,
          txtSearch: this.priorityFilter.txtSearch,
          DepartmentId: this.priorityFilter.DepartmentId,
          AssetCategoryId: this.priorityFilter.AssetCategoryId,
        },

        (response) => {
          // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
          this.listData = response.data;
          this.HideNumberPage();
          this.isReloadData = true;
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
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * hiển thị số btn của phân trang
     */

    HideNumberPage() {
      if (this.listData.totalPage < 3) {
        this.listpageNumber = ["1", "2", "3"];
      }
      if (this.listData.totalPage > 3) {
        this.listpageNumber = ["1", "2", "...", 4];
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Chọn lại trang load lại giá trí trên table
     */
    selectNumber(numberPage) {
      this.priorityFilter.pageNumber = numberPage;
      this.LoadDataTable(this.priorityFilter.pageNumber);
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * lấy ra id của phần từ được chọn lưu vào mảng
     */
    changeDataId(id) {
      if (id[1]) {
        this.listIdSelection.add(id[0]);
      } else {
        this.listIdSelection.delete(id[0]);
        
      }
      if (this.listIdSelection.size === this.listData.data.length) {
        this.stateAll = true;
      } else {
        this.stateAll = false;
      }
      this.SendDataDelete()
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * xóa tất cả phần tử được chọn
     */
    ClearData() {
      this.listIdSelection.clear();
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * chọn tất cả
     */
    SelectAll() {
      this.listIdSelection.clear();
      this.listData.data.forEach((element) => {
        this.listIdSelection.add(element.fixed_asset_id);
      });

    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * trạng thái bỏ chọn tất cả hoặc chọn tất cả
     */
    IsCheckAll() {
      if (!this.stateAll) {
        this.SelectAll();
      } else {
        this.ClearData();
      }
      this.SendDataDelete()
    },
   /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * gửi danh sách id chọn để thực hiện xóa
     */
  SendDataDelete(){
      this.$emit("updateListId",this.listIdSelection)
  }
  },
 
};
</script>

<style>
</style>