<template>
  <tr
    @dblclick="updateAsset(dataItem)" 
    @contextmenu.prevent="openContextMenu(dataItem)"
    class="item-table"
    :class="{
      row__selected: ischeckItem  || dataItem.fixed_asset_id == selectClick  }"
  >
    <td class="center first-column input-checkbox"  style="width: 50px">
      <input
        type="checkbox"
        v-model="ischeckItem"
        @change="sendCheckEmp(ischeckItem, dataItem.fixed_asset_id)"
      />
    </td>
    <td class="center" >{{ this.indexItemTable }}</td>
    <td >{{ dataItem.fixed_asset_code }}</td>
    <td >{{ dataItem.fixed_asset_name }}</td>
    <td>{{ dataItem.fixed_asset_category_name }}</td>
    <td >{{ dataItem.department_name }}</td>
    <td class="right">
      {{ formatMoney(dataItem.quantity.toString()) }}
    </td>
    <td class="right" >
      {{ formatMoney(dataItem.cost.toString()) }}
    </td>
    <td class="right" >
      {{
        formatMoney(Math.round(depreciationValue(dataItem.production_year , dataItem.depreciation_value)).toString())
      }}
    </td>
    <td class="right" >
      {{
        Math.round(dataItem.cost - depreciationValue(dataItem.production_year , dataItem.depreciation_value)) > 0 ? formatMoney(Math.round(dataItem.cost - depreciationValue(dataItem.production_year , dataItem.depreciation_value)).toString()) : 0

      }}
    </td>
    <td>{{dataItem.active?"Đã sử dụng":"Chưa sử dụng"}}</td>
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
import { formatMoney } from "@/common/helper/format";

export default {
  name: "ItemTable",
  props: {
    isCheck:{
      default:false
    },
    selectClick:{
      default:""
    },
    indexItemTable: {
      default: [],
    },
    dataItem: {},
    stateIsAll: {
      default:false
    }
  },
  created() {
    this.ischeckItem = this.stateIsAll
  },
  data() {
    return {
      isClick:"",
      ischeckItem: false,
      itemSelect: [],
    };
  },
  methods: {

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : mở context menu
     */
    openContextMenu(data){
      this.$emit("openContextMenu", data,event.pageX,event.pageY);     

    },
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
    stateIsAll(value){
        this.ischeckItem = value
    }
  },  
  
};
</script>

<style scope>

</style>