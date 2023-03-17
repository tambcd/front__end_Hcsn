<template>
  <div class="combobox">
    <the-input
      @keyDownbaseInput="keyAutoCombobox()"
      :valueInputFisrt="dataCombobox"
      :iconLeft="iconComboboxLeft"
      heightInput="35px"
      widthInput="100%"
      :titleInput="titleCombobox"
      :contentInput="contentComboxbox"
      :required="erroCombobox"
      :marginInput="marginCombobox"
      :iconRight="iconComboboxRight"
      @ShowBodyItem="ShowhideItemCombobox"
      @HideBodyItem="HideItemCombobox"
      @sendValueInput="
        (e) => {
          this.dataCombobox = e;
        }
      "
    />
    <div class="body-combobox" v-show="showHideItem">

      <div class="item-combobox" :class="{'item-select':indext==selectItemFocus || item[dataContent] == dataCombobox }"
      v-for="(item,indext) in dataArray"
        :key="item[keyData + '_id']"
        @click="selectItem(item)"
        @keydown="keyAutoCombobox()">
                <div class="tick" :class="{'tickbg' : item_selectCb==item[keyData + '_id']}"></div>
                <div class="cobobox-title">
                    {{ item[dataContent] }}
                </div>
            
            </div>
  
    </div>
  </div>
</template>

<script>
import TheInput from "../input/BaseInput.vue";
export default {
  components: { TheInput },
  props: {
    iconComboboxLeft: {
      default: false,
    },
    iconComboboxRight: {
      default: true,
    },
    marginCombobox: {
      default: "8px",
    },
    erroCombobox: {
      default: true,
    },
    contentComboxbox: {
      default: "",
    },
    DataCombobox: {
      default: [],
    },
    keyData: {
      default: "",
    },
    dataContent: {
      default: "",
    },
    dataCode: {
      default: "",
    },
    titleCombobox: {
      default: "",
    },
    requiredCombobox: {
      default: true,
    },
    valueSelect: {
      default: "",
    },
  },
  data() {
    return {
      item_selectCb:'',
      isSearch:true,
      selectItemFocus:0,
      showHideItem: false,
      isSelection: "",
      dataCombobox: "",
      dataRoot:[],
      dataArray:[]
    };
  },
  created() {
    this.dataCombobox = this.valueSelect;
    this.dataArray = this.DataCombobox;
    this.dataRoot = this.DataCombobox;
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng mở combobox
     */
    ShowhideItemCombobox() {
      this.dataArray = this.dataRoot
      this.showHideItem = !this.showHideItem;
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng combobox
     */
    HideItemCombobox() {
      this.showHideItem = false;
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng combobox
     */
    selectItem(idItem) {
      if(!idItem){
        return;
      }
      this.dataCombobox = idItem[this.dataContent];
       this.showHideItem = false;
      this.$emit("selectItemCombobox", idItem, this.keyData);
      this.item_selectCb = idItem[this.keyData + '_id']
    },

    

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : nút lên xuống chọn 
     */
    keyAutoCombobox(){
      switch (event.code) {
        case 'ArrowDown':
          if(this.selectItemFocus < this.dataArray.length -1 && this.selectItemFocus>= 0 ){
            // this.$refs.thisdataArray[this.selectItemFocus++].focus();
            this.selectItemFocus++            

            // console.log(this.$refs[].focus());
          }
          else {
            this.selectItemFocus = 0
          }
          
          break;
        case 'ArrowUp':
           if (this.selectItemFocus ==0) {
            this.selectItemFocus =this.dataArray.length -1
          }
          else{
            this.selectItemFocus--
          }
          
          break;
        case 'Enter':
          
          if(this.showHideItem){
            this.showHideItem = false;
            this.selectItem(this.dataArray[this.selectItemFocus])
          }
          else{
            this.showHideItem = true
            return;
          }       
          
          break;
      
        default:
          break;
      }
      
    }
  },
  watch: {
    dataCombobox(txtSearch) {
      this.showHideItem = true;
      this.dataArray =[]
      this.dataRoot.forEach(element => {
        if (element[this.dataContent].toLowerCase().indexOf(txtSearch.toLowerCase()) !== -1) {
          this.dataArray.push(element);
                }
                if (element[this.dataContent] === txtSearch) {
                  
                    this.dataArray = this.dataRoot;
                     this.showHideItem = false;
                    return;                    
                }
            });
        
        
      
      // this.dataArray = this.dataRoot.filter(item => item.includes(txt))

    },
    "DataCombobox": function(newData) {
      this.dataRoot= newData
	}
  
  
  },
};
</script>

<style>
</style>