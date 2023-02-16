<template>
   <div class="toolbar">
                    <div class="toolbar__filter">

                        <div class="toolbar-filter__text" style="width: 179px;">
                            <div class="input__icon icon24 backgrsvg"></div>
                            <input type="text" class="input" placeholder="Tìm kiếm tài sản...">
                        </div>
                        <div class="toolbar-filter__dropdown__assets dropdown">
                            <div class="header__dropdown">
                                <div class="dropdown-left">
                                    <div class="dropdown-icon__left icon24 backgrsvg">
                                    </div>
                                    <div class="dropdown-value">
                                        Loại tài sản
                                    </div>
                                </div>
                                <button class="dropdown-icon__right backgrsvg">
                                </button>
                            </div>
                            <div class="body__dropdown" hidden>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>

                            </div>

                        </div>
                        <div class="toolbar-filter__dropdown__assets dropdown">
                            <div class="header__dropdown">
                                <div class="dropdown-left">
                                    <div class="dropdown-icon__left icon24 backgrsvg">
                                    </div>
                                    <div class="dropdown-value">
                                        Bộ phận sử dụng
                                    </div>
                                </div>
                                <button class="dropdown-icon__right backgrsvg">
                                </button>
                            </div>
                            <div class="body__dropdown" hidden>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>
                                <div class="item__dropdown">hello</div>

                            </div>

                        </div>

                    </div>
                    <div class="toolbar__action">
                        <button class="btn__add button">
                            + Thêm tài sản

                        </button>
                        <button class="btn__export icon36 button__icon backgrsvg ">

                        </button>
                        <button class="btn__delete icon36 button__icon backgrsvg">

                        </button>

                    </div>
                </div>
                <div class="table">
                    <data-table/>
                </div>
                
                
</template>

<script>
import DataTable from '@/components/table/DataTable.vue'
export default {
  components: { DataTable },

}
</script>

<style>

</style>