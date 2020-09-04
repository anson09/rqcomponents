<template>
  <footer :class="['footer', { opacity }]">
    <div class="footer__content">
      <div class="footer__content-wrapper">
        <div
          v-for="(item, index) in links"
          :key="index"
          class="footer__content-item"
        >
          <p
            v-for="(subitem, subIndex) in item"
            :key="subIndex"
            :class="[
              subitem.title
                ? 'footer__content-item__title'
                : 'footer__content-item__label',

              { link: typeof subitem === 'object' && subitem.link },
            ]"
            @click="handleLink(subitem.link || '')"
          >
            {{ subitem.label || subitem.title || subitem }}
          </p>
        </div>

        <div class="footer__content-contact">
          <span
            v-for="(item, index) in contact"
            :key="index"
            class="footer__content-contact-item"
          >
            <img
              v-if="item.qrcode"
              class="footer__content-contact-item__img"
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
    <div class="footer__copy-right">
      <span
        v-for="(item, index) in copyRight"
        :key="index"
        :class="{
          'footer__copy-right-link': typeof item === 'object' && item.link,
        }"
        @click="handleLink(item.link)"
        >{{ item.label || item }}</span
      >
    </div>
  </footer>
</template>
<script>
import footer from "./assets/dict/config";
import mixin from "../common/util/mixin";
import qrcode from "../common/assets/img/qrcode.jpg";

export default {
  name: "Footer",
  mixins: [mixin],
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
@import "../common/style/mixins";

@mixin hover {
  cursor: pointer;
  &:hover {
    color: rqthemify(--primary-color);
  }
}
.footer {
  width: 100%;
  @include mini-text(rqthemify(--text-normal), 400);

  &__content {
    border-bottom: 1px solid rqthemify(--border-primary);
    &-wrapper {
      padding: 20px 0;
      @media screen and(min-width: $medium-vw) {
        max-width: 1170px;
      }
      @media screen and(max-width: $medium-vw) {
        max-width: 900px;
      }
      @include f-center;
      margin: 0 auto;
      @media screen and(max-width: $min-vw) {
        justify-content: space-evenly;
      }
    }
    &-item {
      @media screen and(min-width: $medium-vw) {
        margin-right: 108px;
      }
      @media screen and(max-width: $medium-vw) {
        margin-right: 50px;
      }
      @media screen and(max-width: $min-vw) {
        margin-right: 0;
      }
      &__title,
      &__label {
        margin: 10px 0;
        width: max-content;
      }
      &__title {
        font-weight: bold;
      }
      &__label {
        &.link {
          @include hover;
          font-weight: normal;
        }
      }
    }
    &-contact {
      .icon-base {
        cursor: pointer;
        font-size: 20px;
        &:hover {
          color: rqthemify(--text-primary);
        }
        &:active {
          color: rqthemify(--primary-color);
        }
      }
      display: flex;
      @media screen and(min-width: $min-vw) {
        flex: auto;
      }

      justify-content: flex-end;
      align-items: flex-end;
      &-item {
        position: relative;
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }

        &__img {
          padding: 12px;
          box-shadow: 0 2px 12px 0 rqthemify(--shadow-primary);
          position: absolute;
          display: none;
          left: 50%;
          top: -10px;
          border: 1px solid rqthemify(--border-primary);
          border-radius: 4px;
          transform: translate(-50%, -100%);
          background-color: rqthemify(--white);
        }
        &:hover &__img {
          display: block;
        }
      }
    }
  }
  &__copy-right {
    padding: 16px 0;
    text-align: center;
    &-link {
      cursor: pointer;
    }
  }
  &.opacity {
    color: rqthemify(--text-white-7);
    .footer__content {
      border-color: rqthemify(--text-white-2);
      &-contact .icon-base {
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
</style>
