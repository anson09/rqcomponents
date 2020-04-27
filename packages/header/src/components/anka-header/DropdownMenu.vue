<template>
  <div class="menu__links">
    <div
      v-for="(link, linkIdx) in links"
      :key="linkIdx"
      :class="['menu__links-item-wrapper', { product: link.icon }, link.icon]"
    >
      <template v-if="link.subLinks">
        <transition name="rq-fade-in-linear">
          <div class="menu__sub-links">
            <p
              v-for="(subLink, subLinkIdx) in link.subLinks"
              :key="subLinkIdx"
              class="menu__sub-links__item"
              @click.stop="clickHandle(subLink)"
            >
              {{ subLink.label }}
            </p>
          </div>
        </transition>
        <div class="menu__links-item">
          <i :class="'rq-icons rq-icon-' + link.icon"></i>
          <span>{{ link.label }}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </template>
      <template v-else>
        <div class="menu__links-item" @click="clickHandle(link)">
          <i :class="'rq-icons rq-icon-' + link.icon"></i>
          <a>
            {{ link.label }}
          </a>
        </div>
      </template>
    </div>
    <div class="menu-support">
      <div class="menu-support__links">
        <p
          v-for="(cfg, idx) in support.info"
          :key="idx"
          :class="[
            'menu-support__links--item',
            { 'is-disabled': cfg.disabled },
          ]"
          @click="copy(cfg)"
        >
          {{ cfg.label }}: {{ cfg.value }}
          <i v-if="!cfg.disabled" class="el-icon-copy-document"></i>
        </p>
        <p class="contact">
          <span
            v-for="(contact, contactIdx) in support.contact"
            :key="contactIdx"
          >
            <i
              v-if="!contact.qrcode"
              :class="'rq-icons rq-icon-' + contact.icon"
              @click="clickHandle(contact)"
            ></i>
            <el-popover v-else placement="bottom" width="auto" trigger="hover">
              <img :src="qrcodeImg" />
              <i
                slot="reference"
                :class="'rq-icons rq-icon-' + contact.icon"
              ></i>
            </el-popover>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ElPopover from "element-ui/lib/popover";
import Message from "element-ui/lib/message";
import qrcodeImg from "../../../assets/img/qrcodeImg.jpg";

export default {
  name: "DropdownMenu",
  components: {
    ElPopover,
  },
  props: {
    links: {
      default: () => [],
      type: Array,
    },
    support: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      qrcodeImg,
    };
  },
  watch: {},
  mounted() {},
  methods: {
    clickHandle({ link }) {
      if (link) {
        this.$emit("redirect", link);
      }
      this.$emit("close");
    },
    copy(cfg) {
      if (cfg.disabled) return;
      const textArea = document.createElement("textarea");
      textArea.value = cfg.value;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        Message.success(`已成功复制到剪切板`);
      } catch (err) {
        Message.success(`复制失败`);
      }

      document.body.removeChild(textArea);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../common/style/common";

.menu {
  &__sub-links {
    position: absolute;
    display: none;
    right: 1px;
    padding: 12px 0;
    box-shadow: 20px 0px 20px 0px rgba(0, 0, 0, 0.15);
    top: 0;
    transform: translateX(100%);
    background: white;
    &__item {
      padding: 12px 30px 12px 20px;
      @include text(rqthemify(text));
      cursor: pointer;
    }
  }
  &__links {
    @include text(rqthemify(text));
    margin-top: 10px;
    &-item {
      padding: 10px 20px;
      vertical-align: middle;

      &-wrapper {
        position: relative;
        @include hover;
        &:hover {
          font-weight: bold;
          .menu__sub-links {
            display: block;
          }
        }
        $products: rqams, rqdata, rqoptimizer, rqquant;
        @each $product in $products {
          &.product.#{$product} {
            &:hover {
              color: rqthemify(#{$product});
              background: rqthemify(#{$product}-bg);
            }
          }
        }
        $products: rqquant;
        @each $product in $products {
          &.product.#{$product} {
            .menu__sub-links {
              &:hover {
                + .menu__links-item {
                  background: rqthemify(#{$product}-view-bg);
                }
              }
            }
            .menu__sub-links__item {
              &:hover {
                color: rqthemify(#{$product});
                background: rqthemify(#{$product}-bg);
              }
              &:focus,
              &:active {
                background: rqthemify(#{$product}-sub-link-bg);
              }
            }
          }
        }
      }
      .rq-icons {
        font-size: 20px;
        margin-right: 8px;
      }
      .el-icon-arrow-right {
        position: absolute;
        @include t-center-vertical;
        right: 16px;
      }
    }
  }

  &-support {
    @include mini-text(#a3a3a3ff);
    &__links {
      padding: 20px 0 10px;
      margin: 22px 20px 0;
      border-top: 1px solid rqthemify(border-disabled);
      &--item:not(.is-disabled) {
        & + & {
          margin-top: 6px;
        }
        @include hover;
      }
    }
    .contact {
      margin-top: 6px;

      i {
        margin-right: 12px;
        font-size: 16px;
        cursor: pointer;
        @include hover;
      }
    }
  }
}
</style>
<style lang="scss">
.nav-menu.el-popper {
  padding: 0;
  border-radius: 0;
  border-width: 0;
  min-width: 300px;
  box-shadow: 0px 16px 20px 0 rgba(0, 0, 0, 0.15);
  background: white;
  &.fade-in-linear-leave-active.fade-in-linear-leave-to {
    opacity: 0;
    transition: all 0s;
  }
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
