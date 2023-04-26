<template>
  <tr
    @dblclick="selectItem(dataItem,2)" 
    class="item-table"
    :class="{
      row__selected: ischeckItem  || dataItem[keyTable+'_id'] == selectClick  }"
  >
    <td class="center first-column input-checkbox"  style="width: 50px" v-if="isCheckbox">
      <input
        type="checkbox"
        v-model="ischeckItem"
        @change="sendCheckEmp(ischeckItem, dataItem[keyTable+'_id'])"
      />
    </td>
    <td class="center" >{{ formatMoney(this.indexItemTable) }}</td>
    <td :class="item.alignment" v-for="(item,index) in showClomn" :key="index" 
    :style="{color : item.color  }">
        {{ item.typeData == 1?dataItem[item.column] : item.typeData == 2 ? formatDateShow(dataItem[item.column]) : formatMoney(dataItem[item.column])}}
        </td>
    <div class="The-actions actions__item" style="" >

      <BaseTooltip position="left" tooltipText="Sửa">
        <button class="btn__edit btn__action backgrsvg"
          @click="selectItem(dataItem,2)"
        ></button>
      </BaseTooltip>
 
      <BaseTooltip position="left" tooltipText="Xóa">
        <button
          class="btn__action backgrsvg btn__nhanban"
          @click="selectItem(dataItem,3)"
        ></button>
      </BaseTooltip>
    </div>
  </tr>
</template>

<script>
import { formatMoney,dateToStringShow } from "@/common/helper/format";

export default {
  name: "ItemTableLicense",
  props: {
    
    keyTable:{
      default:""
    },
    showClomn :[],
    isCheckbox:{        
        default:true
    },
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
    formatDateShow(data){
        return dateToStringShow(data)
    },
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
    selectItem(item,type) {
      this.$emit("selectIdItemTable",item[this.keyTable + '_id'],type)
    },
    
  },
  watch: {
    stateIsAll(value){
        this.ischeckItem = value
    }
  },  
  
};
</script>

<style scoped>

.item-table{
  position: relative;
  
}
.item-table:hover .The-actions{
  display: block;
}
.The-actions{
  display: none;
  position: absolute !important;
  right:0;
  top: 4px;
  background: transparent !important;
}
.btn__edit{
    background-color: rgba(26, 164, 200, .2);
    width: 30px !important;
    height: 30px !important;
    margin-right: 10px !important;
    background-position:  -147px -60px !important;
}
.btn__nhanban{
  background-color: rgba(26, 164, 200, .2);
    width: 30px !important;
    height: 30px !important;
    margin-right: 5px !important;
    background-position: -458px -106px !important;
}

</style>