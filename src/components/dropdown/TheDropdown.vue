<template>
  <div class="toolbar-filter__dropdown__assets dropdown">
    <div class="header__dropdown">
      <div class="dropdown-left">
        <div
          class="dropdown-icon__left icon24 backgrsvg"
          :v-model="ShowIcon"
        ></div>
        <div class="dropdown-value">{{NameDropdown}}</div>
      </div>
      <button class="dropdown-icon__right backgrsvg"></button>
    </div>
    <div class="body__dropdown" hidden>
      <div
        class="item__dropdown"
        v-for="item__dropdown in ListDataDropdown"
        :key="item__dropdown.id"
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