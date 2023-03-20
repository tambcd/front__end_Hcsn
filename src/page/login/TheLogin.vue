<template>
  <div class="login-layout">
    <div class="login-form">
      <div class="login-form-left"></div>
      <div class="login-form-right">
        <div class="main-login">
          <div class="logo"></div>
          <div class="login-title">
            Đăng nhập để làm việc với
            <span style="font-weight: 700"> MISA QLTS</span>
          </div>
            <BaseInput
              heightInput="44px"
              widthInput="100%"
              contentInput="Username, email hoặc số điện thoại"
              marginInput="16px"              
            />
            <BaseInput
              heightInput="44px"
              widthInput="100%"
              contentInput="Mật Khẩu"
              marginInput="16px"              
            />
          <div class="login-btn">
            <button class="btn1213">Đăng nhập</button>
          </div>
          <div class="login-btn">
            <button class="btn1213">Quên mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$
  },
};
</script>

<style scope>
@import url(./login.css);
</style>