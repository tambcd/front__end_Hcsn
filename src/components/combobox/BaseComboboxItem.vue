<template>
  <div
        class="item-combobox"
        v-for="item in DataCombobox"
        :key="item[keyData + '_id']"
        @click="selectItem(item)"      >
        {{ item[dataContent] }}
      </div>
      
</template>

<script>
export default {

}
</script>

<style>

</style>