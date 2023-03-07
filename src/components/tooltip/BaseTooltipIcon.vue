<template>
   <div @mouseover="event">
        <div class="tooltip-txt" >{{tooltipContent}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>