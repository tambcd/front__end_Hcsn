<template>
  <div class="toolbar-filter-dropdown-assets dropdown">
    <div class="header-dropdown">
      <div class="dropdown-left">
        <div
          class="dropdown-icon-left icon24 backgrsvg"
          :v-model="ShowIcon"
        ></div>
        <div class="dropdown-value">{{NameDropdown}}</div>
      </div>
      <button class="dropdown-icon-right backgrsvg"></button>
    </div>
    <div class="body-dropdown" hidden>
      <div
        class="item-dropdown"
        v-for="itemdropdown in ListDataDropdown"
        :key="itemdropdown.id"
      >
        hello
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ListDataDropdown: {
      default: [],
    },
    ShowIcon: {
      default: true,
    },
    NameDropdown:{
        typeof : String,
        default : "Tên của dropdown"
    }
  },
};
</script>

<style>
</style>