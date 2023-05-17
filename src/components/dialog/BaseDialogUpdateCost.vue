<template>
  <BaseDialog
    :contentForm="contextForm"
    @saveDialog="saveDialog()"
    bgMain="#ffffff"
    txtfocus="button"
    rootFocus="dialog__footer"
  >
    <div class="cost-body-dialog">
      <div class="cost-header">
        <div class="input-cost">
          <BaseInput
            tabindex="-1"
            :valueInputFisrt="depart_name"
            disabledInput="true"
            heightInput="35px"
            widthInput="100%"
            titleInput="Bộ phận sử dụng "
            marginInput="8px"
            @sendValueInput="
              (e) => {
                this.depart_name = e;
              }
            "
          />
        </div>
      </div>
      <div class="title-cost">Nguyên giá</div>
      <div class="title-cost_update">
        <div class="title-debut">
          <div class="source-cost">Nguồn hình thành</div>
          <div class="source-value">Giá trị</div>
        </div>
        <div class="title-value"></div>
      </div>
      <div class="list-value">
        <div class="cost-update">
          <BaseCostSource
            @getDataCobobox="
              (data, key) => {
                getDataCobobox(data, key, index);
              }
            "           
            :isValidateInputCb="listError[index].isInputValidate"
            :titleValidateCb="listError[index].messageInputValidate"
            :isValidate="listError[index].isValidate"
            :titleValidate="listError[index].messageValidate"
            :dataComboboxCost="costCources"
            :isSource="isOneSource"
            :focusCost="{'focus' : index==0}"
            v-for="(item, index) in listDatacost"
            :key="index"
            :valueCost="item.costValue"
            :codeSource="item.codeSource"
            @addItem="addItem"
            @deleteItem="deleteItem(index)"
            @dataInput="(data) => updateDataCost(data, index)"
          />
        </div>
        <div class="cost-bottom">
          <BaseCostSource :isPlus="false" :valueCost="sumCost" />
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import BaseCostSource from "./BaseCostSource.vue";
import BaseDialog from "./BaseDialog.vue";
import { get, getById, put } from "@/common/api/api.js";
import Resource from "@/common/resource/Resource";
import MISAEnum from "@/common/enums/enums";
import { toast } from "vue3-toastify";
import { formatMoney, moneyToNumber } from "@/common/helper/format";

