<template>
  <div class="menu__links">
    <div
      v-for="(link, linkIdx) in links"
      :key="linkIdx"
      :class="['menu__links-item-wrapper', { product: link.icon }, link.icon]"
    >
      <template v-if="link.links">
        <transition name="rq-fade-in-linear">
          <div class="menu__sublinks">
            <p
              v-for="(sublink, sublinkIdx) in link.links"
              :key="sublinkIdx"
              class="menu__sublink-item"
              @click="clickHandle(sublink)"
            >
              {{ sublink.label }}
            </p>
          </div>
        </transition>
        <div class="menu__links-item">
          <i :class="'icon-base icon-base-' + link.icon"></i>
          <span>{{ link.label }}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </template>
      <template v-else>
        <div class="menu__links-item" @click="clickHandle(link)">
          <i :class="'icon-base icon-base-' + link.icon"></i>
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
              :class="'icon-base icon-base-' + contact.icon"
              @click="clickHandle(contact)"
            ></i>
            <el-popover v-else placement="bottom" width="auto" trigger="hover">
              <img :src="qrcode" />
              <i
                slot="reference"
                :class="'icon-base icon-base-' + contact.icon"
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
import qrcode from "../../assets/img/qrcode.jpg";

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
      qrcode,
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
@import "../../../common/style/mixins";

.menu {
  &__sublink {
    &-item {
      padding: 12px 30px 12px 20px;
      @include text(rqthemify(text));
      @include hover;
      &:hover {
        background: rqthemify(bg-hover);
        font-weight: 600;
      }
      &:active,
      &:focus {
        background: rqthemify(bg-active);
      }
    }
    &s {
      display: none;
      padding: 10px 0;
      position: absolute;
      right: 1px;
      box-shadow: 20px 0px 20px 0px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      background: rqthemify(container-bg);
      top: -10px;
      &:hover {
        background: rqthemify(active-background-color);
      }
    }
  }
  &__links {
    @include text(rqthemify(text));
    margin-top: 10px;
    &-item {
      padding: 12px 20px;
      display: flex;
      align-items: center;

      &-wrapper {
        position: relative;
        @include hover;
        &:hover {
          font-weight: bold;
          .menu__sublinks {
            display: block;
          }
          background: rqthemify(bg-hover);
        }
        $products: rqams, rqdata, rqoptimizer, quant;
        @each $product in $products {
          &.product.#{$product} {
            &:hover {
              color: rqthemify(#{$product});
              background: rqthemify(#{$product}-bg);
            }
          }
        }
        $products: quant;
        @each $product in $products {
          &.product.#{$product} {
            .menu__sublinks {
              &:hover {
                + .menu__links-item {
                  background: rqthemify(#{$product}-view-bg);
                }
              }
            }
            .menu__sublink-item {
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
      .icon-base {
        font-size: 20px;
        margin-right: 8px;
      }
      .el-icon-arrow-right {
        position: absolute;
        @include t-center-vertical;
        right: 16px;
        font-weight: inherit;
      }
    }
  }

  &__sublinks:hover ~ .menu__links-item {
    background: rqthemify(bg-view);
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
