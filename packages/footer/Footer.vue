<template>
  <footer :class="['rq-footer', { 'is-opacity': opacity }]">
    <div class="rq-footer-menu-wrapper">
      <div class="rq-footer-menu">
        <div
          v-for="(item, index) in links"
          :key="index"
          class="rq-footer-menu__item"
        >
          <p
            v-for="(subitem, subIndex) in item"
            :key="subIndex"
            :class="[
              subitem.title ? 'rq-footer-menu__title' : 'rq-footer-menu__label',

              { 'is-link': typeof subitem === 'object' && subitem.link },
            ]"
            @click="handleLink(subitem.link || '')"
          >
            {{ subitem.label || subitem.title || subitem }}
          </p>
        </div>

        <div class="rq-footer-contact">
          <span
            v-for="(item, index) in contact"
            :key="index"
            class="rq-footer-contact__item"
          >
            <img
              v-if="item.qrcode"
              class="rq-footer-contact__item-img"
              :src="qrcode"
            />

            <i
              :class="'icon-base icon-base-' + item.icon"
              @click="handleLink(item.link)"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <div class="rq-footer-copy-right">
      <span
        v-for="(item, index) in copyRight"
        :key="index"
        :class="{
          'rq-footer-copy-right__link': typeof item === 'object' && item.link,
        }"
        @click="handleLink(item.link)"
        >{{ item.label || item }}</span
      >
    </div>
  </footer>
</template>
<script>
import footer from "./assets/dict/config";
import { rootMixin } from "../common/util/mixin";
import qrcode from "../common/assets/img/qrcode.jpg";

export default {
  name: "Footer",
  mixins: [rootMixin],
  props: {
    opacity: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      ...footer,
      qrcode,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./style/mixins.scss";

@include reset;

@include block(null) {
  width: 100%;
  color: rqthemify(--text-normal);
  font-size: 12px;
  line-height: 1.5;
  &.is-opacity {
    color: rqthemify(--text-white-7);
    @include block(menu) {
      border-color: rqthemify(--text-white-2);
    }
    @include block(contact) {
      .icon-base {
        color: rqthemify(--text-white-5);
        &:hover {
          color: rqthemify(--text-white-8);
        }
        &:active {
          color: rqthemify(--text-white);
        }
      }
    }
  }
}

@include block(menu) {
  position: relative;
  max-width: $max-vw;
  width: 100%;
  padding: 20px 16px;
  margin: 0 auto;
  @include f-center(space-between, flex-start);
  &-wrapper {
    border-bottom: 1px solid rqthemify(--border-primary);
  }

  &__item {
    p {
      margin: 10px 0;
      width: max-content;
    }
  }

  &__label {
    &.is-link {
      cursor: pointer;
      font-weight: normal;
      &:hover {
        color: rqthemify(--primary-color);
      }
    }
    p {
      margin: 10px 0;
      width: max-content;
    }
  }

  &__title {
    font-weight: bold;
  }
}

@include block(contact) {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  .icon-base {
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: rqthemify(--text-primary);
    }
    &:active {
      color: rqthemify(--light-primary-color);
    }
  }
  @include pad {
    position: absolute;
    right: 16px;
    bottom: -20px;
    transform: translateY(-100%);
  }

  &__item {
    position: relative;
    margin-right: 22px;
    &:last-child {
      margin-right: 0;
    }

    &-img {
      padding: 12px;
      box-shadow: 0 2px 12px 0 rqthemify(--shadow-primary);
      position: absolute;
      display: none;
      top: -10px;
      @include t-center-horizontal(-100%);
      border: 1px solid rqthemify(--border-primary);
      border-radius: 4px;
      background-color: rqthemify(--white);
    }
    &:hover &-img {
      display: block;
    }
  }
}

@include block(copy-right) {
  padding: 16px 0;
  text-align: center;
  &-link {
    cursor: pointer;
  }
}
</style>
