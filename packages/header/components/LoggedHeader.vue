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
        @click="handleLink(btn.link)"
      >
        <el-button type="text">{{ btn.label }}</el-button>
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
              <DropdownMenu
                :links="btn.links"
                @redirect="handleLink"
              ></DropdownMenu>
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
import { flattenNode } from "../util";
import DropdownMenu from "./common/DropdownMenu.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch,
    Message,
    WorkspaceSwitch,
    Account,
    ElButton,
    DropdownMenu,
  },

  data() {
    const { right } = logged;
    right
      .filter(({ type }) => type === "dropdown")
      .forEach((item) => {
        item.links = flattenNode(item.links);
      });
    return {
      images: {
        logo,
        logoWhite,
      },
      btnConfigRight: right,
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

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rqthemify(--border-primary);
    border-radius: 3px;
  }

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

    &.is-component:hover {
      background: rqthemify(--dropdown-background);
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
    &.button,
    &.text {
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
    }
    &.is-left {
      padding: 0 40px;
      border-right: 1px solid rqthemify(--border-primary);
      &:first-child {
        border-left: 1px solid rqthemify(--border-primary);
      }
      &::after {
        left: 0;
        right: 0;
      }
      &.active::after {
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
}
</style>
