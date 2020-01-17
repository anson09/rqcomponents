<template>
  <div class="logged-header">
    <a href="/" class="logged-header__logo">
      <img :src="images.logo" data-theme="light" />
      <img :src="images.logoWhite" data-theme="dark" />
    </a>
    <div class="logged-header-btns left">
      <div
        v-for="(btn, idx) in btnConfigLeft"
        :key="idx"
        :class="['logged-header-btn',btn.className, { active: btn.active }]"
      >
        <a
          class="logged-header-btn__label"
          :href="btn.link.href || btn.link"
          :target="btn.link.newBlock && '_blank'"
          >{{ btn.label }}</a
        >
      </div>
    </div>
    <div class="logged-header-btns">
      <div
        v-for="(btn, idx) in btnConfigRight"
        :key="idx"
        :class="[
          'logged-header-btn',
	  btn.className,
          {
            avatar: btn.type === 'avatar',
            theme: btn.type === 'theme',
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
        <ThemeSwitch v-else-if="btn.type === 'theme'"></ThemeSwitch>

        <img v-if="btn.type === 'avatar' && !avatar" :src="baseAvatar" alt="" />
        <img v-if="btn.type === 'avatar' && avatar" :src="avatar" alt="" />
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="rq-icons rq-icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <div
            v-if="btn.links && btn.active"
            class="logged-header-btn__dropdown"
          >
            <p
              v-if="btn.type === 'avatar' && username"
              class="logged-header-btn__dropdown--username"
            >
              {{ username }}
            </p>
            <div
              v-for="({ label, link, event }, linkIdx) in btn.links"
              :key="linkIdx"
              class="logged-header-btn__dropdown--item"
            >
              <a
                :class="isActiveLink(link.href || link)"
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
  </div>
</template>

<script>
import { logged } from "../../assets/dict/header.json";
import { logout } from "../../api";
import logo from "../../assets/img/logo.png";
import logoWhite from "../../assets/img/logo-white.png";
import header from "../../assets/img/header.png";
import ThemeSwitch from "./logged-header/ThemeSwitch.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch
  },
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
        logoWhite
      },
      baseAvatar: header,
      btnConfigRight: logged.right
      // btnConfigRight: logged.right.map(e => ({...e, active: true}))
    };
  },
  computed: {
    btnConfigLeft() {
      const { left } = logged;
      return left.map(btn => ({
        ...btn,
        active: this.getPath().includes(btn.link.href || btn.link)
      }));
    }
  },
  methods: {
    isActiveLink(link) {
      return link.length > 2 && window.location.href.includes(link)
        ? "active"
        : "";
    },
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
          localStorage.removeItem("common_account");
          localStorage.removeItem("rq-saas-ams-vuex");
          return this.redirect("/");
        }
      }
      return false;
    },
    redirect(params) {
      this.$parent.handleLink(params);
    },
    getPath() {
      return this.$parent.getPath();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/common";

.theme {
  @each $i in dark, light {
    &-#{$i} {
      .logged-header {
        &__logo img[data-theme="#{$i}"] {
          opacity: 1;
        }
      }
    }
  }
}
.logged-header {
  position: relative;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 40px;
  padding-right: 20px;
  background: rqthemify(background-color);
  z-index: 1;
  box-shadow: 0px 2px 4px 0px;
  color: rqthemify(shadow-color);
  &__logo {
    position: relative;
    display: block;
    width: 98px;
    height: 24px;
    margin-right: 16px;
    img {
      position: absolute;
      width: 100%;
      opacity: 0;
    }
  }
  &-btns {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    flex-direction: row;
    &.left {
      flex: auto;
    }
  }
  &-btn {
    padding: 0 16px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding-top: 4px;
    a {
      text-decoration: none;
    }
    span,
    a {
      @include text(rqthemify(text));
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: transparent;
      transition: background 0.3s;
    }
    &__label {
      cursor: pointer;
    }

    &__label + .arrow {
      margin-left: 4px;
    }
    &:hover {
      background: rqthemify(active-background-color);
      box-shadow: 0px 2px 4px 0px rgba(152, 165, 185, 0.2);
      color: rqthemify(shadow-color);
      .arrow {
        transform: rotate(180deg) scale(0.5);
        color: rqthemify(hover-color);
      }
      .logged-header-btn__label {
        color: rqthemify(highlight);
        font-weight: 600;
      }
      &::after {
        background: rqthemify(hover-color);
      }
    }
    .arrow {
      display: inline-block;
      width: 8px;
      transition: transform 0.3s;
      transform-origin: right;
      transform: scale(0.5);
      .rq-icons {
        font-size: 16px;
      }
    }
    & &__dropdown {
      position: absolute;
      box-sizing: border-box;
      min-width: 100%;
      top: 40px;
      left: 0;
      box-shadow: 0px 8px 12px 0px;
      color: rqthemify(shadow-color);
      background: rqthemify(active-background-color);
      z-index: 1;
      border-radius: 0 0 2px 2px;
      &--item {
        margin-top: 18px;
        a,
        span {
          cursor: pointer;
          box-sizing: border-box;
          display: inline-block;
          min-width: 100%;
          white-space: nowrap;
          @include text(rqthemify(text));
          padding: 0 20px;
          &.active {
            color: rqthemify(hover-color);
          }
        }
        &:hover {
          a,
          span {
            color: rqthemify(hover-color);
          }
        }
        &:last-child {
          padding-bottom: 20px;
        }
      }
    }
    &.active &__label {
      color: rqthemify(hover-color);
    }
    &.theme {
      margin-top: 4px;
      padding: 0;
      font-size: 16px;
    }
    &.road-show {
      height: auto;
      padding: 2px 20px;
      margin-top: 4px;
      margin-right: 20px;
      border: 1px solid rqthemify(highlight);
      border-radius: 20px;
      transition: all .3s;
      a {
        color: rqthemify(highlight);
      }
      &::after {
	display: none;
      }
      &:hover,
      &:active {
	background: rqthemify(highlight);
	a {
	  color: white;
	}
      }
	
    }
    &.avatar {
      position: relative;
      height: 100%;
      img {
        width: 28px;
        height: 28px;
        object-fit: cover;
        border-radius: 50%;
      }
      &.active {
        background: rqthemify(active-background-color);
      }
      .logged-header-btn__dropdown {
        left: auto;
        right: 0;
        padding: 0;
        background: rqthemify(active-background-color);
        &--username {
          position: relative;
          @include text(rqthemify(text));
          line-height: 1;
          box-sizing: border-box;
          width: 108px;
          padding: 8px 10px 6px 16px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: 1px solid rqthemify(border);
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
            background: rqthemify(success);
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
}
</style>
