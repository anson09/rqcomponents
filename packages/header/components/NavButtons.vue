<template>
  <div :class="['rq-header__buttons', { 'is-opacity': opacity }]">
    <button class="rq-header__road-show" @click="handleLink(roadShow.link)">
      {{ roadShow.label }}
    </button>
    <template v-if="isLogin">
      <button
        :class="['rq-header__entry', { 'is-opacity': opacity }]"
        @click="handleLink(entry.link)"
      >
        <img
          v-for="(item, index) in images"
          :key="index"
          :src="item.img"
          alt=""
          :class="['rq-header__entry-img', item.status]"
        />

        {{ entry.label }}
      </button>
    </template>
    <template v-else>
      <button class="rq-header__login" @click="handleLink(login.link)">
        <i class="icon-base icon-base-login"></i>
        {{ login.label }}
      </button>
      <button class="rq-header__register" @click="handleLink(register.link)">
        <i class="icon-base icon-base-registered"></i>
        {{ register.label }}
      </button>
    </template>
  </div>
</template>
<script>
import mixin from "../../common/util/mixin";
import entryOpacityImg from "../assets/img/entry-opacity.png";
import entryImg from "../assets/img/entry.png";
import entryActiveImg from "../assets/img/entry-active.png";
import { getAccount } from "../../common/util/account";

export default {
  name: "NavButtons",
  mixins: [mixin],
  props: {
    opacity: { type: Boolean, default: false },
  },
  data() {
    return {
      isLogin: false,
      roadShow: {
        label: "预约路演",
        link: { href: `/trial/road-show`, event: "roadShow" },
      },
      login: {
        label: "登录",
        link: { event: "login" },
      },
      register: { label: "注册", link: { event: "register" } },
      entry: { label: "进入平台", link: { href: "/quant", outer: true } },

      images: [
        { status: "default", img: entryImg },
        { status: "opacity", img: entryOpacityImg },
        { status: "active", img: entryActiveImg },
      ],
    };
  },
  async mounted() {
    this.isLogin = !!(await getAccount());
  },
};
</script>
<style lang="scss" scoped>
@import "../../common/style/mixins.scss";
.rq-header {
  $self: &;
  &__buttons {
    @include f-center;
    flex: none;
    button {
      font-size: 14px;
      line-height: 26px;
    }
  }
  &__login,
  &__register {
    padding: 6px 14px;
    @include f-center;
    color: rqthemify(--text-primary);
    border-radius: 20px;
    border: 1px solid transparent;
    margin: 0 2px;
    .icon-base {
      margin-right: 8px;
    }
    &:hover {
      border-color: rqthemify(--text-primary);
    }
    &:active,
    &:focus {
      color: rqthemify(--light-primary-color);
      border-color: rqthemify(--light-primary-color);
    }
  }
  @mixin common-button {
    &:hover,
    &:focus,
    &:active {
      color: rqthemify(--light-primary-color);
      border-color: rqthemify(--light-primary-color);
    }
    &:focus,
    &:active {
      background: rqthemify(--light-primary-color-1);
    }
  }
  // 路演按钮
  &__road-show {
    padding: 6px 28px;
    margin-right: 22px;
    color: rqthemify(--text-primary);
    border: 1px solid rqthemify(--text-primary);
    border-radius: 20px;
    @include common-button;
  }
  // 进入平台
  &__entry {
    padding: 6px 12px;
    margin-left: 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    @include f-center;
    @include common-button;
    &-img {
      width: 26px;
      height: 26px;
      margin-right: 12px;
    }
    @mixin set-img($status: default) {
      #{$self}__entry-img {
        display: none;
      }
      .#{$status} {
        display: inline-block;
      }
    }

    @include set-img(default);
    &:hover {
      @include set-img(active);
    }
    &.is-opacity {
      @include set-img(opacity);
    }
  }
  // 透明背景
  &__buttons.is-opacity {
    #{$self}__entry {
      border: none;
    }
    #{$self}__road-show {
      border: 1px solid rqthemify(--white);
      background: rqthemify(--text-white-2);
    }
    #{$self}__road-show,
    #{$self}__entry {
      color: rqthemify(--text-white);
      &:hover {
        background: rqthemify(--text-white-4);
      }
      &:focus,
      &:active {
        background: rqthemify(--text-white-6);
      }
    }
    #{$self}__login,
    #{$self}__register {
      color: rqthemify(--text-white);
      border-color: transparent;
      &:hover {
        background: rqthemify(--text-white-4);
      }
      &:focus,
      &:active {
        background: rqthemify(--text-white-6);
      }
    }
  }
}
</style>
