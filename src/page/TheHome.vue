<template>
    <DatePicker v-model:value ="value" format="DD/MM/YYYY" ></DatePicker>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  },
};
</script>

<style>
</style>