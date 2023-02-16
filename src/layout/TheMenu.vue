<template>
  <div class="the__menu">
    <div class="menu-item__home">
      <div class="menu-item-home__icon backgrsvg" />
    </div>
    <div class="menu-item" >
        <button v-for="item in OptionMenu" :key="item.ItemID" class="menu-item__all" :class="item.itemBg" >
      <router-link
        :to="item.path"
      >
          <div class="icon24 backgrsvg" :class="item.item_icon" />
      </router-link>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      OptionMenu: [
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
          path: "/",
        },
        {
          ItemID: 4,
          ItemTxt: "Công cụ dụng cụ",
          item_icon: "menu-item-tools__icon",
          itemBg: "menu-item-tools",
          path: "/",
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
      ],
    };
  },
};
</script>

<style>
</style>