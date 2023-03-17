<template>
  <div class="the__menu" :class="{'the__menu__mini':isMenuMini}">
      <menu-item
      :isTypeMenu="isMenuMini"
       v-for="item in OptionMenu" :key="item.ItemID"
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
export default {
  components: { MenuItem },
  data() {
    return {
      isMenuMini:false,
      selectItem:1,
      OptionMenu: [
        {
          ItemID: 0,
          ItemTxt: "MISA QLTS",
          item_icon: "menu-item-home__icon",
          itemBg: "menu-item-overview",
          path: "/home",
          isheader: true,
        },
        {
          ItemID: 1,
          ItemTxt: "Tổng quan",
          item_icon: "menu-item-overview__icon",
          itemBg: "menu-item-overview",
          path: "/home",
        },
        {
          ItemID: 2,
          ItemTxt: "Tài sản",
          item_icon: "menu-item-assets__icon",
          itemBg: "menu-item-assets",
          path: "/assets",
        },
        {
          ItemID: 3,
          ItemTxt: "Tài sản HT_DB",
          item_icon: "menu-item-assets--HTDB__icon",
          itemBg: "menu-item-assets--HTDB",
          path: "/login",
        },
        {
          ItemID: 4,
          ItemTxt: "Công cụ dụng cụ",
          item_icon: "menu-item-tools__icon",
          itemBg: "menu-item-tools",
          path: "/login",
        },
        {
          ItemID: 5,
          ItemTxt: "Danh mục",
          item_icon: "menu-item-catagory__icon",
          itemBg: "menu-item-catagory",
          path: "/",
        },
        {
          ItemID: 6,
          ItemTxt: "Tra cứu",
          item_icon: "menu-item-search__icon",
          itemBg: "menu-item-search",
          path: "/",
        },
        {
          ItemID: 7,
          ItemTxt: "Báo cáo",
          item_icon: "menu-item-repost__icon",
          itemBg: "menu-item-repost",
          path: "/",
        },
        {
          ItemID: 8,
          ItemTxt: "Thu gọn",
          item_icon: "botton__menu",
          itemBg: "menu-item-repost",
          isbottom: true,
        },
      ],
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