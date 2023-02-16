<template>
   <div class="dialog__model" hidden>
        <div class="dialog__content">
            <div class="dialog__main">

                <div class="dialog__header">
                    <div class="dialog-header__tilte weight700">
                        Sửa tài sản
                    </div>
                    <div class="dialog-header__close icon24 backgrsvg">

                    </div>
                </div>
                <div class="dialog__body">
                    <div class="item__multiple">
                        <div class="item_code item__left">

                            <label for="" class="content__input">Mã tài sản <span
                                    style="color: red;">*</span></label><br>
                            <input type="text" class="input__dailog" placeholder="TS0001">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_name item__right">

                            <label for="" class="content__input">Tên tài sản<span style="color: red;">*</span></label>
                            <br>
                            <input type="text" class="input__dailog" placeholder="Nhập tên tài sản...">
                            <div class="erro">hello</div>
                        </div>
                    </div>
                    <div class="item__multiple">
                        <div class="item_code item__left">

                            <label for="" class="content__input">Mã bộ phận sử dụng <span
                                    style="color: red;">*</span></label><br>

                            <div class="combobox combobox__dialog">
                                <div class="header__combobox">
                                    <div class="combobox-left">
                                        <div class="combobox-value">
                                            <input type="text" placeholder="Chọn mã bộ phần sử dụng " class="input">
                                        </div>
                                    </div>
                                    <button class="combobox-icon__right backgrsvg">
                                    </button>
                                </div>
                                <div class="body__combobox" hidden>
                                    <div class="item__combobox">10</div>
                                    <div class="item__combobox">40</div>
                                    <div class="item__combobox">50</div>
                                    <div class="item__combobox">100</div>

                                </div>

                            </div>
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_name item__right">

                            <label for="" class="content__input">Tên bộ phân sử dụng </label>
                            <br>
                            <input type="text" class="input__dailog">
                            <div class="erro">hello</div>
                        </div>
                    </div>
                    <div class="item__multiple">
                        <div class="item_code item__left">

                            <label for="" class="content__input">Mã loại tài sản <span
                                    style="color: red;">*</span></label><br>
                                    <div class="combobox combobox__dialog">
                                        <div class="header__combobox">
                                            <div class="combobox-left">
                                                <div class="combobox-value">
                                                    <input type="text" placeholder="Chọn mã bộ phần sử dụng " class="input">
                                                </div>
                                            </div>
                                            <button class="combobox-icon__right backgrsvg">
                                            </button>
                                        </div>
                                        <div class="body__combobox" hidden>
                                            <div class="item__combobox">10</div>
                                            <div class="item__combobox">40</div>
                                            <div class="item__combobox">50</div>
                                            <div class="item__combobox">100</div>
        
                                        </div>
        
                                    </div>
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_name item__right">

                            <label for="" class="content__input">Tên loại tài sản</label>
                            <br>
                            <input type="text" class="input__dailog">
                            <div class="erro">hello</div>
                        </div>
                    </div>
                    <div class="item__multiple">
                        <div class="item_code item__left">
                            <label for="" class="content__input">Số Lượng <span style="color: red;">*</span></label><br>
                            <input type="number" class="input__dailog text__right" placeholder="1" min="0">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                            <label for="" class="content__input">Nguyên giá <span
                                    style="color: red;">*</span></label><br>
                            <input type="text" class="input__dailog text__right" placeholder="100.000.000">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                            <label for="" class="content__input">số năm sử dụng <span
                                    style="color: red;">*</span></label><br>
                            <input type="text" class="input__dailog text__right" placeholder="0">
                            <div class="erro">hello</div>
                        </div>
                    </div>
                    <div class="item__multiple">
                        <div class="item_code item__left">
                            <label for="" class="content__input">Tỷ lệ hao mòn(%) <span
                                    style="color: red;">*</span></label><br>
                            <input type="number" class="input__dailog text__right" placeholder="0" min="0" max="100">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                            <label for="" class="content__input">Giá trị hao mòn năm <span
                                    style="color: red;">*</span></label><br>
                            <input type="text" class="input__dailog text__right" placeholder="10">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                            <label for="" class="content__input">Năm Theo dõi </label><br>
                            <input type="text" class="input__dailog text__right" placeholder="2021">
                            <div class="erro">hello</div>
                        </div>
                    </div>
                    <div class="item__multiple">
                        <div class="item_code item__left">
                            <label for="" class="content__input">Ngày mua<span style="color: red;">*</span></label><br>
                            <input type="date" class="input__dailog" placeholder="TS0001">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                            <label for="" class="content__input">Ngày bắt đầu sử dụng <span
                                    style="color: red;">*</span></label><br>
                            <input type="date" class="input__dailog" placeholder="TS0001">
                            <div class="erro">hello</div>
                        </div>
                        <div class="item_code item__left ">
                        </div>
                    </div>
                </div>
                <div class="dialog__footer">
                    <button class="btn__add btn">
                        Lưu
                    </button>
                    <button class="btn__cancel btn"> Hủy</button>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>