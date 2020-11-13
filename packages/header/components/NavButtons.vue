<template>
  <div :class="['rq-header-buttons', { 'is-opacity': opacity }]">
    <button
      class="rq-header-road-show rq-header-button"
      @click="handleLink(roadShow.link)"
    >
      {{ roadShow.label }}
    </button>
    <template v-if="isLogin">
      <button
        :class="['rq-header-entry rq-header-button', { 'is-opacity': opacity }]"
        @click="handleLink(entry.link)"
      >
        <img
          v-for="(item, index) in images"
          :key="index"
          :src="item.img"
          alt=""
          :class="['rq-header-entry__img', item.status]"
        />

        {{ entry.label }}
      </button>
    </template>
    <template v-else>
      <button class="rq-header-user-status" @click="handleLink(login.link)">
        <i class="icon-base icon-base-login"></i>
        {{ login.label }}
      </button>
      <button class="rq-header-user-status" @click="handleLink(register.link)">
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
@import "../style/mixins.scss";

@include block(buttons) {
  @include f-center;
  flex: none;
  button {
    font-size: 14px;
    line-height: 26px;
  }
  &.is-opacity {
    @include block(entry) {
      border: none;
    }

    @include block(road-show) {
      border-color: rqthemify(--white);
      background: rqthemify(--text-white-2);
    }
    @include block(button) {
      color: rqthemify(--text-white);
      &:hover {
        background: rqthemify(--text-white-4);
      }
      &:focus,
      &:active {
        background: rqthemify(--text-white-6);
      }
    }

    @include block(user-status) {
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

@include block(button) {
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

@include block(road-show) {
  padding: 6px 28px;
  margin-right: 22px;
  color: rqthemify(--text-primary);
  border: 1px solid rqthemify(--text-primary);
  border-radius: 20px;
}

@mixin set-img($status: default, $self) {
  #{$self}__img {
    display: none;
  }
  .#{$status} {
    display: inline-block;
  }
}

@include block(entry) {
  $self: &;
  padding: 6px 12px;
  margin-left: 6px;
  border-radius: 4px;
  border: 1px solid transparent;
  @include f-center;
  &__img {
    width: 26px;
    height: 26px;
    margin-right: 12px;
  }
  @include set-img(default, $self);
  &:hover {
    @include set-img(active, $self);
  }
  &.is-opacity {
    @include set-img(opacity, $self);
  }
}

@include block(user-status) {
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
</style>
