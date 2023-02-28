<template>
  <div class="dialog-model" v-if="ShowHideDialog">
    <div class="dialog-content">
      <div class="dialog-main">
        <div class="dialog-header">
          <div class="dialog-header-tilte weight700">Thêm tài sản</div>
          <div
            class="dialog-header-close icon24 backgrsvg"
            @click="() => (ShowHideDialog = false)"
          ></div>
        </div>
        <div class="dialog-body">
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                heightInput="35px"
                widthInput="100%"
                contentInput="TS0001"
                titleInput="Mã tài sản"
                required="True"
                marginInput="8px"
              />
            </div>
            <div class="item-name item-right">
              <the-input
                heightInput="35px"
                widthInput="100%"
                contentInput="Nhập tên tài sản..."
                titleInput="Tên tài sản"
                required="True"
                marginInput="8px"
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-combobox
                iconCombobox="2"
                marginCombobox="8px"
                contentComboxbox="Chọn mã bộ phận sử dụng"
                titleCombobox=" Mã bộ phần sử dụng"
                requiredCombobox="true"
              />
            </div>
            <div class="item-name item-right">
              <the-input
                disabledInput="true"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tên bộ phân sử dụng"
                marginInput="8px"
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-combobox
                iconCombobox="2"
                marginCombobox="8px"
                contentComboxbox="Chọn mã tài sản"
                titleCombobox=" Mã tài sản"
                requiredCombobox="true"
              />
            </div>
            <div class="item-name item-right">
              <the-input
                disabledInput="true"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tên loại tài sản"
                :required="false"
                marginInput="8px"
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Số Lượng"
                contentInput="0"
                required="True"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
            <div class="item-code item-left">
              <the-input
                :money="true"
                iconNumber="false"
                heightInput="35px"
                widthInput="100%"
                titleInput="Nguyên giá"
                contentInput="100.000.000"
                required="True"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
            <div class="item-code item-left">
              <the-input
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="số năm sử dụng"
                contentInput="1"
                required="True"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Tỷ lệ hao mòn(%)"
                contentInput="0"
                required="True"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
            <div class="item-code item-left">
              <the-input
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Giá trị hao mòn năm"
                contentInput="10"
                required="True"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
            <div class="item-code item-left">
              <the-input
                iconNumber="false"
                typeInput="number"
                heightInput="35px"
                widthInput="100%"
                titleInput="Năm Theo dõi"
                contentInput="2021"
                disabledInput="true"
                marginInput="8px"
                textalignInput="right"
              />
            </div>
          </div>
          <div class="item-multiple">
            <div class="item-code item-left">
              <the-input
                typeInput="date"
                heightInput="35px"
                widthInput="100%"
                titleInput="Ngày mua"
                contentInput="1"
                required="True"
                marginInput="8px"
              />
            </div>
            <div class="item-code item-left">
              <the-input
                typeInput="date"
                heightInput="35px"
                widthInput="100%"
                titleInput="Ngày bắt đầu sử dụng"
                required="True"
                marginInput="8px"
              />
            </div>
            <div class="item-code item-left"></div>
          </div>
        </div>
        <div class="dialog__footer">
          <button class="btn-add btn">Lưu</button>
          <button class="btn__cancel btn">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheCombobox from "../combobox/BaseCombobox.vue";
import TheInput from "../input/BaseInput.vue";
export default {
  created() {
    this.emitter.on("showDialog", () => {
      this.ShowHideDialog = true;
    });
  },
  components: { TheInput, TheCombobox },
  data() {
    return {
      ShowHideDialog: false,
    };
  },
};
</script>

<style>
</style>