<template>
  <div class="toolbar">
    <div class="toolbar__filter">
      <the-input
        heightInput="35"
        widthInput="179"
        :iconLeft="true"
        contentInput="Tìm kiếm tài sản..."
        
      />

      <the-combobox
        contentComboxbox="Loại tài sản"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />

      <the-combobox
        contentComboxbox="Bộ phận sử dụng"
        :erroCombobox="false"
        titleCombobox=""
        marginCombobox="0px"
        :iconComboboxLeft="true"
        :iconComboboxRight="true"
      />
    </div>

    <div class="toolbar__action">
      <button class="btn__add button" @click="ShowDialog">
        + Thêm tài sản
      </button>
      <button class="btn__export icon36 button__icon backgrsvg"></button>
      <button class="btn__delete icon36 button__icon backgrsvg"></button>
    </div>
  </div>
  <div class="table">
    <data-table />
  </div>
</template>

<script>
import DataTable from "@/components/table/DataTable.vue";
import TheInput from "@/components/input/TheInput.vue";
import TheCombobox from "@/components/combobox/TheCombobox.vue";
export default {
  components: { DataTable, TheInput, TheCombobox },
  methods: {
    /**
     * @ create by : MF1270
     * @ create day : 19/02/2023
     * @ hàm : Gửi sự kiên mở dialog btn thêm mới sang component Dialog
     */
    ShowDialog() {
      this.emitter.emit("showDialog");
    },
  },
};
</script>

<style>
</style>