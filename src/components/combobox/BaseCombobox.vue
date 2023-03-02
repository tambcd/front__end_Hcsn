<template>
  <div class="combobox" @keydown.enter="ShowhideItemCombobox()">
    <the-input
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
    />

    <div class="body-combobox" v-if="showHideItem">
      <div
        class="item-combobox"
        v-for="item in DataCombobox"
        :key="item[keyData]"
        @click="selectItem(item)"
      >
        {{ item[dataContent] }}
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
  },
  data() {
    return {
      showHideItem: false,
      isSelection:""
    };
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : đóng mở combobox
     */
    ShowhideItemCombobox() {
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
    selectItem(idItem){
      console.log(idItem)
      this.HideItemCombobox()
    }
  },
};
</script>

<style>
</style>