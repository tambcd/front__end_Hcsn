<template>
  <div
    class="table"
    tabindex="0"
    @keyup.prevent="noPressShift()"
    @keydown.prevent="pressShift()"
  >
    <table class="table-assets">
      <tr class="header-table weight700">
        <th class="first-column center input-checkbox" ref="checkBoxAll">
          <input type="checkbox" v-model="stateAll" @click="IsCheckAll" />
        </th>
        <th class="center" >STT</th>
        <th style="min-width: 100px" >Mã tài sản</th>
        <th style="min-width: 100px">Tên tài sản</th>
        <th style="min-width: 70px" >Loại tài sản</th>
        <th style="min-width: 100px" >Bộ phận sử dụng</th>
        <th class="right" style="min-width: 70px">Số lượng</th>
        <th class="right" style="min-width: 70px" >Nguyên giá</th>
        <th class="right" style="min-width: 100px" >
          <BaseTooltipTable
            :isInline="true"
            tooltipContent="Giá trị hao mòn năm "
            :show="true"
          >
            <span>HM/KH lũy kế</span>
          </BaseTooltipTable>
        </th>
        <th class="right" style="min-width: 150px">Giá trị còn lại</th>
        <th style="width: 100px" class="The-actions center header-actions">
          Chức năng
        </th>
      </tr>
      <tbody>
        <item-table
          @click="selectItem(item.fixed_asset_id, index)"
          :selectClick="itemId"
          :stateIsAll="listIdSelection"
          @changeDataSelect="changeDataId"
          v-for="(item, index) in listData.data"
          :key="item.fixed_asset_id"
          :dataItem="item"
          :indexItemTable="index + 1"
        />
      </tbody>
    </table>
  </div>
  <div class="paging">
    <table class="paging-table">
      <tr class="Last_row">
        <td colspan="5" class="first-column" style="min-width: 700px">
          <div class="the-paging">
            <div class="total">
              Tổng số:
              <span class="weight700">{{ listData.totalRecord }}</span> bản ghi
            </div>
            <div class="drop-paging dropdown">
              <div class="header-dropdown">
                <div class="dropdown-left">
                  <div class="dropdown-value">
                    {{ this.priorityFilter.pageSize }}
                  </div>
                </div>
                <button
                  class="dropdown-icon-right backgrsvg"
                  @click="showHideDrop()"
                ></button>
              </div>
              <div class="body-dropdown" :hidden="isDropd">
                <div
                  class="item-dropdown"
                  :class="{ 'is-selection': priorityFilter.pageSize == 15 }"
                  @click="setPageSize(15)"
                >
                  15
                </div>
                <div
                  class="item-dropdown"
                  :class="{ 'is-selection': priorityFilter.pageSize == 50 }"
                  @click="setPageSize(50)"
                >
                  50
                </div>
                <div
                  class="item-dropdown"
                  :class="{ 'is-selection': priorityFilter.pageSize == 70 }"
                  @click="setPageSize(70)"
                >
                  70
                </div>
                <div
                  class="item-dropdown"
                  :class="{ 'is-selection': priorityFilter.pageSize == 100 }"
                  @click="setPageSize(100)"
                >
                  100
                </div>
              </div>
            </div>
            <div class="number-page">
              <button
                :disabled="priorityFilter.pageNumber == 1"
                class="btn-page icon20 btn-back"
                @click="changePage(1)"
              >
                {{ "<" }}
              </button>
              <button
                class="btn-page icon20 btn__item"
                :class="{
                  'btn-paging__active': priorityFilter.pageNumber == itemPage,
                }"
                v-for="itemPage in listpageNumber"
                :key="itemPage"
                @click="selectNumber(itemPage)"
                :disabled="itemPage == '...'"
              >
                {{ itemPage }}
              </button>

              <button
                class="btn-page icon20 btn-new"
                :disabled="priorityFilter.pageNumber == this.listData.totalPage"
                @click="changePage(2)"
              >
                {{ ">" }}
              </button>
            </div>
          </div>
        </td>

        <td></td>
        <td class="right weight700" style="width: 50px">
        <BaseTooltip position="down" tooltipText="Tổng số lượng">           
          
          {{ FormatMoney(totalQuantity.toString()) }}
          </BaseTooltip>
        </td>
        <td class="right weight700" style="width: 150px">
           <BaseTooltip position="down" tooltipText="Tổng nguyên giá"> 
            
          {{ FormatMoney(totalCost.toString()) }}
          </BaseTooltip>
        </td>
        <td class="right weight700" style="width: 150px">
           <BaseTooltip
             position="down"
            tooltipText="Tổng hao mòn lũy kế"
          >
          
          {{ FormatMoney(totalAtrophy.toString()) }}
          </BaseTooltip>
        </td>
        <td class="right weight700" style="width: 150px">
           <BaseTooltip
            position="down"
            tooltipText="Tổng giá trị còn lại"         
          >
          {{ FormatMoney((totalCost - totalAtrophy).toString()) }}
          </BaseTooltip>
        </td>
        <td class="The-actions center" style="width: 100px"></td>
      </tr>
    </table>
  </div>
  <the-loading :hidden="isReloadData" />
