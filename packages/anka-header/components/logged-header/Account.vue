<template>
  <div v-clickoutside="handleClickOutside" class="account">
    <div
      :class="['account__avatar-wrapper', { 'is-active': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <img class="account__avatar" :src="avatarShow" alt="" />
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="account-dropdown">
        <p class="account__username">{{ username }}</p>
        <p
          v-for="(link, index) in links"
          :key="index"
          class="account__link"
          @click="handleClick(link)"
        >
          {{ link.label }}
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import defaultAvatar from "../../assets/img/header.png";
import mixin from "../../../common/util/mixin";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "Account",
  mixins: [mixin, dropdownMixin],
  props: {
    avatar: {
      default: "",
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      links: [
        {
          link: {
            href: "/dashboard",
            outer: true,
          },
          label: "个人主页",
        },
        {
          link: {
            href: "/dashboard/account#setting",
            outer: true,
          },
          label: "账号中心",
        },
        {
          link: "/",
          label: "回到首页",
        },
        {
          event: "logout",
          label: "登出账号",
        },
      ],
    };
  },
  computed: {
    avatarShow() {
      return this.avatar || defaultAvatar;
    },
  },
  methods: {
    handleClick(cfg) {
      if (cfg.event === "logout") {
        this.$emit("logout");
      } else if (cfg.link) {
        this.handleLink(cfg.link);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.account {
  color: rqthemify(--text-normal);
  height: 100%;
  margin: 0 13px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  p {
    margin: 0;
  }
  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    &-wrapper {
      border-radius: 50%;
      position: relative;
      display: flex;
      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 30px;
        width: 30px;
        background: rqthemify(--primary-color-3);
        border-radius: 50%;
        opacity: 0;
        @include t-center;
      }
      &:hover {
        &:after {
          opacity: 1;
        }
      }
      &.is-active {
        &:after {
          opacity: 1;
          width: 34px;
          height: 34px;
        }
        &:hover:after {
          background: rqthemify(--primary-color-4);
        }
      }
    }
  }

  &__link {
    cursor: pointer;
    margin-bottom: -8px;
    padding: 12px 20px;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: rqthemify(--text-hover);
      background-color: rqthemify(--dropdown-hover-background);
    }
  }
  &__username {
    position: relative;
    font-size: 14px;
    box-sizing: border-box;
    width: 108px;
    padding: 8px 10px 6px 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid rqthemify(--border-primary);
    &:after {
      content: "";
      position: absolute;
      display: block;
      margin: auto;
      top: 12px;
      left: 10px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rqthemify(--succeed-color);
    }
  }
  &-dropdown {
    @include logged-dropdown;
  }
}
</style>
