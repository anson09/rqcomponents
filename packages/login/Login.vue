<template>
  <div class="rq-login">
    <div class="rq-login-header">
      <img class="rq-login-header__logo" :src="logo" />
    </div>
    <div class="rq-login-form__wrapper">
      <form action="" class="rq-login-form" @submit="doLogin">
        <img class="rq-login-form__logo" :src="logo" />
        <p class="rq-login-form__title">账号登录</p>
        <input
          v-model.trim="username"
          placeholder="手机号或邮箱"
          type="text"
          class="rq-login-form__input"
        />
        <input
          v-model.trim="password"
          placeholder="密码"
          type="password"
          class="rq-login-form__input"
        />
        <p v-if="errorMessage" class="rq-login-form__error">
          {{ errorMessage }}
        </p>
        <button type="submit" class="rq-login-form__button">登录</button>
      </form>
    </div>
  </div>
</template>
<script>
import { login } from "./api/index";
import logo from "./assets/img/logo.png";

export default {
  name: "Login",
  props: {
    logo: { type: String, default: logo },
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  computed: {
    isUsernamePhone() {
      return !isNaN(this.username);
    },
    isUsernameEmail() {
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/i.test(this.username);
    },
  },
  methods: {
    async doLogin(event) {
      event.preventDefault();
      const rules = [
        {
          isValid: this.isUsernamePhone || this.isUsernameEmail,
          message: "请输入正确手机号或邮箱",
        },
        { isValid: this.password, message: "请输入密码" },
      ];

      this.errorMessage = rules.find(({ isValid }) => !isValid)?.message ?? "";
      if (this.errorMessage) return;
      try {
        const res = await login({
          username: this.isUsernamePhone
            ? encodeURIComponent(`+86${this.username}`)
            : this.username,
          password: this.password,
        });
        if (res.code !== 0) {
          throw new Error(res.message);
        }
        this.$emit("after-login");
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common/style/mixins.scss";
@include reset;
@include block(login) {
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-header);
  @include f-column;

  &-header {
    background: var(--bg-primary);
    @include f-center(flex-start);
    padding-left: 24px;
    width: 100%;
    &__logo {
      width: 194px;
      margin: 10px 0;
    }
  }
  &-form {
    width: 620px;
    padding: 63px 100px 54px;
    background-color: var(--bg-primary);
    @include f-column;
    box-shadow: var(--bg-shadows);
    border-radius: 4px;
    &__wrapper {
      flex: 1 auto;
      width: 100%;
      @include f-center;
    }
    &__logo {
      width: 240px;
    }

    &__title {
      color: var(--primary-color);
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      margin: 48px 0 24px;
    }
    &__input {
      width: 100%;
      border: 1px solid var(--border-primary);
      border-radius: 4px;
      margin-bottom: 18px;
      height: 48px;
      line-height: 48px;
      padding-left: 16px;
      color: var(--text-title);
      outline: none;
      font-size: 14px;
      &:active,
      &:focus {
        border-color: var(--primary-color);
      }
    }
    ::placeholder {
      color: var(--border-primary);
      font-size: 14px;
    }
    &__button {
      width: 100%;
      background-color: var(--primary-color-5);
      border-radius: 4px;
      line-height: 48px;
      color: var(--text-btn);
      font-size: 16px;
      margin-top: 18px;
      &:hover,
      &:active,
      &:focus {
        background-color: var(--primary-color-8);
      }
    }
    &__error {
      color: var(--error-color);
      font-size: 12px;
      line-height: 16px;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
