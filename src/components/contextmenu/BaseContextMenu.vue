<template>
<a ref="#" >
  <div
    class="context-menu"
    :style="{
      top: positionTop.toString() + 'px',
      left: positionleft.toString() + 'px',
    }"
  >
    <div class="context-item" @click="openAddAsset()">
      <div class="icon48 bg-icon-context">
            <div class="icon-add icon16 backgrsvg"></div>
      </div>
      <div class="menu-content"> Thêm</div>
    </div>
    <div class="context-item " @click="openUpdateAsset()">
      <div class="icon48 bg-icon-context">
        <div class="icon-update icon16 backgrsvg"></div>
      </div>
      <div class="menu-content "> Sửa</div>
    </div>
    <div class="context-item" @click="openDeleteAsset()">
      <div class="icon48 bg-icon-context">
        <div class="icon-delete icon16 backgrsvg"></div>
      </div>
      <div class="menu-content"> Xóa</div>
    </div>
    <div class="context-item" @click="openReplicationAsset()">
      <div class="icon48 bg-icon-context">
        <div class="icon-repli icon16 backgrsvg"></div>
      </div>
      <div class="menu-content"> Nhân bản </div>
    </div>
  </div>
</a>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    asset: {},
    positionTop: {
      default: 900,
    },
    positionleft: {
      default: 452,
    },
  },
   mounted() {
     document.addEventListener('click', this.close)
  },
  beforeDestroyed() {
    document.removeEventListener('click',this.close)
  },
  methods: {
    /**
     * @create by : MF1270
     * @create day :09/04/2023
     * ham : mở form thêm mới
     */
    openAddAsset() {
      this.$emit("openAdd");
    },

    /**
     * @create by : MF1270
     * @create day :09/04/2023
     * ham : mở form sửa
     */
    openUpdateAsset() {
      this.$emit("openUpdate", this.asset);
    },
    /**
     * @create by : MF1270
     * @create day :09/04/2023
     * ham : mở xác nhận xóa
     */
    openDeleteAsset() {
      this.$emit("openDelete", this.asset);
    },
    /**
     * @create by : MF1270
     * @create day :09/04/2023
     * ham : mở form nhân bản
     */
    openReplicationAsset() {
      this.$emit("openReplication", this.asset);
    },
      /**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : click ra ngoài đóng 
     */
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.$emit("closeContextMenu");
      }
  },
  

  }
  
};
</script>

<style scoped>
.bg-icon-context{
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-add{  
  background-position: -467px -423px;  
}
.icon-update{  
  background-position: -156px -68px;  
}
.icon-delete{  
  background-position: -419px -111px;  
}
.icon-repli{  
   background-position: -244px -112px; 
}

.context-menu {
  border-radius: 4px;
  z-index: 1000;
  position: fixed;
  width: 250px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .16) !important;
}
.context-item {
  cursor: pointer;
  height: 48px;
  width: 250px;
  font-family: MISA__Regular;
  color: #212121;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
}
.context-item:hover {
  background: #d1edf4;
}
.menu-content {
  padding-left: 6px;
}
</style>