<template>
  <div className="container">
    <the-menu />

    <div className="the__body">
      <the-header />
      <the-body />
    </div>
  </div>
  <dialog-assets />
</template>

<script>
import DialogAssets from './components/TheDialog/DialogAssets.vue';
import TheBody from "./layout/TheBody.vue";
import TheHeader from "./layout/TheHeader.vue";
import TheMenu from "./layout/TheMenu.vue";

export default {
  name: "App",
  components: {
    TheMenu,
    TheHeader,
    TheBody,
    DialogAssets,
  },
};
</script>

<style>
body {
  margin: 0;
}
@import url(./css/main-employee.css);
</style>