</template>

<script>
import ItemTable from "./ItemTable.vue";
import { getByFilter } from "@/api/api";
import Resource from "@/resource/Resource";
import TheLoading from "../Loading/TheLoading.vue";
import { toast } from "vue3-toastify";
import MISAEnum from "@/enums/enums";
import { FormatMoney } from "@/assets/js/Format";

export default {
  components: { ItemTable, TheLoading },
  async created() {
    this.listIdSelection = new Set();
    await this.LoadDataTable(1);
  },
  
  data() {
    return {
      isRechange:false,
      selectStart: 0,
      selectEnd: 0,
      numberItem: 0,
      numberArrowIndext: 0,
      isShift: false,
      itemId: "",
      totalAtrophy: 0,
      totalQuantity: 0,
      totalCost: 0,
      valueRemaining: 0,
      isDropd: true,
      stateAll: false,
      listData: [],
      priorityFilter: {
        pageNumber: 1,
        pageSize: 15,
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

    this.emitter.on("showLoading", (state) => {
      this.isReloadData = state;
    });
    // tải lại dữ liêu sau khi thêm - sửa
    this.emitter.on("ReloadData", (state) => {
      if (state === MISAEnum.stateDialog.add) {
        this.LoadDataTable(1);
      } else {
        this.LoadDataTable(this.priorityFilter.pageNumber);
      }
    });
    // lọc tài sản
    this.emitter.on("filterAssets", (data) => {
      this.priorityFilter.txtSearch = data[0].toString();
      this.priorityFilter.AssetCategoryId = data[2].toString();
      this.priorityFilter.DepartmentId = data[1].toString();
      try {
        this.LoadDataTable(1);
      } catch (error) {
        console.log(error);
      }
    });
  },

  methods: {
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * sự kiện nhấn giữ phím shift và nút lên xuống để thực hiện chọn nhiều phần tử
     */
    pressShift() {
      if (event.key == "Shift") {
        this.isShift = true;
      }
      if (
        event.code == "ArrowDown" &&
        this.numberArrowIndext < this.listData.data.length    
      ) {
        if(this.isShift){
          this.isRechange = false;
          
          this.changeDataId([this.listData.data[this.numberArrowIndext].fixed_asset_id, true]);
          this.changeDataId([this.listData.data[this.numberArrowIndext+1].fixed_asset_id, true]);
        }
        if(this.numberArrowIndext >= this.listData.data.length - 1){
          console.log();
          this.numberArrowIndext = this.listData.data.length - 1;
        }
        else{

          this.numberArrowIndext++;
            if(this.isShift){
            this.changeDataId([this.listData.data[this.numberArrowIndext].fixed_asset_id, true]);

        }
        }
      
      }
      if (event.code == "ArrowUp" && this.numberArrowIndext >= 0) {

        if(this.isShift){
          this.isRechange = true;
          this.changeDataId([this.listData.data[this.numberArrowIndext].fixed_asset_id, true]);
          this.changeDataId([this.listData.data[this.numberArrowIndext-1].fixed_asset_id, true]);
        }
        if(this.numberArrowIndext <=0){
             this.numberArrowIndext ==0
      }
      else{
          this.numberArrowIndext--;
           if(this.isShift){
            this.changeDataId([this.listData.data[this.numberArrowIndext].fixed_asset_id, true]);

        }
      }
      }
      this.itemId = this.listData.data[this.numberArrowIndext].fixed_asset_id;
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * sự kiện bỏ phím shift
     */
    noPressShift() {
      if (event.key == "Shift") {
        this.isShift = false;
      }
      if (event.code == "ArrowUp" || event.code == "ArrowDown") {
                this.numberItem = this.numberArrowIndext
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Lấy dữ tài sản
     */
    async LoadDataTable(pageNumber) {
      this.isReloadData = false;
      this.stateAll = false;
      this.ClearData();
      this.totalCost = 0;
      this.totalQuantity = 0;
      this.totalAtrophy = 0;
      await getByFilter(
        "Assets/getByFilter",
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
          this.totalCost = response.data.totalCost;
          this.totalAtrophy = response.data.totalDepreciationValue;
          this.totalQuantity = response.data.totalQuantity;
          this.valueRemaining = this.totalCost - this.totalAtrophy;
          this.hideNumberPage();
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
     * created : tvTam (1/03/2023)
     * đến trang phía sau-trước
     */
    changePage(state) {
      if (state == 1) {
        this.priorityFilter.pageNumber = this.priorityFilter.pageNumber - 1;
        this.LoadDataTable(this.priorityFilter.pageNumber);
      } else {
        this.priorityFilter.pageNumber = this.priorityFilter.pageNumber + 1;
        this.LoadDataTable(this.priorityFilter.pageNumber);
      }
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * hiển thị số btn của phân trang
     */

    hideNumberPage() {
      this.listpageNumber = [];
      if (this.listData.totalPage <= 6) {
        for (let index = 0; index < this.listData.totalPage; index++) {
          this.listpageNumber.push(index + 1);
        }
      }
      if (this.listData.totalPage > 6) {
        if (this.priorityFilter.pageNumber <= 2) {
          this.listpageNumber = ["1", "2", "3", "...", this.listData.totalPage];
        }
        if (
          this.priorityFilter.pageNumber > 2 &&
          this.priorityFilter.pageNumber < this.listData.totalPage - 2
        ) {
          this.listpageNumber = [
            "1",
            this.priorityFilter.pageNumber - 1,
            this.priorityFilter.pageNumber,
            this.priorityFilter.pageNumber + 1,
            "...",
            this.listData.totalPage,
          ];
        }
        if (this.listData.totalPage - 2 === this.priorityFilter.pageNumber) {
          this.listpageNumber = [
            "1",
            "...",
            this.priorityFilter.pageNumber - 1,
            this.priorityFilter.pageNumber,
            this.priorityFilter.pageNumber + 1,
            this.listData.totalPage,
          ];
        }
        if (this.listData.totalPage === this.priorityFilter.pageNumber) {
          this.listpageNumber = [
            "1",
            "...",
            this.priorityFilter.pageNumber - 1,
            this.priorityFilter.pageNumber,
            this.priorityFilter.pageNumber + 1,
            this.listData.totalPage,
          ];
        }
        if (this.priorityFilter.pageNumber > this.listData.totalPage - 2) {
          this.listpageNumber = [
            "1",
            "...",
            this.listData.totalPage - 3,
            this.listData.totalPage - 2,
            this.listData.totalPage - 1,
            this.listData.totalPage,
          ];
        }
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Chọn lại trang load lại giá trí trên table
     */
    selectNumber(numberPage) {
      this.priorityFilter.pageNumber = Number(numberPage);
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
      this.SendDataDelete();
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
      this.SendDataDelete();
    },
    /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * gửi danh sách id chọn để thực hiện xóa
     */
    SendDataDelete() {
      this.$emit("updateListId", this.listIdSelection);
    },
    /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * ẩn hiện droplist
     */

    showHideDrop() {
      this.isDropd = !this.isDropd;
    },
    /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * đổi số bản ghi trên trang
     */
    setPageSize(size) {
      this.priorityFilter.pageSize = size;
      this.showHideDrop();
      this.LoadDataTable(1);
    },

    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : danh dấu item khi click
     */
    selectItem(id, index) {
      this.itemId = id;
      if (index >= this.numberItem) {
        this.selectStart = this.numberItem;
        this.selectEnd = index;
      } else {
        this.selectStart = index;
        this.selectEnd = this.numberItem;
      }
      this.numberItem = index;
      this.numberArrowIndext = index;
      if (this.isShift) {
        this.ClearData();
        for (
          let index = this.selectStart;
          index < this.selectEnd + 1;
          index++
        ) {
          this.changeDataId([this.listData.data[index].fixed_asset_id, true]);
        }
      }
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */

    FormatMoney(dataFormat) {
      return FormatMoney(dataFormat);
    },
  },
  watch: {
    isRechange(value){
      this.ClearData()
              this.changeDataId([this.listData.data[this.numberArrowIndext].fixed_asset_id, true]);

      if(value){
        this.changeDataId([this.listData.data[this.numberArrowIndext+1].fixed_asset_id, true]);

      }
      else{
          this.changeDataId([this.listData.data[this.numberArrowIndext-1].fixed_asset_id, true]);

      }


    }
  },
};
</script>

<style>
</style>