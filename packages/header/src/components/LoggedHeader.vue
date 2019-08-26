<template>
  <header class="logged-header">
    <a href="/" class="logged-header__logo"
      ><img src="../../assets/img/logo.png"
    /></a>
    <div class="logged-header-btns">
      <div
        v-for="(btn, idx) in btnConfig"
        :key="idx"
        :class="['logged-header-btn', {avatar: btn.type === 'avatar', active: btn.active, active: btn.active}]"
        @click= "openDropdown(idx)"
        @mouseleave= "closeDropdown(idx)"
      >
        <a v-if="btn.label && !btn.links" class="logged-header-btn__label" :href="btn.link.href" :target="btn.link.newBlock && '_blank'">{{btn.label}}</a>
        <span v-else-if="btn.label" class="logged-header-btn__label" @click="clickHandler(btn)">{{btn.label}}</span>
        <img v-if="btn.type === 'avatar' && !avatar" :src="baseAvatar" alt="">
        <img v-if="btn.type === 'avatar' && avatar" :src="avatar" alt="">
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="rq-icons rq-icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <div class="logged-header-btn__dropdown" v-if="btn.links && btn.active">
            <div class="logged-header-btn__dropdown--item"
              v-for="({label, link, event}, linkIdx) in btn.links"
              :key="linkIdx"
            >
              <a v-if="link" :href="link.href || link" :target="link.newBlock && '_blank'">{{label}}</a>
              <span v-else @click="clickHandler({event})">{{label}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { logged } from "../../assets/dict/header.json";
import { logout } from "../../api";
import logo from "../../assets/img/logo.png";
import header from "../../assets/img/header.png";

export default {
  name: "LoggedHeader",
  props: {
    avatar: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      images: {
        logo,
        header
      },
      baseAvatar: header,
      btnConfig: logged
    }
  },
  methods: {
    openDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], "active", true);
    },
    closeDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], "active", false);
    },
    async clickHandler(cfg) {
      if (cfg.event === "logout") {
        const {code} = await logout();
        if (code === 0) {
          localStorage.removeItem("rqAccount");
          return this.redirect("/")
        }
      }
    },
    redirect(params) {
      this.$parent.handleLink(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/common";
.logged-header {
  position: absolute;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-left: 40px;
  padding-right: 20px;
  background: $bg-white;
  z-index: 1;
  &__logo {
    display: block;
    img {
      width: 136px;
    }
  }
  &-btn {
    a {
      text-decoration: none;
      &:-webkit-any-link {
        @include hover;
        @include text;
      }
    }
    span, a {
      @include text;
    }
    position: relative;
    box-sizing: border-box;
    display: flex;
    padding-right: 20px;
    align-items: center;
    transition: all .3s;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      height: 4px;
      background: transparent;
      transition: background .3s;
    }
    &__label {
      padding-left: 20px;
      cursor: pointer;
    }
    &__label + .arrow {
      margin-left: 10px;
    }
    &:hover &__label{
      color: $highlight;
    }
    .arrow {
      display: inline-block;
      width: 16px;
      transition: transform .3s;
      transform-origin: center;
    }
    &__dropdown {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      top: 70px;
      box-shadow: 0px 8px 12px 0px rgba(45,54,158,0.08);
      background: $bg-white;
      z-index: -1;
      border-radius: 0 0 12px 12px;
      &--item {
        margin-top: 18px;
        a, span {
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
          @include text;
          padding: 0 20px;
        }
        &:hover {
          a, span {
            color: $highlight;
          }
        }
        &:last-child {
          padding-bottom: 20px;
        }
      }
    }
    &.active {
      background: $bg-white;
      box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);
      .arrow {
        transform: rotate(180deg);
      }
      &::after {
        background: $highlight;
      }
    }
    &.avatar {
      position: relative;
      height: 100%;
      padding-right:40px;
      img {
        margin-left:40px;
        width: 34px;
        height: 34px;
        object-fit: cover;
        border-radius: 50%;
      }
      &.active {
        background: $bg-white;
        box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);
      }
      .logged-header-btn__dropdown {
        padding: 0;
        &--item {
          text-align: center;
          &:last-child {
            padding-bottom: 20px;
          }
        }
      }
    }
  }
  &-btns {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    height: 100%;
    flex-direction: row;
  }
}
</style>
