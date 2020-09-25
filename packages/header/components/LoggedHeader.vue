<template>
  <div class="logged-header">
    <a href="/" class="logged-header__logo">
      <img :src="images.logo" data-theme="light" />
      <img :src="images.logoWhite" data-theme="dark" />
    </a>

    <div class="logged-header-btns">
      <template v-for="(btn, idx) in config">
        <component
          :is="btn.component"
          v-if="btn.component"
          :key="idx"
          v-bind="{ ...btn, ...$attrs }"
          :active="btn.active"
          v-on="$listeners"
          @logout="$emit('logout')"
          @handleLink="handleLink"
        >
        </component>

        <!-- 按钮式 -->
        <button
          v-if="btn.type === 'button'"
          :key="idx"
          class="logged-header__button"
          @click="handleLink(btn.link)"
        >
          {{ btn.label }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { logged as config } from "../assets/dict/config";
import logo from "../assets/img/logo-small.png";
import logoWhite from "../assets/img/logo-white-small.png";
import ThemeSwitch from "./logged-header/ThemeSwitch.vue";
import Message from "./logged-header/Message.vue";
import WorkspaceSwitch from "./logged-header/WorkspaceSwitch.vue";
import Document from "./logged-header/Document.vue";
import Products from "./logged-header/Products.vue";
import Account from "./logged-header/Account.vue";
import DropdownMenu from "./common/DropdownMenu.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch,
    Message,
    Document,
    Account,
    DropdownMenu,
    WorkspaceSwitch,
    Products,
  },

  data() {
    return {
      config,
      images: {
        logo,
        logoWhite,
      },
      // btnConfigRight: right,
    };
  },
  computed: {},
  methods: {
    isActiveLink(link) {
      return link && link.length > 2 && window.location.href.includes(link)
        ? "active"
        : "";
    },
    openDropdown(idx) {
      this.$set(this.config[idx], "active", true);
    },
    closeDropdown(idx) {
      this.$set(this.config[idx], "active", false);
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

  &-btn {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 8px;
    &s {
      flex: 1 auto;
      display: flex;
      color: rqthemify(--text-normal);
      font-size: 14px;
      height: 100%;
      align-items: center;
    }
  }
  &__button {
    background-color: rqthemify(--text-normal);
    border-radius: 16px;
    color: rqthemify(--white);
    font-weight: 600;
    line-height: 1;
    padding: 6px 20px;
    margin: 0 13px;

    // TODO
    box-shadow: 0px 4px 4px hsla(222, 8%, 24%, 0.29);
    &:hover,
    &:active {
      background-color: rqthemify(--primary-color);
      // TODO
      box-shadow: 0px 4px 4px hsla(220, 100%, 65%, 0.2);
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
      &[data-theme="light"] {
        opacity: 1;
      }
      &[data-theme="dark"] {
        opacity: 0;
      }
    }
  }
}
.theme-dark {
  .logged-header__logo img {
    &[data-theme="light"] {
      opacity: 0;
    }
    &[data-theme="dark"] {
      opacity: 1;
    }
  }
}
</style>
