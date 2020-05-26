<template>
  <div :class="['footer', { opacity }]">
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
              'footer__content-item__label',
              { link: typeof subitem === 'object' && subitem.link },
            ]"
            @click="handleLink(subitem.link || '')"
          >
            {{ subitem.label || subitem }}
          </p>
        </div>

        <div class="footer__content-contact">
          <span
            v-for="(item, index) in contact"
            :key="index"
            class="footer__content-contact-item"
          >
            <el-popover
              v-if="item.qrcode"
              placement="top"
              width="auto"
              trigger="hover"
            >
              <img :src="qrcode" />
              <i slot="reference" :class="'icon-base icon-base-' + item.icon" />
            </el-popover>
            <i
              v-else
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
  </div>
</template>
<script>
import ElPopover from "element-ui/lib/popover";
import footer from "./assets/dict/footer";
import mixin from "../common/mixin";
import qrcode from "../common/assets/img/qrcode.jpg";

export default {
  name: "Footer",
  components: { ElPopover },
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

// TODO color in postcss
$border: #e2e2e2;
$border-light: rgba(255, 255, 255, 0.2);
@mixin hover {
  cursor: pointer;
  &:hover {
    color: rqthemify(highlight);
  }
}
.footer {
  width: 100%;
  @include mini-text(rqthemify(text), 400);

  &__content {
    border-bottom: 1px solid $border;
    border-top: 1px solid $border;
    &-wrapper {
      padding: 20px 0;
      @media screen and(min-width: $min-vw) {
        max-width: 1170px;
      }
      @media screen and(max-width: $min-vw) {
        max-width: 900px;
      }

      @include f-center;
      margin: 0 auto;
    }
    &-item {
      @media screen and(min-width: $min-vw) {
        margin-right: 108px;
      }
      @media screen and(max-width: $min-vw) {
        margin-right: 50px;
      }
      &__label {
        margin: 10px 0;
        &.link {
          @include hover;
        }
      }
    }
    &-contact {
      display: flex;
      flex: auto;
      justify-content: flex-end;
      align-items: flex-end;
      &-item {
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }
        .icon-base {
          font-size: 20px;
          @include hover;
        }
      }
    }
  }
  &__copy-right {
    margin: 16px 0;
    text-align: center;
    &-link {
      cursor: pointer;
    }
  }
  // TODO opacity
  &.opacity {
    color: rgba(255, 255, 255, 0.7);
    .footer__content {
      border-color: $border-light;
    }
  }
}
</style>
