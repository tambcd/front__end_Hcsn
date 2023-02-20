<template>
  <div class="combobox"> 
    <the-input
      :iconLeft= iconComboboxLeft
      heightInput="35px"
      widthInput="100%"
      :titleInput="titleCombobox"
      :contentInput="contentComboxbox"
      :required= erroCombobox
      :marginInput= marginCombobox
      :iconRight= iconComboboxRight
      @ShowBodyItem ="ShowhideItemCombobox"
    />

    <div class="body__combobox" v-if="showHideItem">
      <div class="item__combobox" v-for="item in DataCombobox " :key= item[keyData]>{{item[dataShow]}}</div>
      <div class="item__combobox">40</div>
      <div class="item__combobox">50</div>
      <div class="item__combobox">100</div>
      <div class="item__combobox">100</div>
      <div class="item__combobox">100</div>
      <div class="item__combobox">100</div>
      <div class="item__combobox">100</div>
      <div class="item__combobox">100</div>
    </div>
  </div>
</template>

<script>
import TheInput from "../input/TheInput.vue";
export default {
  
  components: { TheInput },
  props: {
    iconComboboxLeft:{
      default : false
    },
    iconComboboxRight:{
      default : true
    },
    marginCombobox :{
      default :"8px"
    },
    erroCombobox :{
      default :true
    },
    contentComboxbox: {
      default: ""
    },
    DataCombobox: {
      default: []
    },
    keyData:{
      default : ""
    },
    dataShow :{
      default : ""
    },
    titleCombobox: {
      default: ""
    },
    requiredCombobox: {
      default: true
    },
  },
  data() {
    return {
        showHideItem :false
    }
  },
  methods: {
     /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : bắt sự kiên mở dialog btn thêm mới
     */
    ShowhideItemCombobox(){
        this.showHideItem = !this.showHideItem 
    }
  },
};
</script>

<style>
</style>