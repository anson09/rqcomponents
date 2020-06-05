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
        :class="['logged-header-btn', 'is-left', { active: btn.active }]"
      >
        <el-button type="text" @click="handleLink(btn.link)">{{
          btn.label
        }}</el-button>
      </div>
    </div>

    <div class="logged-header-btns">
      <div
        v-for="(btn, idx) in btnConfigRight"
        :key="idx"
        :class="[
          'logged-header-btn',
          btn.type,
          { 'is-component': btn.component, active: btn.active },
        ]"
        @mouseover="openDropdown(idx)"
        @mouseleave="closeDropdown(idx)"
      >
        <component
          :is="btn.component"
          v-if="btn.component"
          v-bind="{ ...btn, ...$attrs }"
          :active="btn.active"
          v-on="$listeners"
          @logout="$emit('logout')"
          @handleLink="handleLink"
        >
        </component>

        <!-- 按钮式 -->
        <el-button
          v-if="btn.type === 'button'"
          plain
          @click="handleLink(btn.link)"
        >
          {{ btn.label }}
        </el-button>
        <!-- 文字 -->
        <el-button
          v-if="btn.type === 'text'"
          type="text"
          @click="handleLink(btn.link)"
          >{{ btn.label }}</el-button
        >
        <div v-if="btn.type === 'dropdown'" class="logged-header-btn__wrapper">
          <p class="logged-header__label">{{ btn.label }}</p>
          <i class="el-icon-caret-bottom"></i>
          <transition name="rq-zoom-in-top">
            <div v-show="btn.active" class="logged-header-btn-dropdown">
              <div
                v-for="(link, index) in btn.links"
                :key="index"
                class="logged-header-btn-dropdown__item"
              >
                <template v-if="link.links">
                  <i class="el-icon-arrow-right"></i>

                  <div class="logged-header-btn-dropdown__subitem-wrapper">
                    <div
                      v-for="(sublink, subindex) in link.links"
                      :key="subindex"
                      class="logged-header-btn-dropdown__subitem"
                      @click="handleLink(sublink.link)"
                    >
                      <p class="logged-header-btn-dropdown__sublabel">
                        {{ sublink.label }}
                      </p>
                    </div>
                  </div>
                </template>
                <p
                  class="logged-header-btn-dropdown__label"
                  @click="handleLink(link.link)"
                >
                  {{ link.label }}
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElButton from "element-ui/lib/button";
import { logged } from "../assets/dict/config";
import logo from "../assets/img/logo-small.png";
import logoWhite from "../assets/img/logo-white-small.png";
import ThemeSwitch from "./logged-header/ThemeSwitch.vue";
import Message from "./logged-header/Message.vue";
import WorkspaceSwitch from "./logged-header/WorkspaceSwitch.vue";
import Account from "./logged-header/Account.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch,
    Message,
    WorkspaceSwitch,
    Account,
    ElButton,
  },

  data() {
    return {
      images: {
        logo,
        logoWhite,
      },
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
      this.$set(this.btnConfigRight[idx], "active", true);
    },
    closeDropdown(idx) {
      this.$set(this.btnConfigRight[idx], "active", false);
    },
    clickHandler(cfg) {
      if (cfg.event === "logout") {
        this.$emit("logout");
      }

      if (cfg.redirect) {
        this.handleLink(cfg.redirect);
      }
      return false;
    },
    handleLink(params) {
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
  height: 41px;
  border-bottom: 1px solid rqthemify(--border-primary);
  padding-left: 40px;
  padding-right: 20px;
  background: rqthemify(--background-final);
  z-index: 1;
  color: rqthemify(--shadow-primary);

  &-btns {
    height: 100%;
    display: flex;
    align-items: center;
    @include text(rqthemify(--text-primary), 14, 20px);
    &.left {
      flex: auto;
    }
  }

  &-btn {
    position: relative;

    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:not(.is-component) {
      padding: 0 15px;
    }

    ::v-deep {
      .el-button {
        color: inherit;
        line-height: inherit;
      }
      .el-button--default {
        padding: 4px 20px;
        background-color: transparent;
        border-color: rqthemify(--text-primary);
        border-radius: 4px;
        &:hover {
          border-color: rqthemify(--primary-color-9);
          color: rqthemify(--white);
          background-color: rqthemify(--primary-color-9);
          @include click-scale();
        }
      }
    }
    &.is-component:hover {
      background: rqthemify(--dropdown-background);
    }
    &.dropdown:hover {
      background-color: rqthemify(--background-primary);
    }
    &:not(.button) {
      &::after {
        position: absolute;
        content: "";
        background: transparent;
        left: 0;
        top: 0;
        width: 100%;
        height: 4px;
      }
      &:hover {
        color: rqthemify(--text-hover);
        box-shadow: 0px 0px 20px rqthemify(--shadow-primary);

        &::after {
          background-color: rqthemify(--primary-color);
        }
      }
    }
    &.is-left {
      padding: 0 40px;
      border-right: 1px solid rqthemify(--border-primary);
      &:first-child {
        border-left: 1px solid rqthemify(--border-primary);
      }
      &::after {
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        @include t-center-horizontal();
      }
      &.active::after {
        border-color: rqthemify(--primary-color);
        background-color: rqthemify(--primary-color);
      }
    }
    &__wrapper {
      display: flex;
      align-items: center;

      .el-icon-caret-bottom {
        font-size: 12px;
        margin-left: 8px;
      }
    }

    &-dropdown {
      position: absolute;
      left: 0;
      top: 100%;
      background-color: rqthemify(--background-primary);
      @include text(rqthemify(--text-normal), 14, 20px);
      width: max-content;
      box-shadow: 0px 8px 12px 0px rqthemify(--shadow-primary);
      &__subitem,
      &__item {
        position: relative;
        margin-top: -8px;
        &:first-child {
          margin-top: 4px;
        }
        &:hover {
          color: rqthemify(--text-hover);
        }
      }

      .el-icon-arrow-right {
        position: absolute;
        right: 10px;
        @include t-center-vertical();
      }
      @mixin label-hover {
        &:hover {
          color: rqthemify(--text-hover);
          background-color: rqthemify(--dropdown-hover-background);
        }
      }
      &__label {
        padding: 12px 30px 12px 15px;
        @include label-hover();
      }
      &__sublabel {
        padding: 12px 20px;
        color: rqthemify(--text-normal);
        @include label-hover();
        &:active {
          background-color: rqthemify(--dropdown-active-background);
        }
      }

      &__subitem-wrapper {
        width: max-content;
        position: absolute;
        background-color: rqthemify(--background-primary);
        display: none;
        right: 1px;
        transform: translateX(100%);
        top: -4px;
        &:hover {
          background-color: rqthemify(--dropdown-background);
        }
      }

      $pre-name: logged-header-btn-dropdown;
      &__item:hover &__subitem-wrapper {
        display: block;
      }

      &__subitem-wrapper:hover ~ &__label {
        background-color: rqthemify(--background-secondary);
      }
    }

    &:hover .el-icon-caret-bottom {
      transform: rotate(180deg);
      transition: all 0.3s;
    }
  }

  &__logo {
    position: relative;
    display: block;
    width: 116px;
    height: 28px;
    margin-right: 16px;
    img {
      position: absolute;
      width: 100%;
      opacity: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rqthemify(--border-primary);
    border-radius: 3px;
  }
}
</style>
