<template>
  <div class="container">
    <the-menu @ChangetypeMenu = "ChangeMenu"/>

    <div class="the__body" :class="{'the__body__mini' : isTypeMenu }">
      <the-header />
      <the-body />
    </div>
  </div>
    <TheLoading v-show="isReloadData" />

</template>

<script>
import TheMenu from './layout/Sidebar/TheMenu.vue';
import TheBody from "./layout/TheBody.vue";
import TheHeader from "./layout/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheBody,
    TheMenu,
  },
  mounted() {
    this.emitter.on("showLoading", (state) => {
      this.isReloadData = state;
    });
  },
  data() {
    return {
      isReloadData: false,
      isShift:false,
      isTypeMenu:false
    }
  },
   
  methods: {
      
    /**
     * Author: TVTam
     * created : tvTam (27/02/2023)
     * thay đổi size của sidebar
     */
    ChangeMenu(e){
      this.isTypeMenu =e
    }
  },
  
};
</script>

<style>
body {
  margin: 0;
}
@import url(./css/main.css);
</style>
