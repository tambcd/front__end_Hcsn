<template>
  <div class="container">
    <the-menu @ChangetypeMenu = "ChangeMenu"/>

    <div class="the__body" :class="{'the__body__mini' : isTypeMenu }">
      <the-header />
      <the-body />
    </div>
  </div>
  <dialog-assets />
</template>

<script>
import DialogAssets from './components/TheDialog/DialogAssets.vue';
import TheMenu from './layout/Sidebar/TheMenu.vue';
import TheBody from "./layout/TheBody.vue";
import TheHeader from "./layout/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheBody,
    DialogAssets,
    TheMenu,
  },
  data() {
    return {
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
@import url(./css/main__css.css);
</style>
