<template>
  <base-context-menu
    v-if="isContextMenu"
    :positionTop="positionContextMenuY"
    :positionleft="positionContextMenuX"
    :asset="dataContextMenu"
    @openAdd="showAddNewAsset()"
    @openUpdate="(dataAsset) => showUpdateAsset(dataAsset)"
    @openDelete="(dataAsset) => showDeleteAsset(dataAsset)"
    @openReplication="(dataAsset) => showReplicationAsset(dataAsset)"
    @closeContextMenu="closeContextMenu()"
  />
  <div
    :class="{ 'table-paging': statePaging }"
    @mouseup="noReSizeColumn()"
    class="table-base"
    tabindex="0"
    @keyup="noPressShift()"
    @keydown="pressShift()"
  >
    <table class="table-assets">
      <tr class="header-table weight700">
        <th
          v-if="stateCheckbox"
          class="first-column center input-checkbox"
          ref="checkBoxAll"
          style="min-width: 50px"
        >
          <input type="checkbox" v-model="stateAll" @click="isCheckAll" />
        </th>
        <th
          :class="item.alignment"
          :style="{
            'min-width': item.minWith,
            width: item.withBase,
          }"
          v-for="(item, index) in headerTable"
          :key="index"
        >
          <BaseTooltip
            position="down"
            :tooltipText="item.nameTooltip"
            v-if="item.directiveTooltip"
          >
            <span>{{ item.nameColumn }} </span>
          </BaseTooltip>
          <span v-else>{{ item.nameColumn }} </span>
          <!-- <div
            :class="{ 'resize-column': item.isResize }"
            @mousedown="getPositionCurrent($event)"
            @mousemove="reSizeColumn($event)"
            @mouseup="noReSizeColumn()"
          ></div> -->
        </th>
      </tr>
      <td
        class="not-data"
        v-if="listDataItemTabel.length == 0 && !stateCheckbox"
        :colspan="headerTable.length"
      >
        <div class="icon-no_data">
          <div class="icon-data-no backgrsvg-table"></div>
        </div>
        <div class="title-not-data">không có dữ liệu</div>
      </td>
      <td
        class="not-data"
        v-if="listDataItemTabel.length == 0 && stateCheckbox"
        :colspan="headerTable.length + 1"
      >
        <div class="icon-no_data">
          <div class="icon-data-no backgrsvg-table"></div>
        </div>
        <div class="title-not-data">không có dữ liệu</div>
      </td>
      <tbody>
        <BaseItemTableLicense
          @selectIdItemTable="
            (id, type) => {
              getId(id, type);
            }
          "
          :keyTable="nameTable"
          :isCheckbox="stateCheckbox"
          :typeTable="typeTableData"
          :showClomn="bodyTable"
          @openContextMenu="(asset, x, y) => openContextMenu(asset, x, y)"
          @click="selectItem(item[nameTable + '_id'], index)"
          :selectClick="itemId"
          :stateIsAll="listIdSelection.has(item[nameTable + '_id'])"
          @changeDataSelect="changeDataId"
          v-for="(item, index) in listDataItemTabel"
          :key="item[nameTable + '_id']"
          :dataItem="item"
          :indexItemTable="index + 1"
        />
      </tbody>
    </table>
  </div>
  <div class="paging" v-if="statePaging">
    <table class="paging-table">
      <tr class="Last_row">
        <td colspan="5" class="first-column">
          <div class="the-paging">
            <div class="total">
              Tổng số:
              <span class="weight700">{{ listData.totalRecord || "0" }}</span>
              bản ghi
            </div>
            <div class="drop-paging dropdown">
              <div class="header-dropdown" @click="showHideDrop()">
                <div class="dropdown-left">
                  <div class="dropdown-value">
                    {{ this.priorityFilter.pageSize }}
                  </div>
                </div>
                <button class="dropdown-icon-right backgrsvg"></button>
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
                :class="{ 'disabled-next': priorityFilter.pageNumber == 1 }"
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
                :class="{
                  'disabled-next':
                    priorityFilter.pageNumber == this.listData.totalPage,
                }"
                :disabled="priorityFilter.pageNumber == this.listData.totalPage"
                @click="changePage(2)"
              >
                {{ ">" }}
              </button>
            </div>
          </div>
        </td>

        <td class="right weight700" style="width: 150px">
          <span v-show="totalCost">
            {{ formatMoney(totalCost.toString()) }}</span
          >
        </td>
        <td class="right weight700" style="width: 150px" :hidden="isLicense">
          <span v-show="totalAtrophy"
            >{{ formatMoney(totalAtrophy.toString()) }}
          </span>
        </td>
        <td class="right weight700" :style="{ width: sizeEndRow }">
          <span v-show="totalCost && totalAtrophy">
            {{ formatMoney((totalCost - totalAtrophy).toString()) }}</span
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getByFilter } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { formatMoney } from "@/common/helper/format";
import Resource from "@/common/resource/Resource";
import MISAEnum from "@/common/enums/enums";
import BaseItemTableLicense from "./BaseItemTableLicense.vue";
import BaseContextMenu from "../contextmenu/BaseContextMenu.vue";

