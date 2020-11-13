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
@import "../common/style/mixins";

@mixin hover {
  cursor: pointer;
  &:hover {
    color: rqthemify(--light-primary-color);
  }
}
.footer {
  width: 100%;
  color: rqthemify(--text-normal);
  font-size: 12px;
  line-height: 1.5;
  &__content {
    border-bottom: 1px solid rqthemify(--border-primary);
    &-wrapper {
      padding: 20px 0;
      @include desktop {
        max-width: 1170px;
      }
      @include laptop {
        max-width: 900px;
      }
      @include f-center;
      margin: 0 auto;
      @include pad {
        justify-content: space-evenly;
      }
    }
    &-item {
      @include desktop {
        margin-right: 108px;
      }
      @include laptop {
        margin-right: 50px;
      }
      @include pad {
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
          cursor: pointer;
          font-weight: normal;
          &:hover {
            color: rqthemify(--primary-color);
          }
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
          color: rqthemify(--light-primary-color);
        }
      }
      display: flex;
      @include pc {
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
          top: -10px;
          @include t-center-horizontal(-100%);
          border: 1px solid rqthemify(--border-primary);
          border-radius: 4px;
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
