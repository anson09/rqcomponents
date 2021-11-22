<template>
  <div v-clickoutside="handleClickOutside" class="rq-header-account">
    <div
      :class="['rq-header-avatar', { 'is-active': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <img
        class="rq-header-avatar__img"
        :src="avatarShow"
        alt=""
        @error="handleAvatarLoadError"
      />
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="rq-header-dropdown">
        <p class="rq-header-dropdown__label">{{ username }}</p>
        <p
          v-for="(link, index) in links"
          :key="index"
          class="rq-header-dropdown__link"
          @click="handleClick(link)"
        >
          {{ link.label }}
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import defaultAvatar from "../assets/img/default-avatar.png";
import { handleLink } from "../../common/util/index";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "Account",
  mixins: [dropdownMixin],
  props: {
    avatar: {
      default: "",
      type: String,
    },
    username: {
      default: "未登陆",
      type: String,
    },
  },
  data() {
    return {
      links: [
        {
          link: { path: "/dashboard", outer: true },
          label: "工作空间",
        },
        {
          link: { path: "/dashboard/account#setting", outer: true },
          label: "账号中心",
        },
        {
          link: { path: "/", outer: true },
          label: "回到首页",
        },
        {
          event: "logout",
          label: "登出账号",
        },
      ],
      isAvatarLoadError: false,
    };
  },
  computed: {
    avatarShow() {
      return this.isAvatarLoadError
        ? defaultAvatar
        : this.avatar || defaultAvatar;
    },
  },
  methods: {
    handleAvatarLoadError() {
      this.isAvatarLoadError = true;
    },
    handleClick(cfg) {
      if (cfg.event === "logout") {
        this.$emit("logout");
      } else if (cfg.link) {
        handleLink(cfg.link);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins";
@include block(account) {
  color: var(--text-normal);
  height: 100%;
  margin: 0 13px;
  @include f-center;

  position: relative;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}

@include block(avatar) {
  &__img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  border-radius: 50%;
  position: relative;
  @include f-center;

  &::after {
    content: "";
    display: block;
    position: absolute;
    height: 30px;
    width: 30px;
    background: var(--primary-color-3);
    border-radius: 50%;
    opacity: 0;
    @include t-center;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  &.is-active {
    &::after {
      opacity: 1;
      width: 34px;
      height: 34px;
    }

    &:hover::after {
      background: var(--primary-color-4);
    }
  }
}

@include block(dropdown) {
  @include dropdown;

  &__link {
    cursor: pointer;
    margin-bottom: -8px;
    padding: 12px 20px;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: var(--primary-color);
      background-color: var(--primary-color-1);
    }
  }

  &__label {
    position: relative;
    font-size: 14px;
    width: 108px;
    padding: 8px 10px 6px 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid var(--border-primary);

    &::after {
      content: "";
      position: absolute;
      display: block;
      margin: auto;
      top: 12px;
      left: 10px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--green);
    }
  }
}
</style>