export default {
  name: "DataTable",
  props: {
    sizeEndRow: {
      default: "150px",
    },
    isLicense: { default: false },
    typeTableData: {
      default: true,
    },
    dataTable: {
      default: null,
    },
    urlApi: {
      default: "",
    },
    objectParamApi: {},
    nameTable: {
      default: "",
    },
    stateCheckbox: {
      default: true,
    },
    statePaging: {
      default: true,
    },
    headerTable: [],
    bodyTable: [],
  },
  components: { BaseContextMenu, BaseItemTableLicense },
  async created() {
    this.listIdSelection = new Set();
    this.priorityFilter = this.objectParamApi;
    await this.loadDataTable(1);
  },

  data() {
    return {
      listDataItemTabel: [],
      isContextMenu: false,
      positionContextMenuX: 110,
      positionContextMenuY: 110,
      dataContextMenu: {},
      curCol: undefined,
      nxtCol: undefined,
      pageX: undefined,
      nxtColWidth: undefined,
      curColWidth: undefined,
      isRechange: false,
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
      priorityFilter: {},
      listpageNumber: [],
      listIdSelection: null,
    };
  },
  mounted() {
    /**tải lại data khi thực hiện xóa */
    this.emitter.on("LoadingDataDelete", () => {
      this.loadDataTable(1);
    });

    // tải lại dữ liêu sau khi thêm - sửa
    this.emitter.on("ReloadData", (state) => {
      this.priorityFilter.txtSearch = "";
      if (state === MISAEnum.stateDialog.add) {
        this.loadDataTable(1);
      } else {
        this.loadDataTable(this.priorityFilter.pageNumber);
      }
    });
  },

  methods: {
    /**
     * Author: TVTam
     * created : tvTam (09/04/2023)
     * Lấy ra id từ item table
     */
    getId(id, type) {
      this.$emit("getIdByTable", id, type);
    },
    /**
     * Author: TVTam
     * created : tvTam (09/04/2023)
     * Xác định vị trí và mở context menu
     */
    openContextMenu(asset, x, y) {
      if (x > 1245) {
        this.positionContextMenuX = x - 250;
      } else {
        this.positionContextMenuX = x;
      }
      if (y > 460) {
        this.positionContextMenuY = y - 200;
      } else {
        this.positionContextMenuY = y;
      }
      this.dataContextMenu = asset;
      this.isContextMenu = true;
    },
    /**
     * Author: TVTam
     * created : tvTam (09/04/2023)
     * đóng context menu
     */
    closeContextMenu() {
      this.isContextMenu = false;
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * Mở form thêm mới từ context menu
     */
    showAddNewAsset() {
      this.$emit("openFormAddNew");
      this.isContextMenu = false;
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * Mở form sửa tài sản từ context menu
     */
    showUpdateAsset(data) {
      this.emitter.emit("showDialog", { dataAsset: data, typeDialog: 2 });
      this.isContextMenu = false;
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * Mở xác nhận xóa sản từ context menu
     */
    showDeleteAsset(data) {
      this.$emit("deleteAssetContextMenu", data);
      this.isContextMenu = false;
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * Mở form nhân bản tài sản từ context menu
     */
    showReplicationAsset(data) {
      this.emitter.emit("showDialog", { dataAsset: data, typeDialog: 3 });
      this.isContextMenu = false;
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * sự kiện lấy ra vị trí của chuột và chiều rộng của cột
     */
    getPositionCurrent(event) {
      this.curCol = event.target.parentElement;
      this.nxtCol = this.curCol.nextElementSibling;
      this.pageX = event.pageX;
      this.curColWidth = this.curCol.offsetWidth;
      if (this.nxtCol) {
        this.nxtColWidth = this.nxtCol.offsetWidth;
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * sự kiện kéo thả chuột thày dổi chiểu rộng của cột
     */
    reSizeColumn(event) {
      if (this.curCol) {
        var diffX = event.pageX - this.pageX;
        if (this.nxtCol) {
          this.nxtCol.style.width = this.nxtColWidth - diffX + "px";
        }
        this.curCol.style.width = this.curColWidth + diffX + "px";
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (3/03/2023)
     * sự kiện thả chuột thì bỏ thay đổi chiểu rộng
     */
    noReSizeColumn() {
      this.curCol = undefined;
      this.nxtCol = undefined;
      this.pageX = undefined;
      this.nxtColWidth = undefined;
      this.curColWidth = undefined;
    },
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
        this.numberArrowIndext < this.listDataItemTabel.length
      ) {
        if (this.isShift) {
          this.isRechange = false;
          if (this.numberArrowIndext < this.listDataItemTabel.length - 1) {
            this.changeDataId([
              this.listDataItemTabel[this.numberArrowIndext + 1][
                this.nameTable + "_id"
              ],
              true,
            ]);
          }
          this.changeDataId([
            this.listDataItemTabel[this.numberArrowIndext][
              this.nameTable + "_id"
            ],
            true,
          ]);
        }
        if (this.numberArrowIndext >= this.listDataItemTabel.length - 1) {
          this.numberArrowIndext = this.listDataItemTabel.length - 1;
        } else {
          this.numberArrowIndext++;
          if (this.isShift) {
            this.changeDataId([
              this.listDataItemTabel[this.numberArrowIndext][
                this.nameTable + "_id"
              ],
              true,
            ]);
          }
        }
      }
      if (event.code == "ArrowUp" && this.numberArrowIndext >= 0) {
        if (this.isShift) {
          this.isRechange = true;
          if (this.numberArrowIndext > 0) {
            this.changeDataId([
              this.listDataItemTabel[this.numberArrowIndext - 1][
                this.nameTable + "_id"
              ],
              true,
            ]);
          }
          this.changeDataId([
            this.listDataItemTabel[this.numberArrowIndext][
              this.nameTable + "_id"
            ],
            true,
          ]);
        }
        if (this.numberArrowIndext <= 0) {
          this.numberArrowIndext == 0;
        } else {
          this.numberArrowIndext--;
          if (this.isShift) {
            this.changeDataId([
              this.listDataItemTabel[this.numberArrowIndext][
                this.nameTable + "_id"
              ],
              true,
            ]);
          }
        }
      }
      this.itemId =
        this.listDataItemTabel[this.numberArrowIndext][this.nameTable + "_id"];
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
        this.numberItem = this.numberArrowIndext;
      }
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Lấy dữ tài sản
     */
    async loadDataTable() {
      this.emitter.emit("showLoading", true);
      // this.stateAll = false;
      // this.clearData();
      this.totalCost = 0;
      this.totalQuantity = 0;
      this.totalAtrophy = 0;
      await getByFilter(
        this.urlApi,
        this.priorityFilter,

        (response) => {
          // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
          this.listData = response.data;
          if (response.data.data) {
            this.listDataItemTabel = response.data.data;
          } else {
            this.listDataItemTabel = response.data;
          }
          if (this.listDataItemTabel[0]) {
            this.$emit("fisrtLoad", this.listDataItemTabel[0]);
          }

          this.listData.totalPage = response.data.totalPage;

          this.totalCost = Math.round(response.data.totalCost);
          this.$emit("getCose", this.totalCost);
          this.totalAtrophy = Math.round(response.data.totalDepreciationValue);
          this.totalQuantity = Math.round(response.data.totalQuantity);
          this.valueRemaining = Math.round(this.totalCost - this.totalAtrophy);
          this.hideNumberPage();
          this.emitter.emit("showLoading", false);

          // this.isCheckAllUpdate();
        },
        (erro) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(erro);
          this.emitter.emit("showLoading", false);
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
        this.loadDataTable(this.priorityFilter.pageNumber);
      } else {
        this.priorityFilter.pageNumber = this.priorityFilter.pageNumber + 1;
        this.loadDataTable(this.priorityFilter.pageNumber);
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
      this.loadDataTable(this.priorityFilter.pageNumber);
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
      this.sendDataChose();
      this.isCheckAllUpdate();
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * Cập nhập lại trạng thái checkbox chọn tất cả khi thay đổi số lượng item chọn
     */
    isCheckAllUpdate() {
      this.stateAll = true;
      this.listDataItemTabel.forEach((element) => {
        if (!this.listIdSelection.has(element[this.nameTable + "_id"])) {
          this.stateAll = false;
          return;
        }
      });
    },
    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * xóa tất cả phần tử được chọn
     */
    clearData() {
      this.listDataItemTabel.forEach((element) => {
        this.listIdSelection.delete(element[this.nameTable + "_id"]);
      });
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * chọn tất cả
     */
    selectAll() {
      this.listDataItemTabel.forEach((element) => {
        this.listIdSelection.add(element[this.nameTable + "_id"]);
      });
    },

    /**
     * Author: TVTam
     * created : tvTam (23/02/2023)
     * trạng thái bỏ chọn tất cả hoặc chọn tất cả
     */
    isCheckAll() {
      if (!this.stateAll) {
        this.selectAll();
      } else {
        this.clearData();
      }
      this.sendDataChose();
    },
    /**
     * Author: TVTam
     * created : tvTam (1/03/2023)
     * gửi danh sách id chọn
     */
    sendDataChose() {
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
      this.priorityFilter.pageNumber = 1;
      this.showHideDrop();
      this.loadDataTable(1);
    },

    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : danh dấu item khi click
     */
    selectItem(id, index) {
      this.$emit("senIdLicense", id);
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
        this.clearData();
        for (
          let index = this.selectStart;
          index < this.selectEnd + 1;
          index++
        ) {
          this.changeDataId([
            this.listDataItemTabel[index][this.nameTable + "_id"],
            true,
          ]);
        }
      }
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */

    formatMoney(dataFormat) {
      return formatMoney(dataFormat);
    },
  },
  watch: {
    objectParamApi: {
      handler: function (value) {
        this.priorityFilter = value;
        this.loadDataTable(1);
      },
      deep: true,
    },

    isRechange(value) {
      this.clearData();
      this.changeDataId([
        this.listDataItemTabel[this.numberArrowIndext][this.nameTable + "_id"],
        true,
      ]);

      if (value) {
        this.changeDataId([
          this.listDataItemTabel[this.numberArrowIndext + 1][
            this.nameTable + "_id"
          ],
          true,
        ]);
      } else {
        this.changeDataId([
          this.listDataItemTabel[this.numberArrowIndext - 1][
            this.this.nameTable + "_id"
          ],
          true,
        ]);
      }
    },
  },
};
</script>

<style scoped>
.title-not-data {
  font-size: 14px;
  font-weight: 700;
}
.icon-no_data {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-data-no {
  background-position: 0 0;
  width: 132px;
  height: 76px;
}
.not-data {
  text-align: center;
  width: 100%;
  height: 76px;
}
.table-base::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}
.table-base::-webkit-scrollbar-track {
  background-color: #f4f7ff;
}
.table-base::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
  border-radius: 4px;
}
.table-base {
  height: 98%;
  outline: 0px;
  background-color: #ffffff;
  box-sizing: border-box;
  overflow: auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}
.table-paging {
  outline: 0px;
  height: calc(100% - 100px) !important;
}
.paging tr {
  border: unset !important;
}
.the-paging {
  padding-left: 0px !important;
}
</style>