<template>
  <tr >
    <td class="center first__column input_checkbox" style="width: 50px">
      <input type="checkbox" :checked="ischeckItem" />
    </td>
    <td class="center" style="width: 50px">{{this.indexItemTable}}</td>
    <td style="width: 150px">{{dataItem.fixed_asset_code}}</td>
    <td style="min-width: 150px">{{dataItem.fixed_asset_name}}</td>
    <td>{{dataItem.fixed_asset_category_name}}</td>
    <td style="width: 150px">{{dataItem.department_name}}</td>
    <td class="right" style="width: 50px">{{dataItem.quantity}}</td>
    <td class="right" style="width: 150px">{{dataItem.cost}}</td>
    <td class="right" style="width: 150px">{{dataItem.depreciation_value}}</td>
    <td class="right" style="width: 150px">{{dataItem.cost - dataItem.depreciation_value }}</td>
    <td class="The-actions center" style="width: auto">
      <button class="btn__edit btn__action backgrsvg"></button>
    </td>
  </tr>
</template>

<script>
// import {Format} from "@/assets/js/Format";
export default {
  props:{
    indexItemTable:{
      default:""
    },
    dataItem:{}
  }
};
</script>

<style>
</style>