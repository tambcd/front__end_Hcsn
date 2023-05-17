<template>
  <tr
    @dblclick="selectItem(dataItem, 2)"
    @click="selectItem(dataItem, 1)"
    class="item-table"
    :class="{
      row__selected: ischeckItem || dataItem[keyTable + '_id'] == selectClick,
    }"
  >
    <td
      class="center first-column input-checkbox"
      style="width: 50px"
      v-if="isCheckbox"
    >
      <input
        type="checkbox"
        v-model="ischeckItem"
        @change="sendCheckEmp(ischeckItem, dataItem[keyTable + '_id'])"
      />
    </td>
    <td class="center">{{ formatMoney(this.indexItemTable) }}</td>
    <td
      :class="item.alignment"
      v-for="(item, index) in showClomn"
      :key="index"
      @mousemove="showText()"
      @mouseleave="hideText()"
      :style="{ color: item.color }"
    >
      

      {{
        item.typeData == 1
          ? dataItem[item.column]
          : item.typeData == 2
          ? formatDateShow(dataItem[item.column])
          : formatMoney(dataItem[item.column])
      }}
    </td>
    <div class="The-actions actions__item" v-show="typeTable">
      <BaseTooltip position="left" tooltipText="Sửa">
        <button
          class="btn__edit btn__action backgrsvg"
          @click="selectItem(dataItem, 2)"
        ></button>
      </BaseTooltip>

      <BaseTooltip position="left" tooltipText="Xóa">
        <button
          class="btn__action backgrsvg btn__nhanban"
          @click="selectItem(dataItem, 3)"
        ></button>
      </BaseTooltip>
    </div>
  </tr>
  <div
    class="tooltipTd"
    v-if="showTextHide"
    :style="{ top: topTooltip + 'px', left: leftTooltip + 'px' }"
  >
    {{ textTooltip }}
  </div>
</template>

<script>
import { formatMoney, dateToStringShow } from "@/common/helper/format";

export default {
  name: "ItemTableLicense",
  components: {  },
  props: {
    typeTable: {
      default: true,
    },
    keyTable: {
      default: "",
    },
    showClomn: [],
    isCheckbox: {
      default: true,
    },
    isCheck: {
      default: false,
    },
    selectClick: {
      default: "",
    },
    indexItemTable: {
      default: [],
    },
    dataItem: {},
    stateIsAll: {
      default: false,
    },
  },
  created() {
    this.ischeckItem = this.stateIsAll;
  },
  data() {
    return {
      topTooltip: "",
      leftTooltip: "",
      textTooltip: "",
      showTextHide: false,
      isClick: "",
      ischeckItem: false,
      itemSelect: [],
    };
  },
  methods: {
     /**
     * create by : MF1270
     * create day : 16/05/2023
     * ham : hiển thị tooltip cho td
     */
    showText() {
      if (event.target.clientWidth < event.target.scrollWidth) {
        if (event.pageX > 850) {
          this.leftTooltip = event.pageX - 200;
        } else {
          this.leftTooltip = event.pageX;
        }        
        this.topTooltip = event.pageY + 25;
        this.textTooltip = event.target.innerText;
        this.showTextHide = true;
      } else {
        this.showTextHide = false;
      }
    },
     /**
     * create by : MF1270
     * create day : 16/05/2023
     * ham : ẩn tooltip cho td
     */
    hideText() {
      this.showTextHide = false;
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : mở context menu
     */
    openContextMenu(data) {
      this.$emit("openContextMenu", data, event.pageX, event.pageY);
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : hàm tính giá trị hao mon lũy kết
     */
    depreciationValue(productionYear, depreciationValueYear) {
      return (
        ((new Date().getFullYear() - new Date(productionYear).getFullYear()) *
          12 +
          new Date().getMonth() -
          new Date(productionYear).getMonth()) *
        (depreciationValueYear / 12)
      );
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng ngày
     */
    formatDateShow(data) {
      return dateToStringShow(data);
    },

     /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */
    formatMoney(dataFormat) {
      return formatMoney(dataFormat);
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : chon check box hàng
     */
    sendCheckEmp(state, id) {
      this.itemSelect[0] = id;
      this.itemSelect[1] = state;
      this.$emit("changeDataSelect", this.itemSelect);
    },

    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : gửi data nhân bản tài sản lên form
     */
    selectItem(item, type) {
      this.$emit("selectIdItemTable", item[this.keyTable + "_id"], type);
    },
  },
  watch: {
    stateIsAll(value) {
      this.ischeckItem = value;
    },
  },
};
</script>

<style scoped>

.item-table {
  position: relative;
}
.item-table:hover .The-actions {
  display: block;
}
.The-actions {
  display: none;
  position: absolute !important;
  right: 0;
  top: 4px;
  background: transparent !important;
}
.btn__edit {
  background-color: #d1edf4;
  width: 30px !important;
  height: 30px !important;
  margin-right: 10px !important;
  background-position: -147px -60px !important;
}
.btn__nhanban {
  background-color: #d1edf4;
  width: 30px !important;
  height: 30px !important;
  margin-right: 5px !important;
  background-position: -458px -106px !important;
}
</style>