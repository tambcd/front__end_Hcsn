<template>
  <table class="table__assets">
    <tr class="header__table weight700">
      <th class="first__column center input_checkbox" ref="checkBoxAll">
        <input type="checkbox" />
      </th>
      <th class="center" style="width: 50px">STT</th>
      <th style="min-width: 150px">Mã tài sản</th>
      <th style="min-width: 150px">Tên tài sản</th>
      <th style="min-width: 150px">Loại tài sản</th>
      <th style="min-width: 150px">Bộ phận sử dụng</th>
      <th class="right" style="min-width: 50px">Số lượng</th>
      <th class="right" style="width: 150px">Nguyên giá</th>
      <th class="right" style="width: 150px">HM/KH lũy kế</th>
      <th class="right" style="width: 150px">Giá trị còn lại</th>
      <th style="min-width: 100px" class="The-actions center header-actions">Chức năng</th>
    </tr>
    <tbody>
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
      <item-table  />
    </tbody>

    <tr class="Last_row">
      <td colspan="5" class="first__column">
        <div class="the-paging">
          <div class="total">
            Tổng số: <span class="weight700">200</span> bản ghi
          </div>
          <div class="drop__paging dropdown">
            <div class="header__dropdown">
              <div class="dropdown-left">
                <div class="dropdown-value">20</div>
              </div>
              <button class="dropdown-icon__right backgrsvg"></button>
            </div>
            <div class="body__dropdown" hidden>
              <div class="item__dropdown">10</div>
              <div class="item__dropdown">40</div>
              <div class="item__dropdown">50</div>
              <div class="item__dropdown">100</div>
            </div>
          </div>
          <div class="number__page">
            <button class="btn__page icon20 btn__back"> a </button>
            <button class="btn__page icon20 btn__item">1</button>
            <button class="btn__page icon20 btn__item">2</button>
            <button class="btn__page icon20 btn__item">...</button>
            <button class="btn__page icon20 btn__item">10</button>
            <button class="btn__page icon20 btn__new">></button>
          </div>
        </div>
      </td>

      <td></td>
      <td class="right" style="width: 50px">13</td>
      <td class="right" style="width: 150px">249.000.000</td>
      <td class="right" style="width: 150px">19.176.00</td>
      <td class="right" style="width: 150px">229.284.000</td>
      <td class="The-actions center" style="width: auto"></td>
    </tr>
  </table>
</template>

<script>
import ItemTable from "./ItemTable.vue";
export default {
  components: { ItemTable },
};
</script>

<style>
</style>