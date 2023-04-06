<template>
  <tr
    @dblclick="updateAsset(dataItem)" 
    class="item-table"
    :class="{
      row__selected: ischeckItem || stateIsAll.has(dataItem.fixed_asset_id) ||dataItem.fixed_asset_id == selectClick  }"
  >
    <td class="center first-column input-checkbox"  style="width: 50px">
      <input
        type="checkbox"
        v-model="ischeckItem"
        :checked="stateIsAll.has(dataItem.fixed_asset_id)"
        @change="sendCheckEmp(ischeckItem, dataItem.fixed_asset_id)"
      />
    </td>
    <td class="center" >{{ this.indexItemTable }}</td>
    <td >{{ dataItem.fixed_asset_code }}</td>
    <td >{{ dataItem.fixed_asset_name }}</td>
    <td>{{ dataItem.fixed_asset_category_name }}</td>
    <td >{{ dataItem.department_name }}</td>
    <td class="right">
      {{ FormatMoney(dataItem.quantity.toString()) }}
    </td>
    <td class="right" >
      {{ FormatMoney(dataItem.cost.toString()) }}
    </td>
    <td class="right" >
      {{
        FormatMoney(Math.round(depreciationValue(dataItem.production_year , dataItem.depreciation_value)).toString())
      }}
    </td>
    <td class="right" >
      {{
        Math.round(dataItem.cost - depreciationValue(dataItem.production_year , dataItem.depreciation_value)) > 0 ? FormatMoney(Math.round(dataItem.cost - depreciationValue(dataItem.production_year , dataItem.depreciation_value)).toString()) : 0

      }}
    </td>
    <td class="The-actions center actions__item" style="width: 100px">

      <BaseTooltip position="left" tooltipText="Sửa">
        <button class="btn__edit btn__action backgrsvg"
          @click="updateAsset(dataItem)"
        ></button>
      </BaseTooltip>
 
      <BaseTooltip position="left" tooltipText="Nhân bản">
        <button
          class="btn__action backgrsvg btn__nhanban"
          @click="replicationAsset(dataItem)"
        ></button>
      </BaseTooltip>
    </td>
  </tr>
</template>

<script>
import { FormatMoney } from "../../assets/js/Format";

export default {
  name: "ItemTable",
  props: {
    selectClick:{
      default:""
    },
    indexItemTable: {
      default: [],
    },
    dataItem: {},
    stateIsAll: {
      default: false,
    },
  },
  created() {},
  data() {
    return {
      isClick:"",
      ischeckItem: false,
      ItemSelect: ["", false],
    };
  },
  methods: {


     /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : hàm tính giá trị hao mon lũy kết
     */

    depreciationValue(productionYear,depreciationValueYear) {
        
        return ((new Date().getFullYear()- new Date(productionYear).getFullYear())*12 + new Date().getMonth()- new Date(productionYear).getMonth())*(depreciationValueYear/12)
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */

    FormatMoney(dataFormat) {
      return FormatMoney(dataFormat);
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : chon check box hàng
     */
    sendCheckEmp(state, id) {
      if (state) {
        this.ItemSelect[0] = id;
        this.ItemSelect[1] = true;
      } else {
        this.ItemSelect[0] = id;
        this.ItemSelect[1] = false;
      }
      this.$emit("changeDataSelect", this.ItemSelect);
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : gửi data sửa tài sản lên form
     */
    updateAsset(itemAsset) {
      this.emitter.emit("showDialog", { dataAsset: itemAsset, typeDialog: 2 });
    },
    /**
     * create by : MF1270
     * create day : 1/03/2023
     * ham : gửi data nhân bản tài sản lên form
     */
    replicationAsset(itemAsset) {
      this.emitter.emit("showDialog", { dataAsset: itemAsset, typeDialog: 3 });
    },
    
  },
  watch: {
    stateIsAll(state) {
      if (state === true) this.ischeckItem = state;
    },
  },
};
</script>

<style scope>

</style>