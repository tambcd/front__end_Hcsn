<template>
  <div class="drop-paging dropdown">
    <div class="header-dropdown">
      <div class="dropdown-left">
        <div class="dropdown-value">20</div>
      </div>
      <button class="dropdown-icon-right backgrsvg"></button>
    </div>
    <div class="body-dropdown">
      <div class="item-dropdown">40</div>
      <div class="item-dropdown">40</div>
      <div class="item-dropdown">50</div>
      <div class="item-dropdown">80</div>
      <div class="item-dropdown">100</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheDropdown",
  props: {
    listDataDropdown: {
      default: [],
    },
    ShowIcon: {
      default: true,
    },
    NameDropdown: {
      typeof: String,
      default: "Tên của dropdown",
    },
  },
};
</script>

<style>
</style>