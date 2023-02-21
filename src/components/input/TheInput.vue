<template>
  <label for="" class="content__input" v-if="titleInput != ''"
    >{{ titleInput }}<span style="color: red" v-if="required">*</span></label
  >
  <div
    class="toolbar-filter__text"
    :class="{
      'toolbar-filter__text__focus': focusInput,
      'toolbar-filter__text__erro': IscheckEmpty && required,
      'hide-icon': iconNumber,
      'disabledInput':disabledInput
    }"
    :style="{
      width: widthInput,
      height: heightInput,
      'margin-top': marginInput,
    }"
  >
    <div class="input__icon__sreach icon24 backgrsvg" :class="{input__icon__filter : iconLeft && iconRight}" v-if="iconLeft"></div>
    <input
      :type="typeInput"
      class="input"
      :placeholder="contentInput"
      :style="{ 'text-align': textalignInput }"
      :disabled = disabledInput
      @focus="InputFocus()"
      @blur="OutFocus()"
      v-model="valueInput"
    />
    <button
      class="combobox-icon__right backgrsvg"
      v-if="iconRight"
      tabindex="-1"
      @click="ShowBodyItem()"
    ></button>
  </div>
  <div class="erro" v-if="IscheckEmpty && required">
    Vui lòng nhập {{ titleInput }}
  </div>
</template>

<script>
export default {
  props: {
    iconNumber: {
      defaulf: true,
    },
    money: {
      default: false,
    },
    disabledInput:{
      default:false
    },
    typeInput: {
      default: "text",
    },
    iconLeft: {
      defaulf: false,
    },
    iconRight: {
      defaulf: false,
    },
    contentInput: {
      typeof: String,
      default: "",
    },
    heightInput: {
      defaulf: "35",
    },
    widthInput: {
      defaulf: "179",
    },
    titleInput: {
      defaulf: " ",
    },
    required: {
      defaulf: false,
    },
    marginInput: {
      defaulf: "0px",
    },
    textalignInput: {
      default: "left",
    },
  },
  data() {
    return {
      focusInput: false,
      valueInput: "",
      IscheckEmpty: false,
    };
  },
  methods: {
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : Đổi boder khi chọn vào input
     */
    InputFocus() {
      this.focusInput = true;
      this.IscheckEmpty = false;
      this.valueInput = this.valueInput.replaceAll('.', '')
    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : Đổi boder khi ra khỏi input
     */
    OutFocus() {
      this.focusInput = false;
      this.hideBodyCombobox()
      if (this.valueInput === "") {
        this.IscheckEmpty = true;
      } else {
        this.IscheckEmpty = false;
        this.FormatData()
      }
    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : ẩn hiện danh sách combobox
     */
    ShowBodyItem() {
      this.$emit("ShowBodyItem");
    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : ẩn hiện danh sách combobox
     */
    hideBodyCombobox(){
      this.$emit("HideBodyItem");
    },
    isNumberKey(e) {
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
      return true;
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */
    FormatData() {
      
      if (this.money) {
        var result = "";
        let a = Math.floor(this.valueInput.length / 3);
        let b = this.valueInput.length % 3;
        let index = 1;
        while (a) {
          result +=
            this.valueInput[this.valueInput.length - index] +
            this.valueInput[this.valueInput.length - index - 1] +
            this.valueInput[this.valueInput.length - index - 2] +
            ".";
          index += 3;
          a--;
        }

        if (b == 0) {
          result = this.reverse(result.substr(0, result.length - 1));
        } else {
          while (b) {
            result += this.valueInput[b - 1];
            b--;
          }
          result = this.reverse(result);
        }
        this.valueInput =  result;
      }
    },

    /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : Đảo ngược chuỗi
     */
    reverse(string) {
          var strRev = "";

          for (var i = string.length - 1; i >= 0; i--) {
            strRev += string[i];
          }

          return strRev;
        }
  },

};
</script>

<style>
</style>
