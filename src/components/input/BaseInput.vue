<template>
  <label for="" class="content-input" v-if="titleInput != ''"
    >{{ titleInput }}<span style="color: red" v-if="required">*</span></label
  >
  <div
    class="toolbar-filter-text"
    :class="{
      'toolbar-filter-text-focus': focusInput,
      'toolbar-filter-text-erro': IscheckEmpty && required,
      'hide-icon': iconNumber,
      disabledInput: disabledInput,
    }"
    :style="{
      width: widthInput,
      height: heightInput,
      'margin-top': marginInput,
    }"
  >
    <div
      class="input-icon-sreach icon24 backgrsvg"
      :class="{ input__icon__filter: iconLeft && iconRight }"
      v-if="iconLeft"
      @click="btnSearch()"
    ></div>
    <input
      :type="typeInput"
      class="input"
      :placeholder="contentInput"
      :style="{ 'text-align': textalignInput }"
      :disabled="disabledInput"
      @focus="InputFocus()"
      @blur="OutFocus()"
      v-model="valueInput"
      v-if="typeInput != 'date'"
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
    
   
    ///kiểu input số
    iconNumber: {
      defaulf: true,
    },
    //kiểu định dạng tiền
    money: {
      default: false,
    },

    disabledInput: {
      default: false,
    },
    //kiểu
    typeInput: {
      default: "text",
    },
    //icon trái
    iconLeft: {
      defaulf: false,
    },
    //icon phải
    iconRight: {
      defaulf: false,
    },
    // place input
    contentInput: {
      typeof: String,
      default: "",
    },
    heightInput: {
      defaulf: "35",
    },
    // chiều rộng
    widthInput: {
      defaulf: "179",
    },
    // nhãn của input
    titleInput: {
      defaulf: " ",
    },
    required: {
      defaulf: false,
    },
    marginInput: {
      defaulf: "0px",
    },
    // định dạng căn lề chữ
    textalignInput: {
      default: "left",
    },
    valueInputFisrt: {
      default: "",
    },
  },
  mounted() {
    this.valueInput = this.valueInputFisrt;
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
      if (this.valueInput.length > 3) {
        this.valueInput = this.valueInput.replaceAll(".", "");
      }
    },
    /**
     * create by : MF1270
     * create day : 18/02/2023
     * ham : Đổi boder khi ra khỏi input
     */
    OutFocus() {
      this.focusInput = false;
      this.hideBodyCombobox();
      if (this.valueInput === "") {
        this.IscheckEmpty = true;
      } else {
        this.IscheckEmpty = false;
        this.FormatData();
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
    hideBodyCombobox() {
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
        this.valueInput = result;
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
    },
        /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham :sự kiện tìm kiếm txt
     */
    btnSearch(){
      this.$emit("searchInput");
    }
  },
  watch: {
    valueInput(value) {
      this.$emit("sendValueInput", value);
    },
    valueInputFisrt(value) {
      this.valueInput = value;
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
.mx-input:hover,
.mx-input:focus {
  border-color: #5dc748 !important;
}
</style>
