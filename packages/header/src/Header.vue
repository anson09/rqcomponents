<template>
  <header class="rqheader">
    <img :src="images.logo" alt="logo" class="rqheader__logo">
    <div class="rqheader-btns">
      <div
        v-for="(btn, idx) in btnConfig"
        :key="idx"
        :class="['rqheader-btn', {avatar: btn.type === 'avatar', active: btn.active, active: btn.active}]"
        @click= "openDropdown(idx)"
        @mouseleave= "closeDropdown(idx)"
      >
        <span v-if="btn.label" class="rqheader-btn__label" @click="clickHandler(btn)">{{btn.label}}</span>
        <img v-if="btn.type === 'avatar' && !avatar" :src="baseAvatar" alt="">
        <img v-if="btn.type === 'avatar' && avatar" :src="avatar" alt="">
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="rq-icons icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <div class="rqheader-btn__dropdown" v-if="btn.links && btn.active">
            <div class="rqheader-btn__dropdown--item"
              v-for="(link, linkIdx) in btn.links"
              :key="linkIdx"
            >
              <span @click="clickHandler(link)">{{link.label}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import headerBtns from "../assets/dict/header.json";
import { getAccount } from "../api";
import logo from "../assets/img/logo.png";
import header from "../assets/img/header.png";

export default {
  name: "RqHeader",
  data() {
    return {
      images: {
        logo,
        header
      },
      baseAvatar: header,
      avatar: "",
      btnConfig: headerBtns
    }
  },
  async mounted() {
    const {data: {avatar}} = await getAccount();
    if (avatar) {
      this.avatar = avatar;
    }
  },
  methods: {
    openDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], "active", !this.btnConfig[idx].active);
    },
    closeDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], "active", false);
    },
    clickHandler(cfg) {
      if (cfg.href) {
        return this.redirect(cfg.href)
      } else if (cfg.event) {
        this.$emit(...cfg.event)
      }
    },
    redirect(href) {
      if (href) {
        window.location.href = href;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/common";

.rqheader {
  position: relative;
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
    width: 136px;
  }
  &-btn {
    position: relative;
    box-sizing: border-box;
    display: flex;
    padding-right: 20px;
    align-items: center;
    transition: all .3s;
    @include text;
    @include hover;
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
      padding-left:20px;
    }
    &__label + .arrow {
      margin-left: 10px;
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
      padding: 0 20px;
      box-shadow: 0px 8px 12px 0px rgba(45,54,158,0.08);
      background: $bg-white;
      z-index: -1;
      border-radius: 0 0 12px 12px;
      &--item {
        padding-top: 18px;
        @include hover;
        @include text;
        &:last-child {
          padding-bottom: 20px;
        }
      }
    }
    &.active {
      background: $bg-white;
      color: $highlight;
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
      img {
        margin-left:20px;
        width: 34px;
        border-radius: 50%;
      }
      &.active {
        background: $bg-white;
        box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);
      }
      .rqheader-btn__dropdown {
        padding: 0;
        &--item {
          text-align: center;
          padding-top: 18px;
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
