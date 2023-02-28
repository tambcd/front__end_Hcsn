<template>
  <table class="table__assets">
    <tr class="header__table weight700">
      <th class="first__column center input_checkbox" ref="checkBoxAll">
        <input type="checkbox" v-model="stateAll" @click="IsCheckAll" />
      </th>
      <th class="center" style="width: 50px">STT</th>
      <th style="min-width: 150px">Mã tài sản</th>
      <th style="min-width: 150px">Tên tài sản</th>
      <th style="min-width: 150px">Loại tài sản</th>
      <th style="min-width: 150px">Bộ phận sử dụng</th>
      <th class="right" style="min-width: 50px">Số lượng</th>
      <th class="right" style="width: 150px">Nguyên giá</th>
      <th class="right" style="width: 150px">HM/KH lũy kế</th>
      <th class="right" style="width: 150px">Giá trị còn lại</th>
      <th style="min-width: 100px" class="The-actions center header-actions">
        Chức năng
      </th>
    </tr>
    <tbody>
      <item-table
        :stateIsAll="stateAll"
        @changeDataSelect="changeDataId"
        v-for="(item, index) in listData.data"
        :key="item.fixed_asset_id"
        :dataItem="item"
        :indexItemTable="index + 1"
      />
    </tbody>

    <tr class="Last_row">
      <td colspan="5" class="first__column">
        <div class="the-paging">
          <div class="total">
            Tổng số:
            <span class="weight700">{{ listData.totalRecord }}</span> bản ghi
          </div>
          <div class="drop__paging dropdown">
            <div class="header__dropdown">
              <div class="dropdown-left">
                <div class="dropdown-value">20</div>
              </div>
              <button class="dropdown-icon__right backgrsvg"></button>
            </div>
            <div class="body__dropdown" hidden>
              <div class="item__dropdown">10</div>
              <div class="item__dropdown">40</div>
              <div class="item__dropdown">50</div>
              <div class="item__dropdown">100</div>
            </div>
          </div>
          <div class="number__page">
            <button class="btn__page icon20 btn__back">{{ "<" }}</button>
            <button
              class="btn__page icon20 btn__item"
              :class="{
                'btn-paging__active': priorityFilter.pageNumber == itemPage,
              }"
              v-for="itemPage in listpageNumber"
              :key="itemPage"
              @click="selectNumber(itemPage)"
            >
              {{ itemPage }}
            </button>

            <button class="btn__page icon20 btn__new">
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
  <the-loading hidden />
</template>

<script>
import ItemTable from "./ItemTable.vue";
import { getByFilter } from "@/api/api";
import Resource from "@/resource/Resource";
import TheLoading from "../Loading/TheLoading.vue";
export default {
  components: { ItemTable, TheLoading },
  async created() {
    this.LoadDataTable();
  },
  data() {
    return {
      stateAll: false,
      listData: [],
      priorityFilter: {
        pageNumber: 1,
        pageSize: 5,
        txtSearch: "",
        DepartmentId: null,
        AssetCategoryId: null,
      },
      listpageNumber: [],
      isReloadData: false,
      listIdSelection: [],
    };
  },
  methods: {
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Lấy dữ tài sản
     */
    async LoadDataTable() {
      this.isReloadData = false;
      await getByFilter(
        "Assets/Filter",
        {
          pageNumber: this.priorityFilter.pageNumber,
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
        () => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(Resource.VN_ErroData);
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
      this.LoadDataTable();
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * lấy ra id của phần từ được chọn lưu vào mảng
     */
    changeDataId(id) {
      if (id[1]) {
        this.listIdSelection.push(id[0]);
      } else {
        this.listIdSelection = this.listIdSelection.filter(
          (item) => item !== id[0]
        );
      }
      if (this.listIdSelection.length === this.listData.data.length) {
        this.stateAll = true;
      } else {
        this.stateAll = false;
      }
      console.log(this.listIdSelection);
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * xóa tất cả phần tử được chọn
     */
    ClearData() {
      this.listIdSelection = [];
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * chọn tất cả
     */
    SelectAll() {
      this.listIdSelection = [];
      this.listData.data.forEach((element) => {
        this.listIdSelection.push(element.fixed_asset_id);
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
        console.log(this.listIdSelection);
      }
    },
  },
  // watch: {
  //   listIdSelection(old,state) {
  //     console.log(old);
  //     console.log(state);
  //   },
  //   immediate:true
  // },
};
</script>

<style>
</style>