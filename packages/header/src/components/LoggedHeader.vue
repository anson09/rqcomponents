<template>
  <header class="logged-header">
    <a href="/" class="logged-header__logo"
      ><img src="../../assets/img/logo.png"
    /></a>
    <a
      v-for="(btn, idx) in btnConfigLeft"
      :class="['logged-header-btn__label left', { active: btn.active }]"
      :key="idx"
      :href="btn.link.href || btn.link"
      :target="btn.link.newBlock && '_blank'"
      >{{ btn.label }}</a
    >
    <div class="logged-header-btns">
      <div
        v-for="(btn, idx) in btnConfigRight"
        :key="idx"
        :class="[
          'logged-header-btn',
          {
            avatar: btn.type === 'avatar',
            active: btn.active
          }
        ]"
        @mouseover="openDropdown(idx)"
        @mouseleave="closeDropdown(idx)"
      >
        <a
          v-if="btn.label && !btn.links"
          class="logged-header-btn__label"
          :href="btn.link.href"
          :target="btn.link.newBlock && '_blank'"
          >{{ btn.label }}</a
        >
        <span
          v-else-if="btn.label"
          class="logged-header-btn__label"
          @click="clickHandler(btn)"
          >{{ btn.label }}</span
        >
        <img v-if="btn.type === 'avatar' && !avatar" :src="baseAvatar" alt="" />
        <img v-if="btn.type === 'avatar' && avatar" :src="avatar" alt="" />
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="rq-icons rq-icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <div
            class="logged-header-btn__dropdown"
            v-if="btn.links && btn.active"
            >
	    <p
	      v-if="btn.type === 'avatar' && username"
	      class="logged-header-btn__dropdown--username"
	      >{{username}}</p>
            <div
              class="logged-header-btn__dropdown--item"
              v-for="({ label, link, event }, linkIdx) in btn.links"
              :key="linkIdx"
            >
              <a
                v-if="link"
                :href="link.href || link"
                :target="link.newBlock && '_blank'"
                >{{ label }}</a
              >
              <span v-else @click="clickHandler({ event })">{{ label }}</span>
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
    },
    username: {
      required: true,
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
      btnConfigRight: logged.right
    };
  },
  computed: {
    btnConfigLeft() {
      const { left } = logged;
      return left.map(btn => ({
          ...btn,
          active: this.$parent.getPath().includes(btn.link.href || btn.link)
        }));
    }
  },
  methods: {
    openDropdown(idx) {
      if (!this.btnConfigRight[idx].links) {
        return;
      }
      this.$set(this.btnConfigRight[idx], "active", true);
    },
    closeDropdown(idx) {
      if (!this.btnConfigRight[idx].links) {
        return;
      }
      this.$set(this.btnConfigRight[idx], "active", false);
    },
    async clickHandler(cfg) {
      if (cfg.event === "logout") {
        const { code } = await logout();
        if (code === 0) {
          localStorage.removeItem("rqAccount");
          localStorage.removeItem("rq-saas-ams-vuex");
          return this.redirect("/");
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
  position: relative;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 40px;
  padding-right: 20px;
  background: $bg-white;
  z-index: 1;
  box-shadow:0px 2px 4px 0px rgba(152,165,185,0.2);
  &__logo {
    display: block;
    img {
      display: block;
      width: 110px;
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
    span,
    a {
      @include text;
    }
    position: relative;
    box-sizing: border-box;
    display: flex;
    padding-right: 20px;
    align-items: center;
    transition: all 0.3s;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      height: 4px;
      background: transparent;
      transition: background 0.3s;
    }
    &__label {
      padding-left: 20px;
      cursor: pointer;
      &.left {
        @include rg-text;
        line-height: 1;
        margin-top: 10px;
        text-decoration: none;
        margin-left: 28px;
        padding: 0;
        &.active {
          color: $highlight;
        }
      }
    }
    &__label + .arrow {
      margin-left: 10px;
    }
    &:hover &__label {
      color: $highlight;
    }
    .arrow {
      display: inline-block;
      width: 16px;
      transition: transform 0.3s;
      transform-origin: center;
    }
    &__dropdown {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      top: 40px;
      box-shadow: 0px 8px 12px 0px rgba(45, 54, 158, 0.08);
      background: $bg-white;
      z-index: -1;
      border-radius: 0 0 12px 12px;
      &--item {
        margin-top: 18px;
        a,
        span {
          cursor: pointer;
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
          @include text;
          padding: 0 20px;
        }
        &:hover {
          a,
          span {
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
      box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);
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
      padding-right: 40px;
      img {
        margin-left: 40px;
        width: 28px;
        height: 28px;
        object-fit: cover;
        border-radius: 50%;
      }
      &.active {
        background: $bg-white;
        box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);
      }
      .logged-header-btn__dropdown {
        padding: 0;
        &--username {
          position: relative;
          @include text;
          line-height: 1;
          padding: 8px 10px 6px 16px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          border-bottom: 1px solid rgba(235,238,245,1);
          &::before {
            content: "";
            position: absolute;
            display: block;
            @include m-center-vertical;
            top: 2px;
            left: 10px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: $success;
          }
        }
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