export default {
  name: "BaseDialogUpdateCost",
  components: { BaseDialog, BaseCostSource },
  props: {
    idAsset: {
      default: "",
    },
    idLicense: {
      default: "",
    },
  },
  created() {
    get(
      "CostCources",
      (response) => {
        // Trường hợp thành công nhận về dữ liệu thì gán lại vào mảng Departments
        this.costCources = response.data;
      },
      (erro) => {
        // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
        toast.error(Resource.VN_ErroData, {
          autoClose: 2000,
          position: "top-center",
        });
        console.log(erro);
      }
    );
    this.getByIdAssetCost();
  },

  data() {
    return {
      isOneSource: true,
      contextForm: "",
      depart_name: "",
      sumCost: "",
      listDatacost: [],
      costCources: [],
      listError: [],
    };
  },
  methods: {
    /**
     * validate cập nhập tài sản
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    validate() {
      let isValidate = true;
      for (let i = 0; i < this.listDatacost.length; i++) {
        if (this.listDatacost[i].codeSource == "") {
          this.listError[i].isValidate = true;
          this.listError[i].messageValidate = Resource.Vn_SourceCostEmp;
          isValidate = false;
        }
        if (this.listDatacost[i].codeSource !== "") {
          this.listError[i].isValidate = false;
        } 
        if(i>0){
          for (let index = 0; index < i; index++) {
            if(this.listDatacost[i].codeSource == this.listDatacost[index].codeSource){
              this.listError[i].isValidate = true;
              this.listError[i].messageValidate = Resource.Vn_SourceCostSame;
              isValidate = false;
            }
            
          }
        }
        if (this.listDatacost[i].costValue == "0" || this.listDatacost[i].costValue.trim() == "") {
          this.listError[i].isInputValidate = true;
          this.listError[i].messageInputValidate = Resource.Vn_CostEmp;
          isValidate = false;
          
        }
      }
      return isValidate;
    },
    /**
     * Cập nhập đơn giá
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    updateCost(sumCost) {
      if (this.validate()) {
        this.emitter.emit("showLoading", true);
        put(
          `Assets`,
          "UpdateByCost",
          {
            idAsset: this.idAsset,
            idLicense: this.idLicense,
            cost: moneyToNumber(this.sumCost),
            new_cost: sumCost,
          },
          () => {
            // Trường hợp thành công nhận về dữ liệu thì toast thông báo
            toast.success(Resource.VN_UpdateSuccess, {
              autoClose: 2000,
              position: "bottom-right",
            });
            /// đóng loading
            this.emitter.emit("showLoading", false);
            //load lại data
            this.emitter.emit("ReloadData", MISAEnum.stateDialog.update);
            this.$emit("closeDialogUpdate");
          },
          (error) => {
            console.log(
              `${error.response.data.devMsg}: ${error.response.data.erros}`
            );
          }
        );
      }
    },
    /**
     * cập nhập nguyên giá
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    saveDialog() {
      this.updateCost(JSON.stringify(this.listDatacost));
    },
    /**
     * tổng nguyên giá
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    getSumCost() {
      this.sumCost = formatMoney(
        this.listDatacost.reduce((acc, obj) => {
          return acc + moneyToNumber(obj.costValue);
        }, 0)
      );
    },
    /**
     * Update data nguồn chi phí
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    getDataCobobox(data, key, index) {
      this.listDatacost[index].codeSource = data[key + "_code"];
    },
    /**
     * chuyển chuỗi sang mảng đối tườngj
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    convertStringToObjectArray(str) {
      return JSON.parse(str);
    },
    /**
     * lấy tài sản theo ID
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    getByIdAssetCost() {
      getById(
        "Assets",
        this.idAsset,
        (res) => {
          this.listDatacost = this.convertStringToObjectArray(
            res.data.cost_new
          );
          this.contextForm = "Sửa tài sản " + res.data.fixed_asset_name;
          this.depart_name = res.data.department_name;
          this.listError = Array.from(
            { length: this.listDatacost.length },
            () => ({
              isValidate: false,
              messageValidate: "",
              isInputValidate: false,
              messageInputValidate: "",
            })
          );
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(error);
        }
      );
    },
    updateDataCost(data, index) {
      this.listDatacost[index].costValue = data;
      this.getSumCost();
    },
    /**
     * Thêm nguồn nguyên giá
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    addItem() {
      this.isOneSource = true;
      this.listDatacost.push({
        codeSource: "",
        costValue: 0,
      });
      this.listError.push({
        isValidate: false,
        messageValidate: "",
        isInputValidate: false,
        messageInputValidate: "",
      });
    },
    /**
     * Xóa nguồn nguyên giá
     * @create by : MF1270
     * @create day : 1/03/2023
     */
    deleteItem(index) {
      if (this.listDatacost.length !== 1) {        
        this.listDatacost.splice(index, 1) 
      }
      if (this.listDatacost.length === 1) {
        this.isOneSource = false;
      }
      this.listError.splice(index, 1);
      this.getSumCost()
    },
    
  },
};
</script>

<style scoped>
.list-value {
  height: calc(550px - 235px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.source-cost {
  width: 60%;
}
.source-value {
  width: 35%;
}

.cost-body-dialog {
  background-color: #ffffff;
  width: 900px;
}
.cost-header {
  height: 80px;
}
.input-cost {
  width: 70%;
}
.title-cost {
  height: 20px;
  font-weight: 700;
  font-size: 16px;
}
.title-cost_update {
  height: 20px;
  margin-top: 10px;
  width: 100%;
  display: flex;
}
.title-debut {
  display: flex;
  justify-content: space-between;
  height: 20px;
  width: 70%;
}
.title-value {
  margin-left: 10px;
  height: 20px;
  width: 25%;
}
.cost-update {
  overflow: auto;
  height: calc(100% - 50px);
  width: 100%;
}
.cost-bottom {
  height: 50px;
}
</style>