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
    border: 1px solid #afafaf;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    background-color: #fff;
}


.btn__dark:hover,
.btn__dark:focus{
    border: #1aa4c8 1px solid;
    background: #1aa4c8;
    color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}
.btn__color:focus,
.btn__color:hover {
     border: #1aa4c8 1px solid;
    background: #1aa4c8;
    color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}

.btn__color{
    border: 1px solid #afafaf;
    color: #fff;
    background-color: #1aa4c8;
    border: 0px;
}
</style>