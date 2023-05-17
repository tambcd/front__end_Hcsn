<template>
  <div class="base-cost">
    <div class="cost-source">
      <div class="cost-combobox">
        <BaseInput
          v-if="!isPlus"
          valueInputFisrt="Tổng"
          disabledInput="true"
          heightInput="35px"
          widthInput="100%"
          marginInput="8px"
        />
        <TheCombobox
          ref="combobox-focus"
          :focusInputCombox="focusCost"
          :isValideCombobox="isValidate"
          :titleVailidateCombobox="titleValidate"
          v-else
          @selectItemCombobox="
            (data, key) => {
              getDataComboboxItem(data, key);
            }
          "
          :valueSelect="cost_source_code"
          :DataCombobox="dataComboboxCost"
          dataContent="cost_source_name"
          keyData="cost_source"
          iconCombobox="2"
          contentComboxbox="Chọn nguồn chi phí "
          requiredCombobox="true"
        />
      </div>
      <div class="cost-value-cost">
        <BaseInput
          :isValide="isValidateInputCb"
          :titleValidate="titleValidateCb"
          textalignInput="right"
          :valueInputFisrt="cost"
          :disabledInput="!isPlus"
          heightInput="35px"
          widthInput="100%"
          marginInput="8px"
          :money="true"
          @keyDownbaseInput="isNumberKey()"
          @sendValueInput="
            (e) => {
              this.cost = e;
            }
          "
        />
      </div>
    </div>
    <div class="cost-value" v-show="isPlus">
      <BaseTooltip position="down" tooltipText="Thêm nguồn chi phí">
        <button class="btn btnadd backgrsvg" @click="addNewItem()"></button>
      </BaseTooltip>
      <BaseTooltip
        position="down"
        tooltipText="Bỏ nguồn chi phí"
        v-show="isSource"
      >
        <button class="btn btndelete backgrsvg" @click="deleteItem()"></button>
      </BaseTooltip>
    </div>
  </div>
</template>

<script>
import TheCombobox from "../combobox/BaseCombobox.vue";
export default {
  props: {
    focusCost: { default: "" },
    titleValidateCb: { default: "" },
    isValidateInputCb: { default: false },
    titleValidate: { default: "" },
    isValidate: { default: false },
    isSource: { default: true },
    dataComboboxCost: [],
    isPlus: {
      default: true,
    },
    valueCost: {
      default: "",
    },
    codeSource: {
      default: "",
    },
  },
  created() {
    this.getNameCost();
    this.cost = this.valueCost;
  },
  name: "BaseCostSource",
  components: { TheCombobox },
  data() {
    return {
      cost_source_code: "",
      sumCost: 0,
      cost: "",
    };
  },
  mounted() {

    this.$nextTick(() => {
      this.$refs["combobox-focus"]?.setFocusCombobox();
    });
  },
  methods: {
    /**
     * lấy ra name
     * @create by : MF1270
     * @@create day : 1/03/2023
     */
    getNameCost() {
      if (this.dataComboboxCost || this.dataComboboxCost > 0) {
        this.cost_source_code = this.dataComboboxCost.find(
          (obj) => obj.cost_source_code === this.codeSource
        )?.cost_source_name;
      }
    },

    /**
     * lấy ra giá trị của combobox
     * @create by : MF1270
     * @@create day : 1/03/2023
     */
    getDataComboboxItem(data, key) {
      this.$emit("getDataCobobox", data, key);
    },
    /**
     * nhấn btn xóa
     * @create by : MF1270
     * @@create day : 1/03/2023
     */
    deleteItem() {
      this.$emit("deleteItem");
    },
    /**
     * nhấn btn thêm
     * @create by : MF1270
     * @@create day : 1/03/2023
     */
    addNewItem() {
      this.$emit("addItem");
    },
    /**
     * chỉ nhập số
     * @create by : MF1270
     * @@create day : 1/03/2023
     */
    isNumberKey() {
      if (event.keyCode > 47 && event.keyCode < 58) {
        event.target;
      } else if (
        event.keyCode == 9 ||
        event.keyCode == 37 ||
        event.keyCode == 39 ||
        event.keyCode == 46 ||
        event.keyCode == 8
      ) {
        event.target;
      } else {
        event.preventDefault();
      }
    },
  },
  watch: {
    cost(value) {
      this.$emit("dataInput", value);
    },
    valueCost(value) {
      this.cost = value;
    },
    codeSource() {
      this.getNameCost();
    },
  },
};
</script>

<style scoped>
.btn {
  margin-left: 10px;
  border: unset;
  height: 18px;
  width: 18px;
  background-color: transparent;
}
.btndelete {
  background-position: -375px -463px;
}
.btnadd {
  background-position: -375px -419px;
}
.cost-value {
  align-items: center;
  display: flex;
}
.base-cost {
  margin-top: 10px;
  width: 100%;
  display: flex;
  height: 50px;
}
.cost-source {
  display: flex;
  justify-content: space-between;
  width: 70%;
}
.cost-value {
  margin-left: 10px;
}
.cost-combobox {
  width: 60%;
}
.cost-value-cost {
  width: 35%;
}
</style>