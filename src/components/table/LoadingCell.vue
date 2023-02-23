<template lang="html">
   <td v-bind="$attrs">
        <div class="skeleton-box">
        </div>
    </td>
</template>

<script>
export default {};
</script>

<style lang="css" scope>
td {
  position: relative;
  white-space: pre-wrap;
  padding-top: 8px;
  padding-bottom: 8px;
  vertical-align: middle;
}
.skeleton-box {
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 20px;
  background-color: #f4f5f8;
}
.skeleton-box:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.2) 20%,
    hsla(0, 0%, 100%, 0.5) 60%,
    hsla(0, 0%, 100%, 0)
  );
  -webkit-animation: shimmer-data 0.8s infinite;
  animation: shimmer-data 0.8s infinite;
  content: "";
}
@-webkit-keyframes shimmer-data {
  to {
    transform: translateX(100%);
  }
}
@keyframes shimmer-data {
  to {
    transform: translateX(100%);
  }
}
</style>