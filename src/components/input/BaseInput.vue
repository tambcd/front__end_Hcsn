<template>
  <div class="base-input">
    <label for="" class="content-input" v-if="titleInput != ''"
      >{{ titleInput }}<span style="color: red" v-if="required">*</span></label
    >
    <div
      class="toolbar-filter-text"
      :class="{
        'toolbar-filter-text-focus': focusInput,
        'toolbar-filter-text-erro': (IscheckEmpty && required) || isValideInput,
        'hide-icon': hideIconInput,
        disabledInput: disabledInput,
        'hide-icon-number': !hideIconInput,
      }"
      :style="{
        width: widthInput,
        height: heightInput,
        'margin-top': marginInput,
      }"
    >
      <div
        class="input-icon-sreach icon26 backgrsvg"
        :class="{ input__icon__filter: iconLeft && iconRight }"
        v-if="iconLeft"
        @click="btnSearch()"
      ></div>
      <input
        ref="m-input"
        :maxlength="maxlengthBaseInput"
        :step="stepInput"
        min="0"
        :max="maxInput"
        @keydown="keyDownInput()"
        @click="clickBinput()"
        :type="typeInput"
        class="input"
        :placeholder="contentInput"
        :style="{ 'text-align': textalignInput }"
        :disabled="disabledInput"
        @focus="inputFocus()"
        @blur="outFocus()"
        v-model="valueInput"
      />

      <button
        class="combobox-icon__right backgrsvg"
        v-if="iconRight"
        tabindex="-1"
        @click.prevent="clickBinput()"
      ></button>
    </div>
  
    <div class="erro" v-if="isValideInput">
      {{ titleValidate }}
    </div>
  </div>
</template>

<script>
import { formatMoney } from "@/common/helper/format";
export default {
  name: "BaseInput",
  props: {
    maxlengthBaseInput: { default: "" },
    isValide: {
      default: false,
    },
    titleValidate: {
      default: "",
    },
    hideIconInput: {
      default: false,
    },
    //
    stepInput: {
      default: 0.1,
    },
    maxInput: {
      default: 1,
    },

    ///kiểu input số
    iconNumber: {
      typeof: Boolean,
      default: true,
    },
    //kiểu định dạng tiền
    money: {
      typeof: Boolean,
      default: false,
    },

    disabledInput: {
      typeof: Boolean,
      default: false,
    },
    //kiểu
    typeInput: {
      typeof: String,
      default: "text",
    },
    //icon trái
    iconLeft: {
      typeof: Boolean,
      default: false,
    },
    //icon phải
    iconRight: {
      typeof: Boolean,
      default: false,
    },
    // place input
    contentInput: {
      typeof: String,
      default: "",
    },
    heightInput: {
      typeof: String,
      default: "35",
    },
    // chiều rộng
    widthInput: {
      typeof: String,
      default: "179",
    },
    // nhãn của input
    titleInput: {
      typeof: String,
      default: " ",
    },
    required: {
      typeof: Boolean,
      default: false,
    },
    marginInput: {
      typeof: String,
      default: "0px",
    },
    // định dạng căn lề chữ
    textalignInput: {
      typeof: String,
      default: "left",
    },
    valueInputFisrt: {
      typeof: String,
      default: "",
    },
  },

  created() {
    this.isValideInput = this.isValide
    if (this.money) {
      this.valueInput = this.formatMoney(
        String(this.valueInputFisrt).replaceAll(".", "")
      );
    } else {
      this.valueInput = this.valueInputFisrt;
    }
  },
  mounted() {
    
    this.setFocus()
  },

  data() {
    return {
      isValideInput:false,
      focusInput: false,
      valueInput: "",
      IscheckEmpty: false,
    };
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : set focus
     */
    setFocus() {
      this.$nextTick(() => {        
        this.$refs['m-input'].focus();
        })

    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : ham click input
     */
    clickBinput() {
      this.$emit("clickBinput");
    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : Đổi boder khi chọn vào input
     */
    inputFocus() {
      
      this.$refs['m-input'].select();
      this.isValideInput = false
      this.focusInput = true;
      this.IscheckEmpty = false;
      if (this.valueInput.length > 3 && this.money) {
        this.valueInput = this.valueInput.replaceAll(".", "");
      }
    },

    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : Đổi boder khi ra khỏi input
     */
    outFocus() {
      this.focusInput = false;
      
        if (this.money) {
          this.valueInput = this.formatMoney(
            this.valueInput.replaceAll(".", "")
          );
        }
      
    },

    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : ẩn hiện danh sách combobox
     */
    hideBodyCombobox() {
      this.$emit("HideBodyItem");
    },

    /**
     * @create by : MF1270
     * @create day : 03/03/2023
     * ham : định dạng tiền
     */
    formatMoney(dataFormat) {
      return formatMoney(dataFormat);
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham :sự kiện tìm kiếm txt
     */
    btnSearch() {
      this.$emit("searchInput");
    },
    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham :keydown inputbase
     */
    keyDownInput() {
      this.$emit("keyDownbaseInput");
    },
  },
  watch: {
    isValide(value){
      this.isValideInput = value
    },
    
    valueInput(value) {
      if (value === "") {
        this.IscheckEmpty = true;
      }
      this.IscheckEmpty = false;
      this.$emit("sendValueInput", value);
    },
    valueInputFisrt(value) {
      this.valueInput = String(value);
    },
  },
};
</script >

<style scope>
.dateInput {
  width: 100%;
}
.mx-input {
  height: 36px !important;
}

</style>
