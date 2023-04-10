<template>
  <div class="combobox" >
    <a ref="#" >
    
    <the-input
      @click="showhideItemCombobox"
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
      @HideBodyItem="hideItemCombobox"
      @sendValueInput="
        (e) => {
          this.dataCombobox = e;
        }
      "
    />
    <div class="body-combobox" v-show="showHideItem">
        <div
        class="item-combobox" @click="selectAllItem()"  v-if="allItem"       
      >
        <div
          class="tick"          
        ></div>
        <div class="cobobox-title">
         --Tất cả--
        </div>
      </div>
      <div
        class="item-combobox"
        :class="{
          'item-select':
            indext == selectItemFocus || item[dataContent] == dataCombobox,
        }"
        v-for="(item, indext) in dataArray"
        :key="item[keyData + '_id']"
        @click="selectItemClick(item,indext)"
      >
        <div
          class="tick"
          :class="{ 'tickbg': itemSelectCb == item[keyData + '_id'] }"
        ></div>
        <div class="cobobox-title">
          {{ item[dataContent] }}
        </div>
      </div>
    </div>
    </a>
  </div>
</template>

<script>
import TheInput from "../input/BaseInput.vue";
export default {
   name:'BaseCombobox',
  components: { TheInput },
  props: {
    allItem:{
      default:false,
    },
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
      itemSelectCb: "",
      isSearch: true,
      selectItemFocus: 0,
      showHideItem: false,
      isSelection: "",
      dataCombobox: "",
      dataRoot: [],
      dataArray: [],
    };
  },
  created() {
    this.dataCombobox = this.valueSelect;
    this.dataArray = this.DataCombobox;
    this.dataRoot = this.DataCombobox;
  },
  mounted() {
     document.addEventListener('click', this.close)
  },
  beforeDestroyed() {
    document.removeEventListener('click',this.close)
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng mở 
     */
    toggleDropdown () {
       this.showHideItem = !this.showHideItem
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : click ra ngoài đóng 
     */
    close (e) {
      if (!this.$el.contains(e.target)) {
         this.showHideItem = false
      }
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : lọc theo tất cả 
     */
    selectAllItem(){
      this.dataCombobox = "Tất cả";
      this.selectItem(null)
      this.showHideItem = false;

    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng mở combobox
     */
    showhideItemCombobox() {
      this.dataArray = this.dataRoot;
      this.showHideItem = !this.showHideItem;
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng combobox
     */
    hideItemCombobox() {
      this.dataArray = this.dataRoot;
      this.showHideItem = false;
    },

    selectItemClick(item,indext){
      this.selectItem(item)
       this.selectItemFocus = indext+1
    }, 
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng combobox
     */
    selectItem(idItem) {
      if (!idItem ) {
        this.$emit("selectItemCombobox", null, this.keyData, this.dataCombobox);
      }
      else{

        this.dataCombobox = idItem[this.dataContent];
        this.$emit("selectItemCombobox", idItem, this.keyData,this.dataCombobox);
        this.itemSelectCb = idItem[this.keyData + "_id"];
      }
      this.showHideItem = false;
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : nút lên xuống chọn
     */
    keyAutoCombobox() {
      switch (event.code) {
        case "ArrowDown":
          if (
            this.selectItemFocus < this.dataArray.length - 1 &&
            this.selectItemFocus >= 0
          ) {
            this.selectItemFocus++;
          } else {
            this.selectItemFocus = 0;
          }

          break;
        case "ArrowUp":
          if (this.selectItemFocus == 0) {
            this.selectItemFocus = this.dataArray.length - 1;
          } else {
            this.selectItemFocus--;
          }

          break;
        case "Enter":
          
          if (this.showHideItem) {                   
            this.dataCombobox = this.dataArray[this.selectItemFocus][this.dataContent]
            this.showHideItem = false;
            this.selectItem(this.dataArray[this.selectItemFocus]);
          } else {
            this.dataArray = this.dataRoot;
            this.showHideItem = true;
          }

          break;

        default:
          break;
      }
    },
  },
  watch: {
    dataCombobox(txtSearch) {
      this.showHideItem = true;
      this.dataArray = [];
      this.dataRoot.forEach((element) => {
        if (
          element[this.dataContent]
            .toLowerCase()
            .indexOf(txtSearch.toLowerCase()) !== -1
        ) {
          this.dataArray.push(element);
        }
        if (element[this.dataContent] === txtSearch || txtSearch ==="Tất cả") {
          this.dataArray = this.dataRoot;
          this.showHideItem = false;
          return;
        }
      });

    },
    DataCombobox: function (newData) {
      this.dataRoot = newData;
    },
  },
};
</script>

<style>
</style>