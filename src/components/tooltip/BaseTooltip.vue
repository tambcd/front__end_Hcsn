<template>  
    <span tooltip="" :flow="position" v-if="!display"><slot></slot></span>
    <span :tooltip="tooltipText" :flow="position" v-else><slot></slot></span>
 
</template>

<script>
export default {
  props: {
    /** nhãn tooltip */
    tooltipText: {
      type: String,
      default: "",
    },
    /** vị trí tooltip */
    position: {
      default: "down",
      type: String,
    },
    display:{
      default:false
    }
  },

}
</script>

<style  scoped>

@import url(@/css/components/tooltip/tooltip.css);

</style>
