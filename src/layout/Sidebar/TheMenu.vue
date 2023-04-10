<template>
  <div class="the__menu" :class="{'the__menu__mini':isMenuMini}">
      <menu-item
      :isTypeMenu="isMenuMini"
       v-for="item in optionMenu" :key="item.ItemID"
        :positionIcon="item.item_icon"
        :content="item.ItemTxt"
        :isHeader="item.isheader ?? false"
        :isBottom="item.isbottom?? false"
        :seletionItem="item.ItemID ==selectItem"
        :isRouter="item.path ?? '' "
        @click="SelectItemMenu(item.ItemID)"
      />
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import DataObject from '@/common/dataobject/model.js'
export default {
  components: { MenuItem },
  created() {
    this.optionMenu = DataObject.optionMenu;
  },
  data() {
    return {
      isMenuMini:false,
      selectItem:1,
      optionMenu: []
    };
  },
  methods: {
     /**
     * Author: TVTam
     * created : tvTam (27/02/2023)
     * chọn phần tử trên sidebar
     */
    SelectItemMenu(data){
      if(data !== 8){

        this.selectItem = data
      }
      else{
        this.isMenuMini = !this.isMenuMini
        this.$emit('ChangetypeMenu', this.isMenuMini)
      }    
      
    }
  },
};
</script>

<style>
</style>