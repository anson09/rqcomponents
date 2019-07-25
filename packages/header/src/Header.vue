<template>
  <header class="rqheader">
    <img :src="images.logo" alt="logo" class="rqheader__logo">
    <div class="rqheader-btns">
      <div
        v-for="(btn, idx) in btnConfig"
        :key="idx"
        :class="['rqheader-btn', {header: btn.type === 'header', active: btn.active}]"
        @click= "openDropdown(idx)"
      >
        <span v-if="btn.label" class="rqheader-btn__label">{{btn.label}}</span>
        <img v-if="avatar && btn.type === 'header'" :src="avatar" alt="">
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="rq-icons icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <div class="rqheader-btn__dropdown" v-if="btn.links && btn.active">
            <div class="rqheader-btn__dropdown--item"
              v-for="(link, linkIdx) in btn.links"
              :key="linkIdx"
            >
              <span>{{link.label}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import images from "../assets/img/*.png";
import headerBtns from "../assets/dict/header";
import { getAccount } from "../api";

export default {
  name: "RqHeader",
  data() {
    return {
      images,
      avatar: null,
      btnConfig: headerBtns
    }
  },
  async mounted() {
    //mock cookie
    // sid: a2c39e88-5151-4c68-a69f-5c45a26ce396|8058e3ada2f16fbbd90231c145795e7e92a03f2f72690c79eaf6c38a2db391a4f28d81e9a12ee90833d58ed8f59c9649feb951f5824871c40b330637afffe606
    const {avatar} = await getAccount()
    this.avatar = avatar
  },
  methods: {
    openDropdown(idx) {
      console.log(this)
      this.$set(this.btnConfig[idx], 'active', !this.btnConfig[idx].active);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/common";

.rqheader {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-left: 40px;
  padding-right: 20px;
  background: $header-bg;
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
    * {
      transition: all .3s;
    }
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
    img {
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
      background: $header-bg-active;
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
      background: $header-bg-active;
      color: $highlight;
      box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);
      .arrow {
        transform: rotate(180deg);
      }
      &::after {
        background: $highlight; 
      }
    }
    &.header {
      position: relative;
      height: 100%;
      img {
        width: 34px
      }
      &.active {
        background: $header-bg-active;
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
