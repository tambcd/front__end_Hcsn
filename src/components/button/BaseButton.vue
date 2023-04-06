<template>
    <button class="btn-base" :class="{btn__dark:btnType == 1,btn__color:btnType == 2} ">
        {{btnName}}
    </button>
</template>

<script>
export default {
    name:'BaseButton',
 props:{
    /**Nhãn của button */
        btnName:String,
        btnType:String
    },
}
</script>

<style scoped>
.btn-base{
    padding: 0 16px;
    border-radius: 4px ;
    height: 36px;
    border: none;    
    cursor: pointer;
    width: 100px;
}
.btn__dark{
    border: 1px solid #111;
    background-color: #fff;
}

.btn__dark:focus{
    border: #1aa4c8 1px solid;
    color: #1aa4c8;
}
.btn__dark:hover{
    border: #1aa4c8 1px solid;
    color: #1aa4c8;
}
.btn__color:focus {
    background-color: #0cc3f0 ;
}
.btn__color:hover{
    background-color: #0cc3f0 ;
}
.btn__color{
    color: #fff;
    background-color: #1aa4c8;
    border: 0px;
}



</style>