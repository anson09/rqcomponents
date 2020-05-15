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
        :class="['logged-header-btn', { active: btn.active }]"
      >
        <a
          :href="btn.link.href || btn.link"
          :target="btn.link.newBlock && '_blank'"
          class="logged-header-btn__label"
          >{{ btn.label }}</a
        >
      </div>
    </div>
    <div class="logged-header-btns">
      <!-- 工作空间 路演 帮助文档 社区  消息 主题 头像 -->
      <!-- type 工作空间 消息 主题 头像 -->
      <!-- none type 路演 帮助文档 社区  -->
      <div
        v-for="(btn, idx) in btnConfigRight"
        :key="idx"
        :class="[
          'logged-header-btn',
          btn.className,
          {
            active: btn.active,
          },
        ]"
        @mouseover="openDropdown(idx)"
        @mouseleave="closeDropdown(idx)"
      >
        <workspace-switch
          v-if="btn.type === 'workspace'"
          v-bind="btn"
          v-on="$listeners"
        ></workspace-switch>

        <theme-switch
          v-else-if="btn.type === 'theme'"
          :active="btn.active"
        ></theme-switch>
        <message v-else-if="btn.type === 'message'"></message>
        <!-- 纯按钮: 社区 路演 -->
        <a
          v-else-if="btn.label && !btn.links"
          class="logged-header-btn__label"
          :href="btn.link.href"
          :target="btn.link.newBlock && '_blank'"
          >{{ btn.label }}</a
        >
        <!-- 非以上且有label:  帮助文档 -->
        <span v-else-if="btn.label" class="logged-header-btn__label">{{
          btn.label
        }}</span>
        <!-- 头像 -->
        <template v-if="btn.type === 'avatar'">
          <img v-if="!avatar" :src="baseAvatar" alt="" />
          <img v-else :src="avatar" alt="" />
          <div v-if="isVip" class="avatar-vip">
            {{ vipText }}
          </div>
        </template>
        <!-- 没有 type 的有二级链接的: 帮助文档 -->
        <span v-if="btn.links && !btn.type" class="arrow">
          <i class="el-icon-arrow-down"></i>
        </span>
        <transition name="rq-zoom-in-top">
          <!-- 有二级链接: 帮助文档 头像 -->
          <div
            v-show="btn.links && btn.active"
            class="logged-header-btn__dropdown"
          >
            <p
              v-if="btn.type === 'avatar' && username"
              class="logged-header-btn__dropdown--username"
            >
              {{ username }}
            </p>
            <div
              v-for="({ label, link, event, links }, linkIdx) in btn.links"
              :key="linkIdx"
              class="logged-header-btn__dropdown--item"
            >
              <!-- 三级链接 -->
              <template v-if="links">
                <i class="el-icon-arrow-right"></i>
                <div class="logged-header-btn__dropdown--subitem-container">
                  <p
                    v-for="(sublink, sublinkIdx) in links"
                    :key="sublinkIdx"
                    class="logged-header-btn__dropdown--subitem"
                    @click="clickHandler({ redirect: sublink.link })"
                  >
                    {{ sublink.label }}
                  </p>
                </div>
              </template>
              <p
                class="logged-header-btn__dropdown--item-text"
                :class="isActiveLink((link && link.href) || link)"
                @click="clickHandler({ event, redirect: link })"
              >
                {{ label }}
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { logged } from "../assets/dict/header.json";
import logo from "../assets/img/logo.png";
import logoWhite from "../assets/img/logo-white.png";
import header from "../assets/img/header.png";
import ThemeSwitch from "./logged-header/ThemeSwitch.vue";
import Message from "./logged-header/Message.vue";
import WorkspaceSwitch from "./logged-header/WorkspaceSwitch.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch,
    Message,
    WorkspaceSwitch,
  },
  props: {
    avatar: {
      default: "",
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    isVip: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      vipText: "企",
      images: {
        logo,
        logoWhite,
      },
      baseAvatar: header,
      btnConfigRight: logged.right,
      // btnConfigRight: logged.right.map(e => ({...e, active: true}))
    };
  },
  computed: {
    btnConfigLeft() {
      const { left } = logged;
      return left.map((btn) => ({
        ...btn,
        active: this.getPath().includes(
          (btn.link && btn.link.href) || btn.link
        ),
      }));
    },
  },
  methods: {
    isActiveLink(link) {
      return link && link.length > 2 && window.location.href.includes(link)
        ? "active"
        : "";
    },
    openDropdown(idx) {
      if (
        !this.btnConfigRight[idx].links &&
        this.btnConfigRight[idx].type !== "theme"
      ) {
        return;
      }
      this.$set(this.btnConfigRight[idx], "active", true);
    },
    closeDropdown(idx) {
      if (
        !this.btnConfigRight[idx].links &&
        this.btnConfigRight[idx].type !== "theme"
      ) {
        return;
      }
      this.$set(this.btnConfigRight[idx], "active", false);
    },
    clickHandler(cfg) {
      if (cfg.event === "logout") {
        this.$emit("logout");
      }
      if (cfg.redirect) {
        this.redirect(cfg.redirect);
      }
      return false;
    },
    redirect(params) {
      this.$parent.handleLink(params);
    },
    getPath() {
      return this.$parent.getPath();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixins";

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
    padding: 0 20px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    cursor: pointer;
    a {
      text-decoration: none;
    }
    span,
    a {
      @include text(rqthemify(text));
      line-height: 20px;
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

    &__label + .arrow {
      margin-left: 4px;
    }

    .arrow {
      display: inline-block;
      width: 8px;
      transition: transform 0.3s;
      transform-origin: right;
      margin-right: 8px;
      .icon-base {
        font-size: 16px;
      }
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
    & &__dropdown {
      position: absolute;
      box-sizing: border-box;
      min-width: 100%;
      top: 100%;
      left: 0;
      padding-top: 4px;
      box-shadow: 0px 8px 12px 0px rgba(152, 165, 185, 0.2);
      color: rqthemify(shadow-color);
      background: rqthemify(active-background-color);
      z-index: 1;
      border-radius: 0 0 2px 2px;

      &--item {
        position: relative;
        margin-bottom: -8px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        @include text(rqthemify(text));
        &-text {
          white-space: nowrap;
          padding: 12px 20px;
        }
        .el-icon-arrow-right {
          right: 10px;
          position: absolute;
          @include t-center-vertical;
        }
      }

      &--subitem {
        display: block;
        padding: 12px 20px;
        margin-bottom: -8px;
        white-space: nowrap;
        font-weight: 500;
        @include text(rqthemify(text));
        &:last-child {
          margin-bottom: 0;
        }
        &:hover,
        &:active,
        &:focus {
          color: rqthemify(hover-color);
          font-weight: 600;
        }
        &:hover {
          background: rqthemify(bg-hover);
        }
        &:active,
        &:focus {
          background: rqthemify(bg-active);
        }
        &-container {
          width: 188px;
          display: none;
          position: absolute;
          right: 0;
          top: -4px;
          transform: translateX(100%);
          background: rqthemify(container-bg);
          box-shadow: 20px 0px 20px 0px rgba(0, 0, 0, 0.15);
          padding: 4px 0;
          flex-direction: column;
        }
      }

      @mixin item-text-active($bg-color) {
        background: $bg-color;
        color: rqthemify(hover-color);
        font-weight: 600;
      }

      $pre-class-name: logged-header-btn__dropdown;
      .#{$pre-class-name}--item-text:hover {
        @include item-text-active(rqthemify(bg-hover));
      }

      .#{$pre-class-name}--item:hover .#{$pre-class-name}--subitem-container {
        display: block;
      }

      .#{$pre-class-name}--subitem-container:hover {
        background: rqthemify(active-background-color);
        ~ .#{$pre-class-name}--item-text {
          @include item-text-active(rqthemify(bg-view));
        }
      }
    }
    &.active &__label {
      color: rqthemify(hover-color);
    }
    &.docs &__dropdown--item-text {
      padding-right: 30px;
    }
    &.theme {
      padding: 0;
      font-size: 16px;
    }

    &.workspace,
    &.message {
      padding: 0;
    }
    &.road-show {
      height: auto;
      padding: 4px 20px;
      margin: 0 20px;
      border: 1px solid rqthemify(highlight);
      border-radius: 20px;
      transition: all 0.3s;
      .logged-header-btn__label {
        color: rqthemify(highlight);
      }
      &::after {
        display: none;
      }
      &:hover,
      &:active {
        background: rqthemify(highlight);
        .logged-header-btn__label {
          color: rqthemify(text-white);
        }
      }
    }
    &.avatar {
      position: relative;
      height: 100%;
      img {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: 50%;
      }
      .avatar-vip {
        position: absolute;
        right: 16px;
        bottom: 2px;
        font-size: 16px;
        padding: 4px;
        line-height: 1;
        transform-origin: right bottom;
        transform: scale(0.6);
        background: #1b5fc4;
        border-radius: 50%;
        color: white;
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
        &--item-text {
          justify-content: center;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rqthemify(scrollbar-background);
    border-radius: 3px;
  }
}
</style>
