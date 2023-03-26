<template>
    <DatePicker v-model:value ="value" format="DD/MM/YYYY" value-type="YYYY-MM-DD" lang="vi"></DatePicker>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      dataTest  :new Date()

    }
  },
  methods: {
    
  },
  mounted() {
    if(new Date().getMonth()+1<10){
          this.value = new Date().getUTCFullYear().toString() + "-0" + (new Date().getMonth()+1).toString() +"-"+new Date().getDate().toString()

    }
    else{
        this.value = new Date().getUTCFullYear().toString() + "-" + (new Date().getMonth()+1).toString() +"-"+new Date().getDate().toString()

    }
  },
  watch: {
    
  },
};
</script>

<style>
</style>